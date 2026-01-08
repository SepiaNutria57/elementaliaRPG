//botao de ataque

/*
document.getElementById('attackBtn').addEventListener('click', async () => {


  async function attack() {
    const res = await fetch('/combat', { method: 'POST', body: JSON.stringify(payload) }); //adicionar body json
    const data = await res.json();

    document.getElementById('actions').textContent =
      data.remainingActions; //checar acoes por turno

    document.getElementById('enemyHp').textContent =
      data.defenderState.hp; //checar hp do inimigo

    document.getElementById('log').textContent +=
      JSON.stringify(data, null, 2) + '\n'; //log de combate
  }

  function addEffect() {
    const div = document.createElement('div'); //

    div.innerHTML = `
    <select class="stat">
      <option value="diceCount">Qtd Dados</option>
      <option value="diceType">Tipo de Dado</option>
      <option value="staminaCost">Custo Fôlego</option>
      <option value="damageMultiplier">Multiplicador Dano</option>
    </select>

    <input type="number" class="value" />
    
    <select class="priority">
      <option value="0">Prioridade 0</option>
      <option value="1">Prioridade 1</option>
      <option value="2">Prioridade 2</option>
    </select>
  `;

    document.getElementById('effects').appendChild(div);
  }
  function saveBuff() {
    const effects = [...document.querySelectorAll('#effects div')].map(
      (div) => ({
        stat: div.querySelector('.stat').value,
        value: Number(div.querySelector('.value').value),
        priority: Number(div.querySelector('.priority').value),
      }),
    );

    const payload = {
      name: document.getElementById('buffName').value,
      reusable: document.getElementById('reusable').checked,
      effects,
    };

    fetch('/buffs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }


  async function updateUI(state) {
    document.getElementById('actions').textContent = state.actions;
  }

//teste

  const response = await fetch('/combat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attacker: {
        hp: 20,
        skills: { LUTA: { level: 3 } },
      },
      defender: {
        hp: 15,
        skills: { BLOCK: { level: 2 }, RESIST: { level: 1 } },
      },
      skill: {
        name: 'Ataque Básico',
        type: 'MELEE',
      },
      buffs: [],
    }),
  });

  const result = await response.json();

  document.getElementById('log').textContent = JSON.stringify(result, null, 2);
});

*/

function normalizeDice(count, sides) {
  const diceOrder = [3, 4, 6, 8, 10, 12, 20];
  let idx = diceOrder.indexOf(sides);

  if (count > 0) {
    return { count, sides };
  }

  idx = Math.max(0, idx - Math.abs(count));
  return { count: 1, sides: diceOrder[idx] };
}


async function roll() {
  let tipoDado = Number(document.getElementById('dadoType').value);
  let quantidade = document.getElementById('dadoNumber').value;
  let i = 0;
  let somaTotal = 0;
  let listaResultados = [];

  for (i; i < quantidade; i++) {
    let resultadoDado = Math.floor(Math.random() * tipoDado) + 1;
    somaTotal += resultadoDado;

    listaResultados.push(resultadoDado);
  }

  document.getElementById('resultHtml').innerHTML = somaTotal;
  document.getElementById('resultDados').innerHTML =
    listaResultados.join(' + ');
}

async function loadModifiers() {
  const res = await fetch('http://localhost:3000/modifiers');
  const modifiers = await res.json();

  const container = document.getElementById('modifiers');

  modifiers.forEach((m) => {
    const label = document.createElement('label');

    label.innerHTML = `
      <input
        type="checkbox"
        class="modifier"
        value="${m.id}"
      />
      ${m.name} (${m.value > 0 ? '+' : ''}${m.value})
    `;

    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

function applyModifiers(base, modifiers) {
  let value = base;

  // prioridade 0 – soma/subtração
  modifiers
    .filter(m => m.priority === 0)
    .forEach(m => {
      value += m.value;
    });

  // prioridade 1 – multiplicação 
  modifiers
    .filter(m => m.priority === 1)
    .forEach(m => {
      value *= m.value;
    });

  // prioridade 2 – multiplicação - resultado
  modifiers
    .filter(m => m.priority === 2)
    .forEach(m => {
      value *= m.value;
    });

  return Math.floor(value);
}

/*
async function roll() {
  const modifierIds = [...document.querySelectorAll('.modifier')]
    .filter((cb) => cb.checked)
    .map((cb) => Number(cb.value));

  const res = await fetch('http://localhost:3000/roll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      diceCount: 2,
      diceType: 6,
      staminaCost: 3,
      balanceCost: 1,
      modifierIds,
    }),
  });

  const data = await res.json();
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}

document.addEventListener('DOMContentLoaded', loadModifiers);
*/
