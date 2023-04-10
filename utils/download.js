class Download {
  downloadFile(fileName, content) {
    const aLink = document.createElement('a')
    const block = content.split(';') // Split the base64 string in data and contentType
    const contentType = block[0].split(':')[1]
    const blob = this.base64ToBlob(content, contentType) // new Blob([content]);

    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', true, true) // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })) // 兼容火狐
  }

  base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || ''

    sliceSize = sliceSize || 512

    var byteCharacters = window.atob(b64Data.substring(b64Data.indexOf(',') + 1))

    var byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize)

      var byteNumbers = new Array(slice.length)

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      var byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    var blob = new Blob(byteArrays, {
      type: contentType
    })

    return blob
  }
}
export {
  Download
}
