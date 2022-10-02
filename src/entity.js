window.E = [] // all entities, minx order
window._dE = [] // all entities, display order

class Entity {
  position = [0., 0.]
  velocity = [0., 0.]
  extend = [8., 8.]
  screenBounce = false
  screenBound = false
  screenWrap = false
  speed = 60.


  alpha = 1. // draw alpha
  order = 1. // draw order, lower first
  color = '#aaa' // draw fill style/color
  scale = [1., 1.] // draw scale

  constructor(params) {
    for (let key in params) {
      let val = params[key]
      this[key] = val
    }
    E.push(this)
    _dE.push(this)
  }

  set x(v) { this.position[0] = v}
  get x() { return this.position[0]}
  set y(v) { this.position[1] = v}
  get y() { return this.position[1]}
  set w(v) { this.extend[0] = v * .5}
  get w() { return this.extend[0] * 2.}
  set h(v) { this.extend[1] = v * .5}
  get h() { return this.extend[1] * 2.}
  set vx(v) { this.velocity[0] = v}
  get vx() { return this.velocity[0]}
  set vy(v) { this.velocity[1] = v}
  get vy() { return this.velocity[1]}

  draw() {
    let xs = this.extend[0] * 2 * this.scale[0]
    let ys = this.extend[1] * 2 * this.scale[1]
    let cx = this.position[0] - xs / 2 - camera[0] + _shake[0]
    let cy = this.position[1] - ys / 2 - camera[1] + _shake[1]
    rect(cx, cy, xs, ys, this.color, this.alpha)
  }

  update(dt) {

  }

  _update(dt) {
    this.position[0] += this.velocity[0] * dt
    this.position[1] += this.velocity[1] * dt
    for (let c = 0; c < 2; c++) {
      let bound = c == 0 ? width : height
      if (this.screenBounce) {
        if (this.position[c] - this.extend[c] < 0 && this.velocity[c] < 0) {
          this.velocity[c] *= -1
        }
        if (this.position[c] + this.extend[c] > bound && this.velocity[c] > 0) {
          this.velocity[c] *= -1
        }
      }
      if (this.screenBound) {
        if (this.position[c] - this.extend[c] < 0 && this.velocity[c] < 0) {
          this.position[c] = this.extend[c]
          this.velocity[c] *= 0
        }
        if (this.position[c] + this.extend[c] > bound && this.velocity[c] > 0) {
          this.position[c] = bound - this.extend[c]
          this.velocity[c] *= 0
        }
      }
    }
  }

  dispose() {

  }
}

window.Entity = Entity

window.updateAllEntities = (dt) => {
  E.forEach(e => {
    let hw = e.w / 2
    let hh = e.h / 2
    e._minx = e.x - hw
    e._maxx = e.x + hw
    e._miny = e.y - hh
    e._maxy = e.y + hh
  })
  E.sort((a, b) => a._minx - b._minx)
  E.forEach(e => {
    e._update(dt)
    e.update(dt)
  })
}

window.drawAllEntities = () => {
  _dE.sort((a, b) => a.order - b.order)
  _dE.forEach(e => {
    e.draw()
  })
}

window.clearStage = () => {
  E = []
}
