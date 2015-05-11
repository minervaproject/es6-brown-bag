function repeatString(options) {
  const string = options.string;
  const amount = options.amount;

  return string.repeat(amount);
}

const string = "repeat ";
const amount = 4;
console.log(
  repeatString({string: string, amount: amount})
);
