window.E = [] // all entities, minx order
window._dE = [] // all entities, display order

class Entity {
  x = 0.
  y = 0.
  order = 1.
  w = 16.
  h = 16.
  color = '#aaa'
  vx = 0.
  vy = 0.
  screenBounce = false
  screenBound = false
  screenWrap = false
  speed = 60.
  alpha = 1.
  scale = [1., 1.] // draw scale

  constructor(params) {
    for (let key in params) {
      let val = params[key]
      this[key] = val
    }
    E.push(this)
    _dE.push(this)
  }

  draw() {
    let xs = this.w * this.scale[0]
    let ys = this.h * this.scale[1]
    let cx = this.x - xs / 2 - camera[0] + _shake[0]
    let cy = this.y - xs / 2 - camera[1] + _shake[1]
    rect(cx, cy, xs, ys, this.color, this.alpha)
  }

  update(dt) {

  }

  _update(dt) {
    this.x = this.x + this.vx * dt
    this.y = this.y + this.vy * dt
    let hw = this.w / 2
    let hh = this.h / 2
    if (this.screenBounce) {
      if (this.x - hw < 0 && this.vx < 0) {
        this.vx *= -1
      }
      if (this.x + hw > width && this.vx > 0) {
        this.vx *= -1
      }
      if (this.y - hh < 0 && this.vy < 0) {
        this.vy *= -1
      }
      if (this.y + hh > height && this.vy > 0) {
        this.vy *= -1
      }
    }
    if (this.screenBound) {
      if (this.x - hw < 0 && this.vx < 0) {
        this.x = hw
        this.vx *= 0
      }
      if (this.x + hw > width && this.vx > 0) {
        this.x = width - hw
        this.vx *= 0
      }
      if (this.y - hh < 0 && this.vy < 0) {
        this.y = hh
        this.vy *= 0
      }
      if (this.y + hh > height && this.vy > 0) {
        this.y = height - hh
        this.vy *= 0
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
