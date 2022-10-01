window.width = 320
window.height = 200
window.scale = 4
window.ctx = window.display.getContext('2d')

display.style.cssText = 'image-rendering: pixelated; image-rendering: crisp-edges;'
display.width = width
display.height = height
display.style.width = width * scale + 'px'
display.style.height = height * scale + 'px'
ctx.imageSmoothingEnabled = false
ctx.font = '10px sans-serif'
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx.lineWidth = 2

window.rect = (x, y, w, h, style = '#FFF', alpha = 1.0) => {
  ctx.globalAlpha = alpha
  ctx.fillStyle = style
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0)
}

window.clear = (style = '#000') => {
  ctx.globalAlpha = 1.
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, style)
}

window.line = (x1, y1, x2, y2, style = '#FFF', lineWidth = 2, alpha = 1.) => {
  ctx.globalAlpha = alpha
  ctx.strokeStyle = style
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1 | 0, y1 | 0)
  ctx.lineTo(x2 | 0, y2 | 0)
  ctx.stroke()
}

export {}

