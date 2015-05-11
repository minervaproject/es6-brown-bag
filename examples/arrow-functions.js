function GreetingGenerator(name) {
  this.name = name;
}

GreetingGenerator.prototype.generate = function() {
  return ["Howdy", "Hello", "Greetings", "Hi"].map(function(greeting) {
    return `${greeting}, ${this.name}`;
  })
}

const generator = new GreetingGenerator("World");
console.log(
  generator.generate()
);
