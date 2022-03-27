export const isPrime = (n) => {
    let isPrime = true;
    if (number === 1) {
        return false;
    }
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
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