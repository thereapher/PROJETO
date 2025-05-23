const fundomenu = document.querySelector('.fundomenu');
const menu = document.querySelector('.menu');
const fecharMenu = document.querySelector('.fecharmenu');
const itensPizza = document.querySelector('.pizza');
const tamanho = document.querySelector('.tamanho');
const borda = document.querySelector('.borda');
const Retirar = document.querySelector('.retirar');
const AddCart = document.querySelector('.addcart');
const FundoCarrinho = document.querySelector('.fundocarrinho');
const Carrinho = document.querySelector('.carrinho');
const FecharCarrinho = document.querySelector('.close');
const itensCarrinho = document.querySelector('.carrinho-pizza');
const Endereco = document.querySelector('.endereco');
const Total = document.querySelector('.total');
const finalizar = document.querySelector('.btn-finalizar');
const Cardapio = document.querySelector('.imagens');
const pizza = document.querySelector('.item');

Cardapio.addEventListener('click', (event) => {
    if (event.target.closest('.item')) {
        fundomenu.style.display = 'flex';
        let foto = event.target.closest('.item').querySelector('img').src.split('/').pop();
        let nome = event.target.closest('.item').querySelector('p').textContent;
        let preco = event.target.closest('.item').getAtribute('data-precogrande');
        menu.insertAdjacentHTML('beforeend', `<div>
                    <img src="fotos cardapio/${foto}" alt="" class="pizza-imagem">
                </div>
                <h2 class="pizza-nome">PIZZA: ${nome}</h2>`);
    }

});

fundomenu.addEventListener('click', (event) => {
    if (event.target === fundomenu) {
        fundomenu.style.display = 'none';
    }
});

fecharMenu.addEventListener('click', () => {
    fundomenu.style.display = 'none';
});

AddCart.addEventListener('click', () => {
    FundoCarrinho.style.display = 'flex';
    fundomenu.style.display = 'none';
});

FundoCarrinho.addEventListener('click', (event) => {
    if (event.target === FundoCarrinho) {
        FundoCarrinho.style.display = 'none';
    }
});
FecharCarrinho.addEventListener('click', () => {
    FundoCarrinho.style.display = 'none';
});
finalizar.addEventListener('click', () => {
    window.open(`https://wa.me/5511976393636?text=Olá! Gostaria de fazer um pedido: 
        1 Pizza de Bolonhesa
        Entregar em: ${Endereco.value}
        Total: ${Total.value}`, '_blank');
        
    }
);