window.E = [] // all entities

class Entity {
  x = 0.
  y = 0.
  w = 16.
  h = 16.
  color = '#aaa'
  vx = 0.
  vy = 0.
  speed = 60.

  constructor(params) {
    for (let key in params) {
      let val = params[key]
      this[key] = val
    }
    E.push(this)
  }

  draw() {
    let cx = this.x - this.w / 2 - camera[0] + _shake[0]
    let cy = this.y - this.h / 2 - camera[1] + _shake[1]
    rect(cx, cy, this.w, this.h, this.color)
  }

  update(dt) {

  }

  _update(dt) {
    this.x = this.x + this.vx * dt
    this.y = this.y + this.vy * dt
  }

  dispose() {

  }
}

window.Entity = Entity

window.updateAllEntities = (dt) => {
  E.forEach(e => {
    e._update(dt)
    e.update(dt)
  })
}

window.drawAllEntities = () => {
  E.forEach(e => {
    e.draw()
  })
}

