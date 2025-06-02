// pega os elementos do DOM
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
const Cardapio = document.querySelectorAll('.imagens');
const pizza = document.querySelectorAll('.item');
const preco = document.querySelector('#preco')
const btnta = document.querySelector('.btnta')
const btnremover = document.querySelector('.remover')

const buttonOpenCart = document.querySelector('[data-js="open-cart"');

const ItemCarrinho = [];
// Preços das pizzas
let ValorPIzzag = '';
let ValorPIzzap = '';
var precoAtual = '';

//bebidas
window.onload = function(){
    const itens = document.querySelectorAll('.bebida');

    itens.forEach(item => {
        const precoBebida = item.querySelector('[data-preco-bebida]');
        const DOM = item.querySelector('.preco');

        if(precoBebida && DOM){
            const price = precoBebida.getAttribute('data-preco-bebida');
            const realPrice = price.replace(',00', '');
            DOM.textContent = realPrice;
        } else {
            return ; 
        }
    });
}
// Função para abrir o menu de pizza
const openCart = () => {
    const cart = document.querySelector('#fundocarrinho');
    cart.style.display = 'flex';
}

buttonOpenCart.addEventListener('click', openCart);
// filtro por categoria
function filtroPorCategoria() {
    const categoriaSelecionada = document.querySelector('#select-categoria');
    const categorias = document.querySelectorAll('[data-categoria]');

    categorias.forEach(categoria => {
        const item = categoria.getAttribute('data-categoria');
    });

};
// abre o menu de pizza ao clicar em uma pizza
Cardapio.forEach(item => {
    item.addEventListener('click', (event ) => {
        let parant = event.target.closest('.item');
        if (parant) {
            fundomenu.style.display = 'flex';
            const foto = parant.querySelector('img').getAttribute('src');
            const nome = parant.querySelector('img').getAttribute('data-pizza');
            ValorPIzzag = parant.querySelector('img').getAttribute('data-precogrande');
            ValorPIzzap = parant.querySelector('img').getAttribute('data-precomedio');
        precoAtual = ValorPIzzag; // Define o preço atual como o preço médio inicialmente
        // colocar os dados da pizza no menu
        itensPizza.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<div>
                    <img src="${foto}" alt="" class="pizza-imagem">
                </div>
                <h2 class="pizza-nome">${nome}</h2>`
        itensPizza.appendChild(div);

        colocarpreco();
        
}

}
);});
// Função para colocar o preço no menu
function colocarpreco() {
    preco.innerHTML = ''
    let fistchild = preco.firstChild;
        const addpreco = document.createElement('div')
        addpreco.classList.add('preco');
        addpreco.innerHTML = `
                    <p>Total</p>
                    <h3>${precoAtual}</h3>
                    `
    preco.insertBefore(addpreco, fistchild);
        //AddCart.insertBefore(addpreco, fistchild)
}
// colocar o preço correto no menu
document.querySelectorAll('.btntamanho').forEach(btn => {
    btn.addEventListener('click', function () {
        const tamanho = btn.getAttribute('data-tamanho');

        if (tamanho === 'm') {
            precoAtual = ValorPIzzap;
        } else if (tamanho === 'g') {
            precoAtual = ValorPIzzag;
        }

        colocarpreco();
    });
});

// botão clicado do tamanho
document.querySelectorAll('.btntamanho').forEach(btn => {
    btn.addEventListener('click', function() {
    document.querySelectorAll('.btntamanho').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    });
});
// botão clicado inteira
document.querySelectorAll('.btninteira').forEach(btn => {
    btn.addEventListener('click', function() {
    document.querySelectorAll('.btninteira').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    });
});
// fechar menu
fundomenu.addEventListener('click', (event) => {
    if (event.target === fundomenu) {
        fundomenu.style.display = 'none';
    }
});

fecharMenu.addEventListener('click', () => {
    fundomenu.style.display = 'none';

});



//adicionar pizza ao carrinho

AddCart.addEventListener('click', () => {
    FundoCarrinho.style.display = 'flex';
    fundomenu.style.display = 'none';
    ItemCarrinho.push({
        nome: itensPizza.querySelector('.pizza-nome').textContent,
        img: itensPizza.querySelector('.pizza-imagem').getAttribute('src'),
        tamanho: tamanho.querySelector('.btntamanho.active').textContent,
        borda: borda.querySelector('select').value,
        preco: precoatual = preco.querySelector('h3').textContent,
        inteira: document.querySelector('.btninteira.active').textContent
    });
    console.log(ItemCarrinho);
    colocaritemCarrinho();
});

function colocaritemCarrinho() {
    ItemCarrinho.forEach(item => {
        const cart = document.createElement('div');
        cart.classList.add('item-carrinho');
        cart.innerHTML = `
                    <div class="pizza-imagem"><img src="${item.img}" alt=""></div>
                    <div class="infocarrinho">
                        <strong>Pizza de ${item.nome}</strong><br>
                        Tamanho: ${item.tamanho}<br>
                        Borda: ${item.borda}<br>
                        Valor: ${item.preco}
                        Inteira: ${item.inteira}
                    </div>
                    <div class="remover">
                        <button class="remover-pizza">Remover</button>
                    </div>
                `;
        itensCarrinho.appendChild(cart);
    });
}
//fechar carrinho
FundoCarrinho.addEventListener('click', (event) => {
    if (event.target === FundoCarrinho) {
        FundoCarrinho.style.display = 'none';
    }
});
FecharCarrinho.addEventListener('click', () => {
    FundoCarrinho.style.display = 'none';
});
// remover item do carrinho
itensCarrinho.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover-pizza')) {
        const itemToRemove = event.target.closest('.item-carrinho');
        const itemIndex = Array.from(itensCarrinho.children).indexOf(itemToRemove);
        itensCarrinho.removeChild(itemToRemove);
        ItemCarrinho.splice(itemIndex, 1);

        if (ItemCarrinho.length === 0) {
            itensCarrinho.innerHTML = '<p>Nenhum item no carrinho</p>';
        }
    }
});

// finalizar pedido
finalizar.addEventListener('click', () => {
    window.open(`https://wa.me/5511976393636?text=Olá! Gostaria de fazer um pedido: 
        1 Pizza de Bolonhesa
        Entregar em: ${Endereco.value}
        Total: ${Total.value}`, '_blank');
        
    }
);

