import "./engine.js"

let rayAlpha = 0
let rayW = 11
let timeNow = 0
let fullPhase = 0
let secondPhase = 0

assets.psfx = zzfx(1,.05,43,.06,.16,.13,1,.51,-2.5,-0.4,-206,0,.11,0,0,0,0,.05,.08,0);
let startTime = time

let stars = []
for (let i = 0; i< 500; i++)  {
  stars.push(
    {r: rnd(0, width * 0.6), alpha: rnd(0, PI * 2), z: rnd(0, 1)}
  )
}

class Player extends Entity {
  speed = 120

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

class Baddie extends Entity {
}

window.player = new Player({
  x: 25,
  y: 25
})

window.drawBackground = () => {
  clear('#222')
  stars.forEach(s => {
    let sx = width / 2 + s.r * cos(s.alpha)
    let sy = height / 2 + s.r * sin(s.alpha)
    s.alpha += (s.z + 0.2) * PI / 360.
    rect(sx, sy, 1, 1, '#aaa', s.z)
  })
}

window.drawForeground = () => {
  let cx = width / 2 | 0
  let cy = height / 2 | 0
  let dx = cos(rayAlpha)
  let dy = sin(rayAlpha)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F22', rayW)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F62', rayW - 3)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EE2', rayW - 6)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EEE', rayW - 9)

  let cs = 5
  rect(pointerX - cs * 2, pointerY, cs, 1, '#0F0')
  rect(pointerX + cs, pointerY, cs, 1, '#0F0')
  rect(pointerX, pointerY - cs * 2, 1, cs, '#0F0')
  rect(pointerX, pointerY + cs, 1, cs, '#0F0')
}

window.update = (dt) => {
  timeNow = time - startTime
  secondPhase = (1.0 - timeNow % 1.)
  fullPhase = (1.0 - (timeNow / 10.) % 1.)
  rayW = 11 + secondPhase * secondPhase * 5
  rayAlpha = fullPhase * PI * 2 
}

window.onkey = (kc) => {
  if (kc == 'p') {
    sound('psfx')   
  }
  if (kc == 'o') {
    beep()   
  }
}
