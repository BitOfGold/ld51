var ACX = null
var unsuspended = false
var sfxvolume = 0.8
var sfxreverb = 0.3
var _sfxdest
var _masterGain
var _wetGain
var _dryGain
var _reverb
var _compressor

// zzfxV - global volume
zzfxV=1.

// zzfxR - global sample rate
zzfxR=44100

// zzfxX - the common audio context
var zzfxX 

function _createReverb(length, decay) {
    var srate = ACX.sampleRate, bufferSize, convolver, i, noiseBuffer, outputL, outputR, _i
    bufferSize = length * srate
    noiseBuffer = ACX.createBuffer(2, bufferSize, srate)
    outputL = noiseBuffer.getChannelData(0)
    outputR = noiseBuffer.getChannelData(1)
    for (i = _i = 0; 0 <= bufferSize ? _i < bufferSize : _i > bufferSize; i = 0 <= bufferSize ? ++_i : --_i) {
      outputL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, decay)
      outputR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, decay)
    }
    convolver = ACX.createConvolver()
    convolver.buffer = noiseBuffer
    return convolver
}

function _createCompressor() {
    let t = ACX.currentTime
    let compressor = ACX.createDynamicsCompressor()
    compressor.threshold.setValueAtTime(-24, t)
    compressor.knee.setValueAtTime(30, t)
    compressor.ratio.setValueAtTime(12, t)
    compressor.attack.setValueAtTime(0.003, t)
    compressor.release.setValueAtTime(0.25, t)
    return(compressor)
}

function _startAudio() {
    let AudioContext = window.AudioContext || window.webkitAudioContext
        
    if (AudioContext !== undefined) {
        ACX = new AudioContext()
        zzfxX = ACX
        _masterGain = ACX.createGain()
        _dryGain = ACX.createGain()
        _wetGain = ACX.createGain()
        _reverb = _createReverb(3, 15)
        _compressor = _createCompressor()
        _sfxDest = _compressor

        _sfxDest.connect(_dryGain)
        _sfxDest.connect(_wetGain)
        _wetGain.connect(_reverb)
        _reverb.connect(ACX.destination)
        _dryGain.connect(ACX.destination)
        setReverb(sfxreverb)
        _masterGain.gain.setValueAtTime(sfxvolume, ACX.currentTime)
    }
    window.addEventListener('keydown', _unsuspendSound())
    window.addEventListener('click', _unsuspendSound())
    window.addEventListener('tapend', _unsuspendSound())
}

function setReverb(value) {
    sfxreverb = value
    _wetGain.gain.setValueAtTime(sfxreverb * 1.4, ACX.currentTime)
    _dryGain.gain.setValueAtTime(1.0 - sfxreverb, ACX.currentTime)
}

function _unsuspendSound() {
    if (!unsuspended && ACX) {
        ACX.resume()
        unsuspended = true
        window.removeEventListener('keydown', _unsuspendSound())
        window.removeEventListener('click', _unsuspendSound())
        window.removeEventListener('tapend', _unsuspendSound())    
    }
}

// zzfx() - the universal entry point -- returns a AudioBufferSourceNode
//zzfx=(...t)=>zzfxP(zzfxG(...t))

// zzfxP() - the sound player -- returns a AudioBufferSourceNode
zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination),e.start();return e}

// zzfxB() - returns a AudioBuffer
zzfxB=(...t)=>{
    let f = zzfxX.createBuffer(t.length,t[0].length,zzfxR);
    t.map((d,i)=>f.getChannelData(i).set(d))
    return f
}

// zzfxG() - the sound generator -- returns an array of sample data
zzfxG=(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);return Z}

//! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}

// zzfx(2.19,.05,1195,.01,.05,.14,0,1.16,0,0,687,.03,.06,-0.2,-2,.3,.03,.32,.06,.14     ,0, 0, 2)
// returns asset with buffer
function zzfx(...t) {
    let as = {}
    as._loop = false
    as._offset = 0
    as.isLoaded = false
    as.isSource = true
    let zzfxX = ACX // audio context
    let zzfxV = 1.0
    let p = zzfxB(zzfxG(...t))
    as.buffer = p
    as.isLoaded = true
    return as
}


//! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}

// returns music asset with buffer
function zzfxMCreate(data) {

}

//plays asset
function sound(name, volume=1.0) {
    let as = this.assets[name]
    let n = ACX.createBufferSource()
    n.id = uid()
    n._loop = as._loop
    n._offset = as._offset
    n._length = as._length
    n._rof = as._rof
    n.isSource = true
    n.buffer = as.buffer
    playNode(n, sfxvolume * volume)
    return n
}

// type= sine|square|sawtooth|triangle
function beep(freq0=400, freq1=800, attack=0.01, sustain=0.1, decay=0.2, volume=1.0, type="sine") {
    volume *= sfxvolume
    let _o = ACX.createOscillator()
    let ct = ACX.currentTime
    _o.frequency.value = freq0;
    _o.frequency.linearRampToValueAtTime(freq1, ct+attack+sustain+decay+0.01)
    _o.type = type
    _o.isSource = true
    playNode(_o, 0.)
    _o.upgain.gain.linearRampToValueAtTime(volume, ct+attack+0.01)
    _o.upgain.gain.linearRampToValueAtTime(volume, ct+attack+sustain+0.01)
    _o.upgain.gain.linearRampToValueAtTime(0, ct+attack+sustain+decay+0.01)
    _o.stop(ct+attack+sustain+decay+0.01)
}

function playNode(node, volume=1.0) {
    const upgain = ACX.createGain()
    upgain.gain = volume
    node.connect(upgain)
    upgain.connect(_sfxDest)
    node.upgain = upgain

    node.addEventListener('ended', () => {
        node.upgain.disconnect()
        node.disconnect()
    })
    if (node._length) {
        if (node._loop) {
            node.loop = true
            node.loopStart = node._offset
            node.loopEnd = node._offset + node._length
            node.start()
        } else {
            node.start(ACX.currentTime, node._offset, node._length)
        }
    } else {
        if (node._loop) {
            node.loop = true
        }
        node.start()
    }
    return node
}
