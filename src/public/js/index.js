
const socket = io ()

const bannerEl = document.querySelector('#rebaja-banner')
const cartBadgeEl = document.querySelector('#cart-badge')

socket.on('promo', ({ title, sale }) => {
    const titleEl = bannerEl.querySelector('#title')
    const saleEl = bannerEl.querySelector('#sale')


    titleEl.innerHTML = title
    saleEl.innerHTML = `${sale}%`

    bannerEl.style.visibility = 'visible'
    bannerEl.style.display = 'block'
    })

    socket.on('productoActualizado', (products) => {
        listaDeProductos(products);
    });
    
    function listaDeProductos(products) {
        const listado = document.getElementById('products');
        listado.innerHTML = '';
    
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="${product.image}" alt="foto producto" />
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">${product.title}</h3>
                        <h5>$ ${product.price}</h5>
                        <span class="uk-badge">${product.category}</span>
                        <span class="uk-badge"> Stock ${product.stock}</span>
                        <span class="uk-badge"> Code ${product.code}</span>
                        <p>${product.description}</p>
                        <button class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>
                    </div>
                </div>
            `;
    
            listado.appendChild(productDiv);
            
        });
    }

