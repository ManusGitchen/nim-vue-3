/**
 * Testet den Spüielaufbau mit definierter Erwartung
 */
it('set array of sticks', () => {
  let maxSticks = 13
  let count = 1
  let arrayOfSticks = []
  while(maxSticks > 0){
    arrayOfSticks.push(count);
    maxSticks = maxSticks - count;
    count = count + 2;
  }
  expect(arrayOfSticks).toStrictEqual([1,3,5,7]);
});

/**
 * Testet die Berechnung der binären Matrix mit definierter Erwartung
 */
it('set binary matrix', () => {
  const binaryMatrix = []
  const arrayOfSticks = [1,3,5,7]
  arrayOfSticks.forEach(stick => {
    binaryMatrix.push((stick >>> 0).toString(2))
  })
  expect(binaryMatrix).toStrictEqual(["1","11","101","111"])
})

/**
 * Testet die Berechnung der quadratischen Matrix mit definierter Erwartung
 */
it('set squere matrix', () => {
  let array = []
  let cache = []
  const binaryMatrix = ["1","11","101","111"]
  binaryMatrix.forEach(item => array.push(item.split("")))
  
  array.forEach(item => {
    item = item.map(str => {
      return Number(str);
    })
    while(item.length<array.length){
      item = [0].concat(item)
    }
    cache.push(item)
  })
  expect(array).toStrictEqual([["1"],["1","1"],["1","0","1"],["1","1","1"]])
  expect(cache).toStrictEqual([[0,0,0,1],[0,0,1,1],[0,1,0,1],[0,1,1,1]])
})

/**
 * Testet die Matrixrotation um 90 Grad mit definierter Erwartung
 */
it('rotate matrix with 90 degree', () => {
  let squereMatrix = [[0,0,0,1],[0,0,1,1],[0,1,0,1],[0,1,1,1]]
  let degree = 0
  while(degree !== 90) {
    squereMatrix = squereMatrix.map((row, i) =>
    row.map((val, j) => squereMatrix[squereMatrix.length - 1 - j][i])
    )
    degree += 90
  }
  expect(squereMatrix).toStrictEqual([[0,0,0,0],[1,1,0,0],[1,0,1,0],[1,1,1,1]])
})

/**
 * Testet die Matrixrotation um 270 Grad mit definierter Erwartung
 */
it('rotate matrix with 270 degree', () => {
  let squereMatrix = [[0,0,0,1],[0,0,1,1],[0,1,0,1],[0,1,1,1]]
  let degree = 0
  while(degree !== 270) {
    squereMatrix = squereMatrix.map((row, i) =>
    row.map((val, j) => squereMatrix[squereMatrix.length - 1 - j][i])
    )
    degree += 90
  }
  expect(squereMatrix).toStrictEqual([[1,1,1,1],[0,1,0,1],[0,0,1,1],[0,0,0,0]])
})