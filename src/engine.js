import "./canvas.js"
import "./audio.js"
import "./input.js"
import "./vector.js"
import "./entity.js"

window.PI = Math.PI
window.cos = Math.cos
window.sin = Math.sin
window.sqrt = Math.sqrt
window.rnd = (min=0., max=1.) => { return Math.random() * (max - min) + min }

window._uid = 0
window.uid = () => _uid++
window.assets = {}
window.camera = [0., 0.]
window._shake = [0., 0.]
window._shakea = 0.

_startAudio()
window.update = (dt) => {}
window.drawBackground = () => {}
window.draw = () => {}
window.drawForeground = () => {}

window.time = performance.now() / 1000.0

function _loop() {
  let t = performance.now() / 1000.0
  let dt = t - time
  if (dt < 0.1) {
      _shakea *= 0.95
      if (_shakea < 2) { _shakea = 0.}
      _shake[0] = rnd(-1, 1) * _shakea
      _shake[1] = rnd(-1, 1) * _shakea
      updateAllEntities(dt)
      update(dt)
      drawBackground()
      drawAllEntities()
      draw()
      drawForeground()
  }
  time = t
  window.requestAnimationFrame(_loop)
}
_loop()
