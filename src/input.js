window.keys = {}

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

display.addEventListener('pointerdown', (e) => {
  //console.log("P down", e)
})
display.addEventListener('pointerup', (e) => {
  //console.log("P up", e)
})
display.addEventListener('pointermove', (e) => {
  //console.log("P move", e)
})
