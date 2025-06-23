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

function verificarInteira() {
    const inteira = document.querySelector('.btninteira[data-half="inteira"]');
    const meia = document.querySelector('.btninteira[data-half="meia"]');
    const selectSaborMeio = document.querySelector('.select-sabor-meio');
    const pizzaHalfName = document.querySelector('[data-js="pizza-half-name"]');
    const pizzaImages = document.querySelectorAll('.pizza-foto-legal');
    const explanation = document.querySelector('[data-js="half-choose"]');

    if (!inteira || !meia) {
        console.error('Botões de inteira/meia não encontrados');
        return;
    }

    inteira.addEventListener('click', () => {
        inteira.classList.add('active');
        meia.classList.remove('active');
        selecionandoMeia = false;
        selectSaborMeio.style.display = 'none';
        pizzaHalfName.style.display = 'none';
        pizzaImages[1].style.display = 'none';
        explanation.classList.add('d-none');
        saborMeia1 = null;
        saborMeia2 = null;
        atualizarPrecoPizza();
    });

    meia.addEventListener('click', () => {
        meia.classList.add('active');
        inteira.classList.remove('active');
        selecionandoMeia = true;
        selectSaborMeio.style.display = 'block';
        pizzaHalfName.style.display = 'block';
        pizzaImages[1].style.display = 'block';
        explanation.classList.remove('d-none');
        saborMeia1 = null;
        saborMeia2 = null;
        atualizarPrecoPizza();
    });
}

btnSize.forEach(btn => {
    btn.addEventListener('click', function() {
        btnSize.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        atualizarPrecoPizza();
    });
});

selectBorder.addEventListener('change', atualizarPrecoPizza);

function selectPizza() {
    const pizzas = document.querySelectorAll('.item img');
    const selectSaborMeio = document.querySelector('.select-sabor-meio');
    const pizzaHalfName = document.querySelector('[data-js="pizza-half-name"]');
    const pizzaImages = document.querySelectorAll('.pizza-foto-legal');
    const pizzaNomeLegal = document.querySelector('.pizza-nome-legal');
    const ingredientes = document.querySelector('.ingredientes');
    const fundomenu = document.querySelector('.fundomenu');

    pizzas.forEach(pizza => {
        pizza.addEventListener('click', () => {
            const nome = pizza.getAttribute('data-pizza');
            const preco = pizza.getAttribute('data-precogrande');
            const imagem = pizza.getAttribute('src');
            const precoMedio = pizza.getAttribute('data-precomedio');
            const ingrediente = pizza.getAttribute('data-ingrediente')

            // Atualiza as variáveis globais
            precoPizzaGrande = preco;
            precoPizzaMedia = precoMedio;

            if (selecionandoMeia) {
                if (!saborMeia1) {
                    saborMeia1 = nome;
                    pizzaImages[0].src = imagem;
                    pizzaNomeLegal.textContent = nome;
                    ingredientes.textContent = `Ingredientes: ${ingrediente}`;
                    
                    // Atualiza o select com os outros sabores
                    selectSaborMeio.innerHTML = '<option value="">Escolha o segundo sabor</option>';
                    pizzas.forEach(p => {
                        if (p.getAttribute('data-pizza') !== nome) {
                            const option = document.createElement('option');
                            option.value = p.getAttribute('data-pizza');
                            option.textContent = p.getAttribute('data-pizza');
                            option.dataset.preco = p.getAttribute('data-precogrande');
                            option.dataset.imagem = p.getAttribute('src');
                            selectSaborMeio.appendChild(option);
                        }
                    });
                }
            } else {
                // Pizza inteira
                pizzaImages[0].src = imagem;
                pizzaImages[1].style.display = 'none';
                pizzaNomeLegal.textContent = nome;
                pizzaHalfName.style.display = 'none';
                selectSaborMeio.style.display = 'none';
                ingredientes.textContent = `Ingredientes: ${ingrediente}`;
            }

            // Atualiza o preço
            atualizarPrecoPizza();
            
            // Mostra o menu
            fundomenu.style.display = 'flex';
        });
    });

    selectSaborMeio.addEventListener('change', (e) => {
        if (e.target.value) {
            const option = e.target.options[e.target.selectedIndex];
            saborMeia2 = e.target.value;
            pizzaImages[1].src = option.dataset.imagem;
            pizzaHalfName.textContent = e.target.value;
            
            // Calcula o preço baseado no sabor mais caro
            const preco1 = parseFloat(precoPizzaGrande.replace('R$', '').replace(',', '.'));
            const preco2 = parseFloat(option.dataset.preco.replace('R$', '').replace(',', '.'));
            const preco = Math.max(preco1, preco2);
            
            // Atualiza o preço
            precoMenu.innerText = `R$ ${preco.toFixed(2).replace('.', ',')}`;
        }
    });
}

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

