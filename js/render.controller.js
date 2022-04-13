'use strict'


function renderMemes() {
    const elGallery = document.querySelector('.gallery')
    const memes = getMemes()
    let injectionTxt = memes.map((meme) => {
        return `<img class="item" src="${meme.url}" alt="">`
    })
    elGallery.innerHTML = injectionTxt.join('')
}







function renderEditor(){
    const elContainer = document.querySelector('main.content')
    let injectionTxt = ``
    console.log('to editor')
}