function now() {
  console.log("Calculating now");
  return new Date();
}

function addMs(amount, start) {
  return start.getTime() + amount;
}

console.log(
  addMs(43, new Date(2015, 1, 1))
);
