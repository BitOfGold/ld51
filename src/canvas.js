window.PI = Math.PI
window.cos = Math.cos
window.sin = Math.sin

width = 320
height = 200
scale = 4
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

function line(x1, y1, x2, y2, style = '#FFF', lineWidth = 2, alpha = 1.) {
  ctx.globalAlpha = alpha
  ctx.strokeStyle = style
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function update() {}
function onkey(key) {}
var _uid = 0
uid = () => _uid++
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

_startAudio()

document.onkeydown = (e) => {
  let kc = e.key.toLowerCase()
  keys[kc] = true
  onkey(kc)
}

document.onkeyup = (e) => {
  let kc = e.key.toLowerCase()
  keys[kc] = false
}

display.addEventListener('pointerdown', (e) => {
  //console.log("P down", e)
})
display.addEventListener('pointerup', (e) => {
  //console.log("P up", e)
})
display.addEventListener('pointermove', (e) => {
  //console.log("P move", e)
})

time = performance.now() / 1000.0

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
