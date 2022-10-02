window.width = 360
window.height = 270
window.scale = 3
window.ctx = window.display.getContext('2d')

display.style.cssText = 'image-rendering: pixelated; image-rendering: crisp-edges;'
display.width = width
display.height = height
display.style.width = width * scale + 'px'
display.style.height = height * scale + 'px'
ctx.imageSmoothingEnabled = false
ctx.font = '10px sans-serif'
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx.lineWidth = 2

window.hex2rgb = (hex) =>{
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

window.rect = (x, y, w, h, style = '#FFF', alpha = 1.0) => {
  ctx.globalAlpha = alpha
  ctx.fillStyle = style
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0)
}

window.clear = (style = '#000') => {
  ctx.globalAlpha = 1.
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, style)
}

window.line = (x1, y1, x2, y2, style = '#FFF', lineWidth = 2, alpha = 1.) => {
  ctx.globalAlpha = alpha
  ctx.strokeStyle = style
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1 | 0, y1 | 0)
  ctx.lineTo(x2 | 0, y2 | 0)
  ctx.stroke()
}

window.circle = (x, y, r, style = '#FFF', alpha = 1.0) => {
  ctx.globalAlpha = alpha
  ctx.fillStyle = style
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * PI)
  ctx.fill()
}

window.text = (x, y, text, style = '#FFF', alpha = 1.0) => {
  ctx.globalAlpha = alpha
  ctx.fillStyle = style
  ctx.fillText(text, x, y)
}

window.loadImage = (url, options = {}, onload = null) => {
  let as = {
      image: new Image(),
      tileWidth: 1,
      tileHeight: 1,
      perrow: 1,
      options: options,
      isLoaded: false,
  }

  as.image.onload = () => {
      let im = as.image
      im.imageSmoothingEnabled = false
      as.width = im.naturalWidth
      as.height = im.naturalHeight
      as.tileWidth = im.naturalWidth
      as.tileHeight = im.naturalHeight
      as.isLoaded = true
      if (onload) {
          onload(as)
      }
  }
  as.image.src = url
  return as
}

window.loadTileset = (url, tileWidth=16, tileHeight = 0, options={}, onload = null) => {
  if (!(tileHeight > 0)) {
      tileHeight = tileWidth
  }
  let tas = loadImage(url, options, (as) => {
      as.tileWidth = tileWidth
      as.tileHeight = tileHeight
      as.perrow = Math.floor(as.width / as.tileWidth)
      if (onload) {
          onload(as)
      }
  })
  return tas
}

// if chars is not set, it assumes that the
// character set start with tile space, at tile index 0 (ascii encoding)
window.loadCharset = (url, charWidth, charHeight = 0, chars = null, options = {}) => {
  if (!(charHeight > 0)) {
      charHeight = charWidth
  }
  if (!chars) {
      chars = '0123456789'
  }
  let fas = loadTileset(url, charWidth, charHeight, options, (as) => {
      let cpos = {}
      for (let i = 0; i < chars.length; i++) {
          let tc = chars.charAt(i)
          cpos[tc] = i
      }
      as.cpos = cpos
  })
  return fas
}

window.drawTile = (name, index = 0, x = 0, y = 0, alpha = 1.0, scaleX = 1.0, scaleY = 1.0, tint = -1.0, tintColor = '#FFF') => {
  let tiles = assets[name]
  if (!tiles) {
      return
  }
  if (!tiles.isLoaded) {
      return
  }
  if (!tiles.perrow) {
      return
  }  
  x = x | 0
  y = y | 0
  if (x > width || y > height) {
      return
  }

  let tw = Math.abs(tiles.tileWidth)
  let th = Math.abs(tiles.tileHeight)
  tw = tw | 0
  th = th | 0
  if (x < -tw || y < -th) {
      return
  }
  let tinted_tile
  if (tint > 0.01) {
      if (!tiles._tintedCache) {
          tiles._tintedCache = {}
      }
      if (tiles._tintedCache[tintColor]) {
          tinted_tile = tiles._tintedCache[tintColor]
      } else {
          tinted_tile = document.createElement('canvas')
          tinted_tile.width = tiles.width
          tinted_tile.height = tiles.height
          let tctx = tinted_tile.getContext('2d')
          tctx.imageSmoothingEnabled = false
          tctx.clearRect(0, 0, tiles.width, tiles.height)
          tctx.drawImage(tiles.image, 0, 0)
          let opixels = tctx.getImageData(0, 0, tiles.width, tiles.height).data
          let ipixels = tctx.createImageData(tiles.width, tiles.height)
          let pixels = ipixels.data
          let c = hex2rgb(tintColor)
          for (let j = 0, n = pixels.length; j < n; j += 4) {
              pixels[j] = c.r
              pixels[j + 1] = c.g
              pixels[j + 2] = c.b
              pixels[j + 3] = opixels[j + 3]
          }
          tctx.putImageData(ipixels, 0, 0)
          tiles._tintedCache[tintColor] = tinted_tile
      }
  }

  let sx = Math.floor(index % tiles.perrow)
  let sy = Math.floor((index - sx) / tiles.perrow)
  sx *= tiles.tileWidth
  sy *= tiles.tileHeight
  let scaling = scaleX < 0 || scaleY < 0
  if (scaling) {
      ctx.save()
  }
  let dx = x
  let dy = y
  let dw = Math.abs(tw * scaleX)
  let dh = Math.abs(th * scaleY)
  if (scaling) {
      ctx.translate(x + (scaleX > 0 ? 0 : tw), y + (scaleY > 0 ? 0 : th))
      ctx.scale(scaleX > 0 ? 1 : -1, scaleY > 0 ? 1 : -1)
      dw = tw
      dh = th
      dx = 0
      dy = 0
  }
  if (tint < 0.99) {
      ctx.globalAlpha = alpha
      ctx.drawImage(tiles.image, sx, sy, tiles.tileWidth, tiles.tileHeight, dx, dy, dw, dh)
  }
  if (tint > 0.01) {
      let tinta = 1.0 * alpha * tint
      if (tinta > 0.99) {
          tinta = 1.0
      }
      ctx.globalAlpha = tinta
      ctx.drawImage(tinted_tile, sx, sy, tiles.tileWidth, tiles.tileHeight, dx, dy, dw, dh)
  }
  if (scaling) {
      ctx.restore()
  }
  ctx.globalAlpha = 1.0
}

window.drawText = (name, text = '', x = 0, y = 0, alpha = 1.0, scale = 1.0, tint = -1, tintColor = '#FFF') => {
  let font = assets[name]
  if (!font) {
      return
  }
  if (!font.cpos) {
      return
  }
  let utext = text.toUpperCase()
  let xx = x
  let yy = y
  for (let i = 0; i < text.length; i++) {
      let tc = text.charAt(i)
      let ind = font.cpos[tc]
      if (ind >= 0) {
          // ok, found
      } else {
          tc = utext.charAt(i)
          ind = font.cpos[tc]
      }
      if (ind >= 0) {
          drawTile(name, ind, xx, yy, alpha, scale, scale, tint, tintColor)
      }
      let charWidth = scale * font.tileWidth
      if (font.options.defaultCharWidth) {
          charWidth = scale * font.options.defaultCharWidth
      }
      if (font.options.charWidth && font.options.charWidth[tc]) {
          charWidth = scale * font.options.charWidth[tc]
      }
      xx += charWidth
  }
}


