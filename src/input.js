window.keys = {}
window.pointerX = -50
window.pointerY = -50

window.onkey = (key) => {}

document.onkeydown = (e) => {
  let kc = e.key.toLowerCase()
  keys[kc] = true
  onkey(kc)
}

document.onkeyup = (e) => {
  let kc = e.key.toLowerCase()
  keys[kc] = false
}

document.oncontextmenu = (e) => {
  return false;
};

document.addEventListener('pointerdown', (e) => {
  //console.log("P down", e)
})

document.addEventListener('pointerup', (e) => {
  //console.log("P up", e)
})

document.addEventListener('pointermove', (e) => {
  //console.log("P move", e)
  let o = display.getBoundingClientRect();

  let x = (e.clientX - o.left) / o.width * width;
  let y = (e.clientY - o.top) / o.height * height;
  pointerX = x | 0;
  pointerY = y | 0;
})
