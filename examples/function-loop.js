var handlers = {};

var countryData = {
  "Canada": "Eh?",
  "United States": "Howdy!",
  "England": "G' day ol' chap",
  "Switzerland": "Nature",
  "China": "Ni Hao!"
};

for (var country in countryData) {
  handlers[country] = function() {
    var countryInfo = countryData[country];
    console.log("You chose country " + country + ", " + countryInfo);
  };
}

handlers['England']();
