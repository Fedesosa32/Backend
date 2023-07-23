
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


