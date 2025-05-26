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
const pizza = document.querySelectorAll('.item');
const preco = document.querySelector('.preco')
const btnta = document.querySelector('.btnta')
const ItemCarrinho = [];


Cardapio.addEventListener('click', (event) => {
    let parant = event.target.closest('.item');
    if (parant) {
        fundomenu.style.display = 'flex';
        const foto = parant.querySelector('img').getAttribute('src');
        const nome = parant.querySelector('img').getAttribute('data-pizza');
        const ValorPIzza = parant.querySelector('img').getAttribute('data-precogrande');
        
        itensPizza.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<div>
                    <img src="${foto}" alt="" class="pizza-imagem">
                </div>
                <h2 class="pizza-nome">${nome}</h2>`
        itensPizza.appendChild(div);

        preco.innerHTML = ''
        const addpreco = document.createElement('div')
        addpreco.innerHTML = `<div>
                    <p>Total</p>
                    <h3>${ValorPIzza}</h3>
                    </div>`
        preco.appendChild(addpreco)
}
}
);

document.querySelectorAll('.btntamanho').forEach(btn => {
    btn.addEventListener('click', function() {
    document.querySelectorAll('.btntamanho').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    });
});

document.querySelectorAll('.btninteira').forEach(btn => {
    btn.addEventListener('click', function() {
    document.querySelectorAll('.btninteira').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    });
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
    ItemCarrinho.push({
        nome: itensPizza.querySelector('.pizza-nome').textContent,
        tamanho: tamanho.value,
        borda: borda.value,
        preco: itensPizza.querySelector('.pizza-imagem').getAttribute('data-precogrande'),
    });
    console.log(ItemCarrinho);
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