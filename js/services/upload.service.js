// *** Upload a picture to the canvas. ***

function uploadImg() {
    const meme = getMeme()
    meme.isExport = true
    reRenderCanvas()

    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        const meme = getMeme()

        document.querySelector('.share-modal span').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share on Facebook   
        </a>`
        document.querySelector('.share-modal p').innerText = `Your photo is available here: ${uploadedImgUrl}`
        meme.isExport = false
        reRenderCanvas()
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)
    
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            onSuccess(url)
            openModal()
        })
        .catch((err) => {
            console.error(err)
        })
}