import "./engine.js"

let rayAlpha = 0
let rayW = 11
let timeNow = 0
let fullPhase = 0
let secondPhase = 0

assets.psfx = zzfx(1,.05,43,.06,.16,.13,1,.51,-2.5,-0.4,-206,0,.11,0,0,0,0,.05,.08,0);
assets.sprites = loadTileset('assets/sprites.png', 32, 32)
assets.font = loadCharset('assets/font.png', 8, 16)

let startTime = time

let stars = []
for (let i = 0; i< 500; i++)  {
  stars.push(
    {r: rnd(0, width * 0.6), alpha: rnd(0, PI * 2), z: rnd(0, 1)}
  )
}

class Sprite extends Entity {
  minFrame = 0
  maxFrame = 0
  frameDelay = 500
  draw() {
    let cx = this.x - this.extend[0] + _shake[0]
    let cy = this.y - this.extend[1] + _shake[1]
    //rect(cx, cy, this.w, this.h, '#0a0', 0.5)
    let frame = this.minFrame
    if (this.maxFrame > this.minFrame) {
      frame = (timeNow / (this.frameDelay / 1000.0) | 0) % (this.maxFrame - this.minFrame + 1) + this.minFrame
    }
    drawTile("sprites", frame, cx, cy)
  }
}

class Player extends Sprite {
  minFrame = 0
  maxFrame = 3
  speed = 120
  screenBound = true
  order = 1000
  extend = [16, 16]

  update(dt) {
    this.vx = 0
    this.vy = 0
    if (keys.a) {this.vx = -this.speed}
    if (keys.d) {this.vx = this.speed}
    if (keys.w) {this.vy = -this.speed}
    if (keys.s) {this.vy = this.speed}
    
    let v = sqrt(this.vx * this.vx + this.vy * this.vy)
  }

}

const BSPEED = 30
class Baddie extends Sprite {
  minFrame = 8
  maxFrame = 11
  extend = [16, 16]
  position = [rnd(0, width), rnd(0, height)]
  velocity = [rnd() > 0.5 ? BSPEED : -BSPEED, rnd() > 0.5 ? BSPEED : -BSPEED]
  screenBounce = true
  color = '#2A2'
  order = 500
}

const BUSPEED = 300
class Bullet extends Entity {
  scale = [0.25, 0.25]
  color1 = '#FFF'
  color2 = '#66F'

  draw() {
    let cx = this.x + _shake[0]
    let cy = this.y + _shake[1]
    let dx = this.vx * 0.03
    let dy = this.vy * 0.03
    //rect(cx - this.extend[0], cy - this.extend[1], this.w, this.h, '#0a0', 0.5)
    line(cx - dx * 1.5, cy - dy * 1.5, cx + dx, cy + dy, this.color2, 6, 0.8)
    line(cx - dx , cy - dy, cx + dx, cy + dy, this.color1, 3, 1)
  }
}


function startLevel() {
  clearStage()
  window.player = new Player({
    x: 25,
    y: 25
  })
  for (let i = 0; i < 10; i++) {
    let b = new Baddie()
  }
}

startLevel()

window.drawBackground = () => {
  clear('#224')
  stars.forEach(s => {
    let sx = width / 2 + s.r * cos(s.alpha) + _shake[0]
    let sy = height / 2 + s.r * sin(s.alpha) + _shake[1]
    s.alpha += (s.z + 0.2) * PI / 360.
    rect(sx, sy, 1, 1, '#aaa', s.z)
  })
}

window.drawForeground = () => {
  let cx = width / 2 + _shake[0]
  let cy = height / 2 + _shake[1]
  let dx = cos(rayAlpha)
  let dy = sin(rayAlpha)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F22', rayW)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F62', rayW - 3)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EE2', rayW - 6)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EEE', rayW - 8)

  let cs = 5
  rect(pointerX - cs * 2, pointerY, cs, 1, '#0F0')
  rect(pointerX + cs, pointerY, cs, 1, '#0F0')
  rect(pointerX, pointerY - cs * 2, 1, cs, '#0F0')
  rect(pointerX, pointerY + cs, 1, cs, '#0F0')

  drawText("font", "0123", width - 128, 8)
}

window.update = (dt) => {
  timeNow = time - startTime
  secondPhase = (1.0 - timeNow % 1.)
  fullPhase = (1.0 - (timeNow / 10.) % 1.)
  rayW = 9 + secondPhase * secondPhase * 7
  rayAlpha = fullPhase * PI * 2 
}

window.onkey = (kc) => {
  if (kc == 'p') {
    sound('psfx')   
  } else if (kc == 'o') {
    beep()   
  } else if (kc == ' ') {
    _shakea = 12
  } else if (kc == 'pointer1') {
    vsub([pointerX, pointerY], [player.x, player.y + 8], __v1)
    vnor(__v1, __v1)
    vmul(__v1, BUSPEED, __v1)
    let b = new Bullet({
      x: player.x,
      y: player.y + 8,
      vx: __v1[0],
      vy: __v1[1],
    })
  }



}
