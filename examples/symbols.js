const sym1 = Symbol("name");
const sym2 = Symbol("name");

console.log(sym1 == sym2);
console.log(sym1.toString());

const obj = {
  "name": "name property",
  [sym1]: "name symbol 1 property",
  [sym2]: "name symbol 2 property"
};

console.log(obj["name"]);
console.log(obj[sym1]);
console.log(obj[sym2]);

console.log(Object.keys(obj));
