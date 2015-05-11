var timers = [100, 200, 300, 400, 500];

for (var i in timers) {
  setTimeout(function() {
    console.log("Timer for timer number " + i + ": " + timers[i]);
  }, timers[i]);
}
