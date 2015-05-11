const arr = [5, 4, 3, 2, 1];

var iterable = {
  [Symbol.iterator]() {
    let index = -1;
    return {
      next() {
        const nextIndex = index + 1;
        if (arr[nextIndex]) {
          index = nextIndex;
          return { value: arr[nextIndex], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };

  }
}

for (let a of iterable) {
  console.log(a);
}

console.log([...iterable]);
