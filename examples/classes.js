function Greeter(greeting) {
  this.greeting = greeting;
}

Greeter.prototype.greet = function() {
  return `${this.greeting}!`;
}

console.log( new Greeter("Hello").greet() );


function PersonGreeter(name) {
  this.name = name;
  // ???
}

// ???
