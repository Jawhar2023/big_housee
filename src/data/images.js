const modules = import.meta.glob('../assets/amazon/*.{jpg,JPG,png,PNG}', {
  eager: true,
  import: 'default',
})

export function img(file) {
  const key = `../assets/amazon/${file}`
  const hit = modules[key]
  if (!hit) {
    console.warn('Missing amazon image:', file)
    return ''
  }
  return hit
}

export function imgs(...files) {
  return files.map(img).filter(Boolean)
}
