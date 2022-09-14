it('find first fit row with boston strategy', () => {
  let rotatedSquereMatrix = [[0,0,0,0],[1,1,0,0],[1,0,1,0],[1,1,1,0]]
  let moveIndex = -1
  const oneColumn = rotatedSquereMatrix[rotatedSquereMatrix.length-1]
  const twoColumn = rotatedSquereMatrix[rotatedSquereMatrix.length-2]
  if(twoColumn.reduce((a, b) => a + b, 0)%2 !== 0){
    if(moveIndex === -1) {
      moveIndex = twoColumn.findIndex(item => item > 0)
    }
    twoColumn[moveIndex] = 0
    rotatedSquereMatrix[rotatedSquereMatrix.length-2] = twoColumn
    if((oneColumn.reduce((a, b) => a + b, 0)%2 !== 0) && oneColumn[moveIndex]===1){
      if(moveIndex === -1) {
        moveIndex = oneColumn.findIndex(item => item > 0)
      }
      oneColumn[moveIndex] = 0
      rotatedSquereMatrix[rotatedSquereMatrix.length-1] = oneColumn     
    }
  }else if(oneColumn.reduce((a, b) => a + b, 0)%2 !== 0){
    if(moveIndex === -1) {
      moveIndex = oneColumn.findIndex(item => item > 0)
    }
    oneColumn[moveIndex] = 0
    rotatedSquereMatrix[rotatedSquereMatrix.length-1] = oneColumn     
  }
  expect(rotatedSquereMatrix[rotatedSquereMatrix.length-2]).toStrictEqual([1,0,1,0])
  expect(rotatedSquereMatrix[rotatedSquereMatrix.length-1]).toStrictEqual([0,1,1,0])
})

it('execute boston move', () => {
  const squereMatrix = [[0,0,0,0],[0,0,1,1],[0,1,0,1],[0,1,1,0]]
  let stickArray = []
  squereMatrix.forEach(item => stickArray.push(parseInt(item.join(""),2)))
  expect(stickArray).toStrictEqual([0,3,5,6])
})
  
it('only one row solution', () => {
  const arrayOfSticks = [0,3,0,0]
  const filteredArray = arrayOfSticks.filter(x => x !== 0)
  if(filteredArray.length === 1 && !filteredArray.some(element => element > 3)) {
    const update = {
      'stickLine' : arrayOfSticks.find(row => row !== 0),
      'index': arrayOfSticks.indexOf(filteredArray[0]),
      'number': arrayOfSticks[arrayOfSticks.indexOf(filteredArray[0])]-(arrayOfSticks[arrayOfSticks.indexOf(filteredArray[0])]-1)
    }
    expect(update.stickLine).toBe(3)
    expect(update.index).toBe(1)
    expect(update.number).toBe(1)
  }
}) 
    