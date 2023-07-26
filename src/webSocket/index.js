

function socketManager(socket){

    console.log(`Usuario conectado: ${socket.id}`)

    socket.on ('disconnect', ()=>{
        console.log('Usuario Desconectado')
    })

    setTimeout(()=>{
        socket.emit ('promo', {title: "Mogul", sale: 15})
    }, 500)
}


module.exports = socketManager