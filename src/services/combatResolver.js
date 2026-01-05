import { previewSkill, rollSkill } from './rollEngine.js';
import { consumeAction } from './turnEngine.js';
import { handleReactions } from './reactionEngine.js';
import { handleDeath } from './deathSystem.js';
import { skillBonus } from '../rules/skillBonus.js';

export async function resolveCombat(context) {
  const {
    attacker,
    defender,
    skill,
    activeBuffs,
    turnState
  } = context;

  // 1. Verificar e consumir ação
  consumeAction(turnState, skill);

  // 2. Preview de custo (sem efeito colateral)
  const preview = previewSkill({
    character: attacker,
    skill,
    activeBuffs
  });

  if (attacker.stamina < preview.costs.stamina) {
    throw new Error('Fôlego insuficiente');
  }

  if (attacker.balance < preview.costs.balance) {
    throw new Error('Equilíbrio insuficiente');
  }

  // 3. Consumir recursos
  attacker.stamina -= preview.costs.stamina;
  attacker.balance -= preview.costs.balance;

  // 4. Ataque
  const attack = rollSkill({
    character: attacker,
    skill,
    activeBuffs
  });

  // 5. Defesa
  const defenseType =
    skill.type === 'MELEE' ? 'BLOCK' : 'REFLEX';

  const defenseLevel =
    defender.skills?.[defenseType]?.level ?? 0;

  const defenseRoll =
    Math.floor(Math.random() * 20) +
    1 +
    skillBonus(defenseLevel);

  const margin = attack.total - defenseRoll;

  // 6. Reações
  const reactions = handleReactions({
    event: defenseType,
    margin,
    attacker,
    defender
  });

  // 7. Dano
  let damage = 0;

  if (margin > 0) {
    damage = attack.finalDamage;

    if (defenseType === 'BLOCK') {
      damage = Math.max(
        1,
        damage - skillBonus(defenseLevel)
      );
    }

    defender.hp -= damage;
  }

  // 8. Morte
  const deathResult = handleDeath(defender);

  // 9. Retorno estruturado (para UI)
  return {
    action: skill.name,
    attackRoll: attack.total,
    defenseRoll,
    margin,
    damage,
    attackerState: {
      hp: attacker.hp,
      stamina: attacker.stamina,
      balance: attacker.balance
    },
    defenderState: {
      hp: defender.hp
    },
    reactions,
    deathResult,
    remainingActions: turnState.actions
  };
}
