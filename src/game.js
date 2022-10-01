import "./engine.js"

let x = 2
let y = 2
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
    {r: Math.random() * width * 0.6, alpha: Math.random() * PI * 2, z: Math.random()}
  )
}

window.update = (dt) => {
  timeNow = time - startTime
  secondPhase = (1.0 - timeNow % 1.)
  fullPhase = (1.0 - (timeNow / 10.) % 1.)
  rayW = 11 + secondPhase * secondPhase * 5
  rayAlpha = fullPhase * PI * 2
  let spd = 120
  if (keys.a) {x -= spd * dt}
  if (keys.d) {x += spd * dt}
  if (keys.w) {y -= spd * dt}
  if (keys.s) {y += spd * dt}
  clear('#222')
  stars.forEach(s => {
    let sx = width / 2 + s.r * cos(s.alpha)
    let sy = height / 2 + s.r * sin(s.alpha)
    s.alpha += (s.z + 0.2) * PI / 360.
    rect(sx | 0, sy | 0, 1, 1, '#aaa', s.z)
  })

  rect(x | 0, y | 0, 10, 10)

  let cx = width / 2 | 0
  let cy = height / 2 | 0
  let dx = cos(rayAlpha)
  let dy = sin(rayAlpha)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F22', rayW)
  line(cx, cy, cx + dx * width, cy + dy * width, '#F62', rayW - 3)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EE2', rayW - 6)
  line(cx, cy, cx + dx * width, cy + dy * width, '#EEE', rayW - 9)
}

window.onkey = (kc) => {
  if (kc == 'p') {
    sound('psfx')   
  }
  if (kc == 'o') {
    beep()   
  }
}
