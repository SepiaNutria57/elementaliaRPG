import { skillBonus } from '../rules/skillBonus.js';

export function handleDeath(character) {
  if (character.hp > 0) return { status: 'ALIVE' };

  const resistLevel = character.skills['RESIST']?.level ?? 0;

  const resistBonus = skillBonus(resistLevel);

  const roll = Math.floor(Math.random() * 20) + 1 + resistBonus;

  if (roll >= 10) {
    character.hp = 1;
    return { status: 'STABILIZED' };
  }

  return { status: 'DEAD' };
}
