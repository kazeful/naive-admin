/**
 * @description: base64 to blob
 */
export function base64ToBlob(base64Buf) {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new Blob([u8arr], { type: mime })
}

/**
 * @description: img url to base64
 */
export function urlToBase64(url, mineType) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function () {
      if (!canvas || !ctx)
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject('Browsers do not support canvas')

      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}
