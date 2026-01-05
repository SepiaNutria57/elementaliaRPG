export function handleReactions(context) {
  const reactions = [];

  if (context.event === 'BLOCK_SUCCESS' && context.margin <= -10) {
    reactions.push({
      type: 'COUNTER_ATTACK',
      actionType: 'REACTION',
      skill: 'Aparo Avassalador',
    });
  }

  return reactions;
}
