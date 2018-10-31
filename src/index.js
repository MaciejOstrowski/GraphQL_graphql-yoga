import myCurrentLocation,  { getGreeting, message, name } from './myModule'
import addToNumbers, { substract } from './math'

//myModule.js
console.log(message)
console.log(name)
console.log(myCurrentLocation)
console.log(getGreeting('Jessica'))

//Math.js
console.log(`Wynik dodawania to: ${addToNumbers(34, 43)}`);
console.log(`Wynik odemowania to: ${substract(34, 43)}`);