const closeMenu = () =>{
    fundomenu.style.display = 'none';
}

fecharMenu.addEventListener('click', () => {closeMenu()}); 
//adicionar pizza ao carrinho

AddCart.addEventListener('click', () => {
    const isMeia = document.querySelector('.btninteira[data-half="meia"]').classList.contains('active');
    const tamanhoAtivo = document.querySelector('.btntamanho.active').textContent;
    const bordaSelecionada = document.querySelector('#select-border option:checked').textContent;
    const precoAtual = document.querySelector('[data-js="final-price"]').textContent;
    
    if (isMeia && (!saborMeia1 || !saborMeia2)) {
        alert('Por favor, selecione os dois sabores para a pizza meio a meio');
        return;
    }

    FundoCarrinho.style.display = 'flex';
    fundomenu.style.display = 'none';

    let nomePizza = '';
    let imagemPizza = '';
    let precoPizza = precoAtual;

    if (isMeia) {
        nomePizza = `${saborMeia1} / ${saborMeia2}`;
        imagemPizza = document.querySelector('.pizza-foto-legal').src;
    } else {
        nomePizza = document.querySelector('.pizza-nome-legal').textContent;
        imagemPizza = document.querySelector('.pizza-foto-legal').src;
    }

    let existe = ItemCarrinho.find(item => 
        item.nome === nomePizza &&
        item.tamanho === tamanhoAtivo &&
        item.borda === bordaSelecionada
    );

    if (!existe) {
        ItemCarrinho.push({
            nome: nomePizza,
            img: imagemPizza,
            tamanho: tamanhoAtivo,
            borda: bordaSelecionada,
            preco: precoPizza,
            inteira: isMeia ? 'Meia' : 'Inteira',
            quantidade: 1
        });
    const totalcart = ItemCarrinho.reduce((soma, item) => {
    const valorLimpocart = item.preco.replace("R$ ", "").replace(",", ".");
    return soma + parseFloat(valorLimpocart);
}, 0);
        let precocart = document.querySelector('[data-js="total_price"]')
        precocart.innerHTML = totalcart
    } else {
        existe.quantidade += 1;
        const precoExistente = parseFloat(existe.preco.replace('R$ ', '').replace(',', '.'));
        existe.preco = `R$ ${(precoExistente * existe.quantidade).toFixed(2).replace('.', ',')}`;

        const totalcart = ItemCarrinho.reduce((soma, item) => {
    const valorLimpocart = item.preco.replace("R$ ", "").replace(",", ".");
    return soma + parseFloat(valorLimpocart);
}, 0);
        let precocart = document.querySelector('[data-js="total_price"]')
        precocart.innerHTML = totalcart;
        
    }

    if(ItemCarrinho.length > 1) {
        let clone = itensCarrinho.querySelector('.item-carrinho').cloneNode(true);
        itensCarrinho.appendChild(clone);
    }
    
    colocaritemCarrinho();
});

