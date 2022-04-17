export const isPrime = (n) => {
    let isPrime = true;
    if (n === 1) {
        return false;
    }
    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}

Number.prototype.toFixedNoRound = function (count){
    const stringified = String(this);
    const dotIndex = stringified.indexOf('.');
    return Number(stringified.substring(0, dotIndex + count + 1))
  }
  

function __gcd(a, b)
{
    // Everything divides 0
    if (a == 0 || b == 0)
        return 0;
     
    // Base case
    if (a == b)
        return a;
     
    // a is greater
    if (a > b)
        return __gcd(a - b, b);
             
    return __gcd(a, b - a);
}
 
// Function to check if
// two numbers are co-prime or not
export function coprime(a, b){
    return __gcd(a, b) == 1
}

export const fix = (number, round) => {
    return round ? Number(number.toFixed(4)) : number.toFixedNoRound(4)
}

export const API_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const calcularIntervalos = (cant, min = 0, max = 1) => {
    const ancho = Number(((max - min) / cant).toFixed(4));
    const intervals = []
    for (let i = 0; i < cant; i++) {
      let from = intervals[i - 1]?.to || min;
      intervals.push({
        from,
        to: Number((from + ancho).toFixed(4)),
        number: i + 1,
        items: 0
      })
    }
    return intervals;
  }

  export const random = () => fix(Math.random())