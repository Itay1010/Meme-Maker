'use strict'

let gMemes


function getMemes() {
    return gMemes
}

function makeMemes() {
    gMemes = [
        _createMeme(['trump', 'pointing', 'man'], 'img/meme-imgs (square)/1.jpg'),
        _createMeme(['dogs', 'happy', 'cute'], 'img/meme-imgs (square)/2.jpg'),
        _createMeme(['baby', 'dog', 'cute', 'sleeping'], 'img/meme-imgs (square)/3.jpg'),
        _createMeme(['cat', 'cute', 'sleeping'], 'img/meme-imgs (square)/4.jpg'),
        _createMeme(['baby', 'happy'], 'img/meme-imgs (square)/5.jpg'),
        _createMeme(['aliens', 'pointing', 'man'], 'img/meme-imgs (square)/6.jpg'),
        _createMeme(['baby', 'surprised', 'cute'], 'img/meme-imgs (square)/7.jpg'),
        _createMeme(['happy', 'man'], 'img/meme-imgs (square)/8.jpg'),
        _createMeme(['baby', 'happy'], 'img/meme-imgs (square)/9.jpg'),
        _createMeme(['man', 'happy'], 'img/meme-imgs (square)/10.jpg'),
        _createMeme(['man', 'happy'], 'img/meme-imgs (square)/11.jpg'),
        _createMeme(['man', 'pointing'], 'img/meme-imgs (square)/12.jpg')
    ]

}

function _createMeme(keywords, url) {
    return {
        id: makeId(),
        keywords,
        url,
    }
}