import { forEach } from 'lodash'

export const IMAGE_WIDTH = 600
export const IMAGE_HEIGHT = 600
const MAX = 127

export function gen() {
  let imageData = []
  for (let x = 0; x < IMAGE_WIDTH; x++) {
    for (let y = 0; y < IMAGE_HEIGHT; y++) {
      const real = (x - IMAGE_WIDTH / 2.0) * 4.0 / IMAGE_WIDTH
      const imag = (y - IMAGE_HEIGHT / 2.0) * 4.0 / IMAGE_WIDTH

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

  if (counter >= max) {
    return -1
  } else {
    return counter // returning the number of iterations allows for coloring
  }
}

function getColor(iterations) {
  let r, g, b

  if (iterations === -1) {
    r = 0
    g = 0
    b = 0
  } else {
    // colour gradient:      Red -> Blue -> Green -> Red -> Black
    // corresponding values:  0  ->  16  ->  32   -> 64  ->  127 (or -1)
    if (iterations < 16) {
      r = 16 * (16 - iterations)
      g = 0
      b = 16 * iterations - 1
    } else if (iterations < 32) {
      r = 0
      g = 16 * (iterations - 16)
      b = 16 * (32 - iterations) - 1
    } else if (iterations < 64) {
      r = 0 //8 * (iterations - 32)
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
