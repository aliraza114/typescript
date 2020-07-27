function add(n1: number, n2: number) {
    const res = n1 + n2
    return res
}
// add(4, 9)

function printResult(res: number) {
    console.log('Result : ' + res)
}

//printResult(add(5, 7))
function addAndHandle(num: number, numb: number, cd: (res: number) => void) {
    const re = num + numb
    cd(re)
}
// addAndHandle(10, 40, (result) => { console.log('callback ', result) })

function generateError(message: string, errorCode: number) {
    throw {
        message: message,
        errorCode: errorCode
    }
}

generateError('this is not hap at its very best', 500)