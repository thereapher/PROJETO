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
const pizza = document.querySelectorAll('.item img');
const preco = document.querySelector('#preco')
const btnta = document.querySelector('.btnta')
const valorbebida = document.querySelector('#cardapio_bebidas .item').getAttribute('data-preco');
const btnremover = document.querySelector('.remover')

const buttonOpenCart = document.querySelectorAll('[data-js="open-cart"]');
const selectFilter = document.querySelector('#select-categoria');
const categorias = document.querySelectorAll('[data-categoria]');
const inputFilter = document.querySelector('#input_filter');
const precoMenu = document.querySelector('[data-js="final-price"]');
const btnSize = document.querySelectorAll('[data-tamanho]');
const selectBorder = document.querySelector('#select-border');
const buttonAddCart = document.querySelector('#adicionar-carrinho');

const select_payment = document.querySelector('#pagamento');
const payment_form = document.querySelector('[data-js="payment_form"]');

const allOrHalf = document.querySelectorAll('[data-js="all-or-half]');

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

    abrirMenu();
    closeMenu();
    verificarInteira();
}

function filtroPorCategoria () {
    const categoriaSelecionada = document.querySelector('#select-categoria').value;
    const categorias = document.querySelectorAll('[data-categoria]');

    categorias.forEach(categoria => {
        const item = categoria.getAttribute('data-categoria');

        if(categoriaSelecionada === "default" || item === categoriaSelecionada){
            categoria.style.display = 'grid';
        } else {
            categoria.style.display = 'none';
        }
    });
};

selectFilter.addEventListener('change', filtroPorCategoria);

function filtroPorNome () {
    const busca = document.querySelector('#input_filter').value.toLowerCase();
    const itens = document.querySelectorAll('.item');

    itens.forEach(item => {
        const name = item.querySelector('.item > p')?.textContent.toLowerCase() || '';

        if(name.includes(busca)) {
            item.style.display = 'grid'
        } else {
            item.style.display = 'none'
        }
    })
}

inputFilter.addEventListener('input', filtroPorNome);

function atualizarPrecoPizza() {
    const botaoTamanhoAtivo = document.querySelector('.btntamanho.active');
    if (!botaoTamanhoAtivo) return;

    const tamanho = botaoTamanhoAtivo.getAttribute('data-tamanho');
    const valorBorda = parseFloat(selectBorder.value) || 0;

    let valorPizza = 0;

    if (tamanho === 'grande') {
        valorPizza = parseFloat(precoPizzaGrande.replace('R$', '').replace(',', '.'));
    } else if (tamanho === 'medio') {
        valorPizza = parseFloat(precoPizzaMedia.replace('R$', '').replace(',', '.'));
    }

    const precoTotal = valorPizza + valorBorda;
    precoMenu.innerText = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
}

function verificarInteira(){
    console.log(allOrHalf);

    allOrHalf.forEach(button => {
        button.addEventListener('click', function() {
            console.log('teste')
        });
    })
}

btnSize.forEach(btn => {
    btn.addEventListener('click', function() {
        btnSize.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        atualizarPrecoPizza();
    });
});

selectBorder.addEventListener('change', atualizarPrecoPizza);

const abrirMenu = () => {
    pizza.forEach(item => {
        item.addEventListener('click', function() {
            const fotoPizza = this.getAttribute('src');
            const nomePizza = this.getAttribute('data-pizza');
            precoPizzaGrande = this.getAttribute('data-precogrande');
            precoPizzaMedia = this.getAttribute('data-precomedio');

            const pizzaImage = document.querySelector('[data-js="pizza-image"]');
            const pizzaName = document.querySelector('[data-js="pizza-name"]');

            pizzaImage.setAttribute('src', fotoPizza);
            pizzaName.innerHTML= nomePizza;

            btnSize.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tamanho="grande"]').classList.add('active');
            atualizarPrecoPizza();
            verificarInteira();

            fundomenu.style.display = 'flex';
        });
    })
};

const closeMenu = () =>{
    fundomenu.style.display = 'none';
}

fecharMenu.addEventListener('click', () => {closeMenu()}); 
//adicionar pizza ao carrinho

// AddCart.addEventListener('click', () => {
//     FundoCarrinho.style.display = 'flex';
//     fundomenu.style.display = 'none';
//     ItemCarrinho.push({
//         nome: itensPizza.querySelector('.pizza-nome').textContent,
//         img: itensPizza.querySelector('.pizza-imagem').getAttribute('src'),
//         tamanho: tamanho.querySelector('.btntamanho.active').textContent,
//         borda: borda.querySelector('select').value,
//         preco: precoatual = preco.querySelector('h3').textContent,
        // inteira: document.querySelector('.btninteira.active').textContent
//     });
//     console.log(ItemCarrinho);
//     colocaritemCarrinho();
// });

const openCart = () => {
    const cart = document.querySelector('#fundocarrinho');
    cart.style.display = 'flex';
}

buttonOpenCart.forEach(button => {
    button.addEventListener('click', () => {
        openCart(); 
        closeMenu();
    });
})

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

select_payment.addEventListener('change', function(){
    const options = this.options[this.selectedIndex].text;
    payment_form.textContent = options;
});

// remover item do carrinho
itensCarrinho.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover-pizza')) {
        const itemToRemove = event.target.closest('.item-carrinho');
        const itemIndex = Array.from(itensCarrinho.children).indexOf(itemToRemove);
        itensCarrinho.removeChild(itemToRemove);
        ItemCarrinho.splice(itemIndex, 1);

        if (ItemCarrinho.length === 0) {
            itensCarrinho.innerHTML = '<p class="m-auto">Nenhum item no carrinho</p>';
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

