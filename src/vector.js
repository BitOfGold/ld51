// Vector 2D functions 

window.EP = 1e-6 // Epsilon
window.__normal = [0, 0]
window.__v1 = [0, 0]
window.__v2 = [0, 0]
window.__v3 = [0, 0]
window.__n1 = [0, 0]

window.vadd = (a, b, t) => {
    t[0] = a[0] + b[0]
    t[1] = a[1] + b[1]
}

window.vadds = (a, b, s, t) => {
    t[0] = a[0] + s * b[0]
    t[1] = a[1] + s * b[1]
}

window.vsub = (a, b, t) => {
    vadds(a, b, -1., t)
}

window.vmul = (a, s, t) => {
    t[0] = a[0] * s
    t[1] = a[1] * s
}

window.vdot = (a, b) => a[0] * b[0] + a[1] * b[1]

window.vlen = (a) => vdot(a, a) ** 0.5

window.vnor = (a, t) => {let ilen = vlen(a); ilen = ilen > EP ? 1. / ilen:  0; vmul(a, ilen, t)}

window.vcopy = (a, t) => {
    t[0] = a[0]
    t[1] = a[1]
}

window.vzero = (t) => {
    t[0] = 0.
    t[1] = 0.
}

//point to segment distance
window.pDistance = (x, y, x1, y1, x2, y2) => {
    let A = x - x1;
    let B = y - y1;
    let C = x2 - x1;
    let D = y2 - y1;
  
    let dot = A * C + B * D;
    let len_sq = C * C + D * D;
    let param = -1;
    if (len_sq != 0) //in case of 0 length line
        param = dot / len_sq;
  
    let xx, yy;
  
    if (param < 0) {
      xx = x1;
      yy = y1;
    }
    else if (param > 1) {
      xx = x2;
      yy = y2;
    }
    else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
  
    let dx = x - xx;
    let dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }