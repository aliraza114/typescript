interface Named {
    readonly name: string
}
interface Greetable extends Named {
   
    greet (message: string): void
}

class Person implements Greetable {
    name: string

    constructor(n: string){
        this.name = n
    }
    greet(phrase: string) {
        console.log(phrase + " " + this.name )
    }
}

let p1: Greetable
p1 = new Person('Jani Gaga')
p1.greet('Hi, there i am')
// {
//     name: 'jani ',
//     age: 25,
//     greet(message: string){
//         console.log(message , 'from ', this.name)
//     }
// }

console.log(p1)