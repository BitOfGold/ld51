window.keys = {}
window.axes = {}
window.pointerX = -50
window.pointerY = -50
window.focused = true

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
  let kc = 'pointer' + e.which
  keys[kc] = true
  onkey(kc)
})

document.addEventListener('pointerup', (e) => {
  let kc = 'pointer' + e.which
  keys[kc] = false
})

document.addEventListener('pointermove', (e) => {
  //console.log("P move", e)
  let o = display.getBoundingClientRect();

  let x = (e.clientX - o.left) / o.width * width;
  let y = (e.clientY - o.top) / o.height * height;
  pointerX = x | 0;
  pointerY = y | 0;
})

window.addEventListener('blur', (e) => {
  focused = false
  keys = {}
})

window.addEventListener('focus', (e) => {
  focused = true
})

window.clearGamepads = () => {
}

if (!!navigator.getGamepads) {  
  setInterval(() => {
    clearGamepads()
    let gamepads = navigator.getGamepads()
    for (let i = 0; i < gamepads.length; i++) {
      let gp = gamepads[i]
      if (gp && gp.connected) {
        /*
        console.log("    Index: " + gamepads[i].index);
        console.log("    Mapping: " + gamepads[i].mapping);
        console.log("    ID: " + gamepads[i].id);
        console.log("    Axes: " + gamepads[i].axes);
        console.log("    Buttons: " + gamepads[i].buttons);  
        */
      }
    }
  }, 100)
} else {
  clearGamepads()
}