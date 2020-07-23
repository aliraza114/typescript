function add(n1: number, n2: number, printResult: boolean, quote: string) {
    const res = n1 + n2
    if (printResult) {
        console.log(quote + res)
    } else {
        return res
    }
}

const num1 = 5
const num2 = 3.9
const printResult = true
const quote = 'Result is : '

add(num1, num2, printResult, quote)
