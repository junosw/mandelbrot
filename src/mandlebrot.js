import { forEach } from 'lodash'

const MAX = 100

/**
 * Generate an array of RGBA image data based on the mandelbrot set
 */
export function genImageData(width, height) {
  let imageData = []
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const real = (x - width / 2.0) * 4.0 / width
      const imag = (y - height / 2.0) * 4.0 / height

      forEach(getColor(mandlebrot(imag, real, MAX)), c => {
        imageData.push(c)
      })
    }
  }
  return new Uint8ClampedArray(imageData)
}

/**
 * Returns -1 if a point is in the mandlebrot set, else iterations done to 
 * discover it is not in the set
 */
function mandlebrot(startReal, startImag, max) {
  let counter = 0
  let zReal = 0
  let zImag = 0
  let nextRe

  while (zReal * zReal + zImag * zImag <= 4 && counter <= max) {
    nextRe = zReal * zReal - zImag * zImag + startReal
    zImag = 2 * zReal * zImag + startImag
    zReal = nextRe
    counter++
  }

  return counter >= max ? -1 : counter // returning the number of iterations allows for coloring
}

/**
 * Returns an array of ints representing an RGBA value based on the 
 * iterations param
 * @param {int} iterations 
 */
function getColor(iterations) {
  let r, g, b

  if (iterations === -1) {
    r = 0
    g = 0
    b = 0
  } else {
    // colour gradient:     Blue -> Red  -> Green -> Red -> Black
    // corresponding values:  0  ->  16  ->  32   -> 64  ->  127 (or -1)
    if (iterations < 16) {
      r = 16 * iterations - 1
      g = 0
      b = 16 * (16 - iterations)
    } else if (iterations < 32) {
      r = 0
      g = 16 * (iterations - 16)
      b = 16 * (32 - iterations) - 1
    } else if (iterations < 64) {
      r = 8 * (iterations - 32)
      g = 8 * (64 - iterations) - 1
      b = 0
    } else {
      // range is 64 - 127
      r = 255 - (iterations - 64) * 4
      g = 0
      b = 0
    }
  }
  return [r, g, b, 255]
}
