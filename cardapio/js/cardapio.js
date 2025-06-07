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
//const preco = document.querySelector('#preco')
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

const allOrHalf = document.querySelectorAll('[data-half]');
const halfChoose = document.querySelector('[data-js="half-choose"]');
const halfName = document.querySelector('[data-js="pizza-half-name"]')
const halfPizza = document.querySelector('[data-js="pizza-half-image"]')
let namepizza = document.querySelector('[data-js="pizza-name"]');

const ItemCarrinho = [];
// Preços das pizzas
let ValorPIzzag = '';
let ValorPIzzap = '';
var precoAtual = '';

let saborMeia1 = null;
let saborMeia2 = null;
let precoMeia1 = 0;
let precoMeia2 = 0;
let selecionandoMeia = false;

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

    closeMenu();
    selectPizza();
    activeHalfPizza();
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
    allOrHalf.forEach(button => {
        button.addEventListener('click', function() {
            const isPizza = this.getAttribute('data-half')
            document.querySelectorAll(`[data-half]`).forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            if(isPizza === "meia"){
                halfChoose.classList.remove('d-none');
                halfName.classList.remove('d-none');
                halfPizza.classList.remove('d-none');

            } else{
                halfChoose.classList.add('d-none');
                halfName.classList.add('d-none');
                halfPizza.classList.add('d-none');
            }


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

function activeHalfPizza() {
    const botaoMeia = document.querySelector('[data-half="meia"]');
    if (!botaoMeia) return;

    botaoMeia.addEventListener('click', () => {
        selecionandoMeia = true;
        saborMeia1 = null;
        saborMeia2 = null;
        precoMeia1 = 0;
        precoMeia2 = 0;
        precoMenu.innerText = 'R$ 0,00';
        document.querySelector('[data-js="pizza-name"]').innerText = '';
    });
}

function selectPizza() {
    const pizzas = document.querySelectorAll('.item img');

    pizzas.forEach(pizzaEl => {
        pizzaEl.addEventListener('click', function () {
            const nome = this.getAttribute('data-pizza');
            const preco = parseFloat(this.getAttribute('data-precogrande').replace('R$', '').replace(',', '.'));
            const imagem = this.getAttribute('src');

            const pizzaImage = document.querySelector('[data-js="pizza-image"]');
            const pizzaImage2 = document.querySelector('[data-js="pizza-image-2"]');
            const pizzaName = document.querySelector('[data-js="pizza-name"]');

            if (selecionandoMeia) {
                if (!saborMeia1) {
                    saborMeia1 = nome;
                    precoMeia1 = preco;
                    halfName.innerText = `1ª metade: ${saborMeia1}`;
                    pizzaImage.setAttribute('src', imagem);
                    pizzaImage2.style.display = 'none';
                } else if (!saborMeia2 && nome !== saborMeia1) {
                    saborMeia2 = nome;
                    precoMeia2 = preco;

                    const precoFinal = Math.max(precoMeia1, precoMeia2);
                    precoMenu.innerText = `R$ ${precoFinal.toFixed(2).replace('.', ',')}`;

                    pizzaName.innerText = `${saborMeia1}`;
                    halfName.innerText = `e ${saborMeia2}`;
                    pizzaImage2.setAttribute('src', imagem);
                    pizzaImage2.style.display = 'inline-block';

                    selecionandoMeia = false;
                    fundomenu.style.display = 'flex';
                }
                return;
            }

            precoPizzaGrande = this.getAttribute('data-precogrande');
            precoPizzaMedia = this.getAttribute('data-precomedio');

            pizzaImage.setAttribute('src', imagem);
            pizzaImage2.style.display = 'none';
            pizzaName.innerText = nome;

            btnSize.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tamanho="grande"]').classList.add('active');

            atualizarPrecoPizza();
            verificarInteira();

            fundomenu.style.display = 'flex';
        });
    });
}
const closeMenu = () =>{
    fundomenu.style.display = 'none';
}

fecharMenu.addEventListener('click', () => {closeMenu()}); 
//adicionar pizza ao carrinho

AddCart.addEventListener('click', () => {
    FundoCarrinho.style.display = 'flex';
    fundomenu.style.display = 'none';

    let existe = ItemCarrinho.find(item => item.nome === itensPizza.querySelector('[data-js="pizza-name"]').textContent &&
    item.tamanho === tamanho.querySelector('.btntamanho.active').textContent &&
    item.borda === borda.querySelector('#select-border option:checked').textContent &&
    item.preco === precoatual &&
    item.inteira === document.querySelector('.btninteira.active').textContent
    );



    if (!existe ) {
    ItemCarrinho.push({
        nome: itensPizza.querySelector('[data-js="pizza-name"]').textContent,
        img: itensPizza.querySelector('[data-js="pizza-image"]').getAttribute('src'),
        tamanho: tamanho.querySelector('.btntamanho.active').textContent,
        borda: borda.querySelector('#select-border option:checked').textContent,
        preco: precoatual = preco.querySelector('[data-js="final-price"]').textContent,
        inteira: document.querySelector('.btninteira.active').textContent,
        quantidade: 1 
    });
    console.log(ItemCarrinho);
}
else if (existe.inteira === 'meia'){
    ItemCarrinho.push({
        nome: itensPizza.querySelector('[data-js="pizza-name"]').textContent,
        img: itensPizza.querySelector('[data-js="pizza-image"]').getAttribute('src'),
        tamanho: tamanho.querySelector('.btntamanho.active').textContent,
        borda: borda.querySelector('#select-border option:checked').textContent,
        preco: precoatual = preco.querySelector('[data-js="final-price"]').textContent,
        inteira: document.querySelector('.btninteira.active').textContent,
        quantidade: 1 
    });

}
else{
    existe.quantidade += 1;
    const precoExistente = existe.preco.replace("R$ ", "").replace(",", ".");
    existe.preco = parseFloat(precoExistente) * existe.quantidade
    

}


    if(ItemCarrinho.length > 1) {
            let clone = itensCarrinho.querySelector('.item-carrinho').cloneNode(true);
                    itensCarrinho.appendChild(clone);
            
        }


colocaritemCarrinho();



});

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
        let image = document.querySelector('[data-js="img_cart"]');
        let name = document.querySelector('[data-js="name_cart"]');
        let size = document.querySelector('[data-js="size_cart"]');
        let border = document.querySelector('[data-js="border_cart"]');
        let valor = document.querySelector('[data-js="valor_cart"]');
        let quantidade = document.querySelector('[data-js="quantidade_cart"]');

        image.textContent = item.img;
        name.textContent = item.nome;
        size.textContent = item.tamanho;
        border.textContent = item.borda;
        valor.textContent = item.preco;
        quantidade.textContent = item.quantidade;

    });
}
function colocaritemCarrinhoMeia() {
    ItemCarrinho.forEach(item => {
        let image = document.querySelector('[data-js="img_cart"]');
        let name = document.querySelector('[data-js="name_cart"]');
        let size = document.querySelector('[data-js="size_cart"]');
        let border = document.querySelector('[data-js="border_cart"]');
        let valor = document.querySelector('[data-js="valor_cart"]');
        let quantidade = document.querySelector('[data-js="quantidade_cart"]');

        image.textContent = item.img;
        name.textContent = item.nome;
        size.textContent = item.tamanho;
        border.textContent = item.borda;
        valor.textContent = item.preco;
        quantidade.textContent = item.quantidade;

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

