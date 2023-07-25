export default function getRandomElements(arr, numElements) {
  if (numElements >= arr.length) {
    return arr.slice();
  } else {
    let randomIndexes = [];
    while (randomIndexes.length < numElements) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes.map((index) => arr[index]);
  }
}
