import express from 'express';
import { resolveCombat } from '../services/combatResolver.js';

const router = express.Router();

router.post('/', async (req, res) => {

  function startTurn(entityId, turn) {
    return prisma.turnState.create({
      data: {
        entityId,
        turn,
        actions: 2
      }
    });
  }

  function consumeAction(turnState, skill) {
    if (skill.actionType === 'NORMAL') {
      if (turnState.actions <= 0) {
        throw new Error('Sem ações disponíveis');
      }
      turnState.actions -= 1;
    }

    // BONUS e REACTION não consomem
  }


  const { attacker, defender, skill, buffs } = req.body;

  const result = await resolveCombat({
    attacker,
    defender,
    skill,
    activeBuffs: buffs,
  });

  res.json(result);
});

export default router;
