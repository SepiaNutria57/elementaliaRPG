//aqui que a mágica acontece
//todas as habilidades estarão nesse arquivo

await prisma.buff.create({
  data: {
    name: 'Melhorar Habilidade',
    description: 'Aumenta o poder da habilidade',
    compatibleType: ['MELEE', 'RANGED'], //compatibilidade
    reusable: true, //reutilizavel
    durationTurns: 1,
    effects: {
      create: [{ stat: 'diceCount', value: 1 }], //+1 no dado
    },
  },
});

//exemplo

await prisma.buff.create({
  data: {
    name: 'Carregado',
    description: 'Dobra o custo e resultado da habilidade',
    compatibleType: 'MELEE',
    reusable: false,
    durationTurns: 1,
    effects: {
      create: [{ stat: 'staminaCost', value: 2 }], //como multiplicar???
    },
  },
});

await prisma.buff.create({
  "name": "Sobrecarga",
  "effects": [
  {
    "stat": "damageMultiplier",
    "value": 1.5,
    "priority": 2
  },
  {
    "stat": "staminaMultiplier",
    "value": 1.3,
    "priority": 1
  }
]
});
