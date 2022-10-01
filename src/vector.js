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
