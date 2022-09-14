it('find first fit row of sticks', () => {
  // numberOfStick is Math.random. To get a testable solution, I use a constant number
  const numberOfSticks = 3
  let arrayOfSticks = [1,3,5,7]
  const firstFitRow = arrayOfSticks.find(row => row >= numberOfSticks)
  const update = {
    'stickLine' : firstFitRow,
    'index': arrayOfSticks.indexOf(firstFitRow),
    'number': numberOfSticks
  }
  arrayOfSticks[update.index] = update.stickLine - update.number
  
  expect(update.stickLine).toBe(3)
  expect(update.index).toBe(1)
  expect(arrayOfSticks[1]).toBe(0)
})

