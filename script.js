const apiUrl = 'https://672b86821600dda5a9f562cc.mockapi.io/Animal';

// Função para buscar e exibir a lista de animais
async function carregarAnimais() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao buscar animais');

    const animais = await response.json();

    const animalList = document.getElementById('animalList');
    animalList.innerHTML = '';

    animais.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `${animal.id} - ${animal.Nome} (${animal.Idade}) – ${animal.Raca}`;
      animalList.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar animais:', error);
  }
}

// Função para cadastrar um animal "hardcoded"
async function cadastrarAnimal() {
  try {
    const novoAnimal = {
      Nome: 'Totó',
      Idade: 12,
      Raca: 'cachorro'
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAnimal),
    });

    if (response.ok) {
      console.log('Animal cadastrado com sucesso!');
      carregarAnimais(); // Atualiza a lista após cadastrar
    } else {
      throw new Error('Erro ao cadastrar animal');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

// Adiciona um evento de clique ao botão para chamar a função de cadastrar
document.getElementById('cadastrarBtn').addEventListener('click', cadastrarAnimal);

// Carregar a lista de animais ao iniciar a página
window.onload = carregarAnimais;