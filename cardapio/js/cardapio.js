const item = document.getElementById('teste');
const fundoCarinho = document.getElementById('fundocarrinho');  
const carrinho = document.getElementById('carrinho');      
const fundoMenu = document.getElementById('fundomenu');   
const menu = document.getElementById('menu');
const pizza = document.getElementById('pizza');
const borda = document.getElementById('borda');
const tamanho = document.getElementById('tamanho');
const retirarIngrediente = document.getElementById('retirar-ingrediente');
const addCart = document.getElementById('addcart');
const fecharMenu = document.getElementById('fecharmenu'); 
const fecharCarrinho = document.getElementById('fecharcarrinho');
const finalizarPedido = document.getElementById('finalizarpedido');

const cardapio = document.getElementById("cardapio");


cardapio.addEventListener("click", (event) => {
    let parant = event.target.closest(".item");
    if (parant) {
        const imagemPizza = parant.getAttribute("data-img");
        const nomePizza = parant.getAttribute("data-pizza");
        const precoPizza = parant.getAttribute("data-preco");

fundoMenu.style.display = 'flex';

pizza.insertAdjacentHTML("beforeend", `
            <div class="pizza-imagem">
            <img src="${imagemPizza}" alt="">
            <h2 id="pizza-nome">${nomePizza}</h2>
        </div>
        <div class="pizza-informacoes">
            <h3 id="pizza-preco">R$${precoPizza}</h3>
            <p id="pizza-descricao">Pizza de chocolate com morango.</p>
        </div>
        `);
    }
});

fecharMenu.addEventListener('click', function() {
        fundoMenu.style.display = 'none';
    })
    fundoMenu.addEventListener('click', function(event) {
        if (event.target === fundoMenu) {
            fundoMenu.style.display = 'none';
        }
    })

addCart.addEventListener('click', function() {
    fundoCarinho.style.display = 'flex';
    fundoMenu.style.display = 'none';
    fecharCarrinho.addEventListener('click', function() {
        fundoCarinho.style.display = 'none';
    })
    fundoCarinho.addEventListener('click', function(event) {
        if (event.target === fundoCarinho) {
            fundoCarinho.style.display = 'none';
        }
    })
})

/*function modificarPizza(){
    pizza.innerHTML = ''; // Limpa o conteúdo anterior
    const divpizza = document.createElement("div");
    divpizza.insert =`
        <div class="pizza-imagem">
            <img src="${imagemPizza}" alt="">
            <h2 id="pizza-nome">${nomePizza}</h2>
        </div>
        <div class="pizza-informacoes">
            <h3 id="pizza-preco">R$${precoPizza}</h3>
            <p id="pizza-descricao">Pizza de chocolate com morango.</p>
        </div>
        `;
    pizza.appendChild(divpizza);

}*/

