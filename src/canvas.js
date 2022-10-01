width = 320
height = 200
scale = 3
ctx = window.display.getContext('2d')

function rect(x, y, w, h, style = '#FFF', alpha = 1.0) {
  ctx.globalAlpha = alpha
  ctx.fillStyle = style
  ctx.fillRect(x, y, w, h)
}

function clear(style = '#000') {
  ctx.globalAlpha = 1.
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, style)
}

keys = {}
entities = []
assets = {}
camera = [0., 0.]
_shake = [0., 0.]
_shakea = 0.
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

time = performance.now() / 1000.0
function update() {}

function _loop() {
  let t = performance.now() / 1000.0
  let dt = t - time
  if (dt < 0.1) {
      _shakea *= 0.8
      _shake[0] = (Math.random() * 2. - 1.) * _shakea
      _shake[1] = (Math.random() * 2. - 1.) * _shakea
      update(dt)
  }
  time = t
  window.requestAnimationFrame(_loop)
}
_loop()
