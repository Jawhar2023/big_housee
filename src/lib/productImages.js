/**
 * Read & lightly compress images for admin catalog (data URLs in localStorage).
 */

const MAX_EDGE = 1400
const JPEG_QUALITY = 0.82
const MAX_BYTES_WARN = 4.5 * 1024 * 1024 // soft warn per batch estimate

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Invalid image'))
    }
    img.src = url
  })
}

/** @param {File} file */
export async function fileToProductDataUrl(file) {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('Not an image')
  }
  // Keep SVG / tiny GIFs as-is via FileReader if canvas would break them
  if (file.type === 'image/svg+xml' || file.size < 80_000) {
    return readAsDataUrl(file)
  }

  const img = await loadImage(file)
  let { width, height } = img
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height))
  width = Math.round(width * scale)
  height = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(img, 0, 0, width, height)

  const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  const quality = mime === 'image/jpeg' ? JPEG_QUALITY : undefined
  return canvas.toDataURL(mime, quality)
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Read failed'))
    reader.readAsDataURL(file)
  })
}

/** @param {FileList|File[]} files */
export async function filesToProductDataUrls(files) {
  const list = [...files].filter((f) => f.type.startsWith('image/'))
  const urls = []
  for (const file of list) {
    urls.push(await fileToProductDataUrl(file))
  }
  const approx = urls.reduce((s, u) => s + u.length, 0)
  return { urls, approxBytes: approx, large: approx > MAX_BYTES_WARN }
}