function attpreco(){
    const totalcart = ItemCarrinho.reduce((soma, item) => {
    const valorLimpocart = item.preco.replace("R$ ", "").replace(",", ".");
    return soma + parseFloat(valorLimpocart);
    })
    let precocart =  document.querySelector('[data-js="total_price"]')
    precocart = totalcart
}

function colocaritemCarrinho() {
    const itensCarrinho = document.querySelectorAll('.item-carrinho');
    
    ItemCarrinho.forEach((item, index) => {
        if (itensCarrinho[index]) {
            const image = itensCarrinho[index].querySelector('[data-js="img_cart"]');
            const name = itensCarrinho[index].querySelector('[data-js="name_cart"]');
            const size = itensCarrinho[index].querySelector('[data-js="size_cart"]');
            const border = itensCarrinho[index].querySelector('[data-js="border_cart"]');
            const valor = itensCarrinho[index].querySelector('[data-js="valor_cart"]');
            const quantidade = itensCarrinho[index].querySelector('[data-js="quantidade_cart"]');

            if (image) image.src = item.img;
            if (name) name.textContent = item.nome;
            if (size) size.textContent = item.tamanho;
            if (border) border.textContent = item.borda;
            if (valor) valor.textContent = item.preco;
            if (quantidade) quantidade.textContent = item.quantidade;
        }
    });
}

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

function selecionarmeia(){
    
    
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
    const rua = document.querySelector('#endereco').value.trim();
    const numrua = document.querySelector('#numero').value.trim();
    const complemento = document.querySelector('#complemento').value.trim();
    const endereco = `${rua}, ${numrua}, ${complemento}`;

    const pessoa = document.querySelector('#nome_cliente').value.trim();
    const formapagto = document.querySelector('#pagamento').value;

    const isopen = horarioaberto();

    if (!pessoa) {
    Toastify({
    text: "Por favor, informe o seu Nome",
    duration: 1000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right,rgb(176, 18, 0),rgb(65, 14, 0))",
    },
}).showToast()
        return;
    }

    if (!rua || !numrua) {
        Toastify({
    text: "Por favor, informe o endereço completo.",
    duration: 1000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right,rgb(176, 18, 0),rgb(65, 14, 0))",
    },
}).showToast()
        
        return;
    }

    if (!formapagto || formapagto === "0") {
        Toastify({
    text: "Por favor, selecione a forma de pagamento.",
    duration: 1000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right,rgb(176, 18, 0),rgb(65, 14, 0))",
    },
}).showToast()
        return;
    }

    if (!isopen) {
        Toastify({
    text: "Pedidos só podem ser feitos entre 18h e 00h.",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right,rgb(176, 18, 0),rgb(65, 14, 0))",
    },
}).showToast()
        return;
    }

    if (ItemCarrinho.length === 0) {
        Toastify({
    text: "Seu carrinho está vazio.",
    duration: 1000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right,rgb(176, 18, 0),rgb(65, 14, 0))",
    },
}).showToast()
        
        return;
    }

    const cartitens = ItemCarrinho.map(item => {
        return ` ${item.nome} 
        Tamanho: ${item.tamanho}
        Borda: ${item.borda}
        Preço: R$${item.preco}
        ${item.inteira}
        Quantidade: ${item.quantidade} |`;
    }).join('');

    const total = ItemCarrinho.reduce((soma, item) => {
        const valorLimpo = item.preco.replace("R$ ", "").replace(",", ".");
        return soma + parseFloat(valorLimpo);
    }, 0).toFixed(2).replace('.', ',');

    const mensagem = encodeURIComponent(`
Olá! sou o(a) ${pessoa}
Gostaria de fazer um pedido:
${cartitens}
Entregar em: ${endereco}
Total: R$${total}
Forma De Pagamento: ${formapagto}
    `);

    const telefone = '5511976393636';
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
});


// Adiciona a função para inicializar os eventos quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    verificarInteira();
    selectPizza();
});
function horarioaberto() {
    const data = new Date();
    const hora = data.getHours();
    return hora>=18 && hora< 24;
    
}
console.log()