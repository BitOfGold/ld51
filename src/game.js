x = 2
y = 2
rayAlpha = 0
rayW = 11
timeNow = 0
fullPhase = 0
secondPhase = 0

assets.psfx = zzfx(1,.05,43,.06,.16,.13,1,.51,-2.5,-0.4,-206,0,.11,0,0,0,0,.05,.08,0);
startTime = time

function update(dt) {
  timeNow = time - startTime
  secondPhase = (1.0 - timeNow % 1.)
  fullPhase = (1.0 - (timeNow / 10.) % 1.)
  rayW = 11 + secondPhase * secondPhase * 5
  rayAlpha = fullPhase * PI * 2
  let spd = 100
  if (keys.a) {x -= spd * dt}
  if (keys.d) {x += spd * dt}
  if (keys.w) {y -= spd * dt}
  if (keys.s) {y += spd * dt}
  clear('#222')
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

function onkey(kc) {
  if (kc == 'p') {
    sound('psfx')   
    console.log('p')
  }
  if (kc == 'o') {
    beep()   
  }
}
