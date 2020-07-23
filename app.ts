// const person: {
//     name: string
//     age: number
//     hobbies: string[]
//     role: [string, number]
// } = {
//     name: 'janigaga',
//     age: 25,
//     hobbies: [
//         'playing',
//         'sleeping',
//         'eating'
//     ],
//     role: ['admin', 45]
// }

const AMDIN = 0;
const USER = 1;
const HR = 2;

enum Role { ADMIN = 'ADMIN', HR = 3, USER = "USER" }

const person = {
    name: 'janigaga',
    age: 25,
    hobbies: [
        'playing',
        'sleeping',
        'eating'
    ],
    role: Role.HR 
}

let favAct: string[]
favAct = ['traveling']

for (const hop of person.hobbies) {
    console.log(hop.toUpperCase())
}
if(person.role !== "ADMIN"){
    console.log('admin here')
} else {
    console.log('Not Admin')
}
console.log(person)