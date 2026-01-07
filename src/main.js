/* document.getElementById('attackBtn').addEventListener('click', async () => {

  async function attack() {
    const res = await fetch('/combat', { method: 'POST', body: ... });
    const data = await res.json();

    document.getElementById('actions').textContent =
      data.remainingActions;

    document.getElementById('enemyHp').textContent =
      data.defenderState.hp;

    document.getElementById('log').textContent +=
      JSON.stringify(data, null, 2) + '\n';
  }

  function addEffect() {
    const div = document.createElement('div');

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
}); */

function roll(){
  let tipoDado = Number(document.getElementById('dadoType').value);
  let quantidade = document.getElementById('dadoNumber').value;
  let i = 0;
  let somaTotal = 0;
  let listaResultados = [];

  for (i; i<quantidade; i++){
    let resultadoDado = Math.floor(Math.random() * tipoDado) + 1;
    somaTotal += resultadoDado;

    listaResultados.push(resultadoDado);
  }

  document.getElementById("resultHtml").innerHTML = somaTotal;
  document.getElementById("resultDados").innerHTML = listaResultados.join(" + ");
}