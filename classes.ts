abstract class Department {
   
    employees: string[] = []

    constructor(public id: string, public department: string) {    
    }
    abstract describe(this: Department) : any
    // describe(this: Department) {
    //     console.log('Department is', this.department, 'and ID is ' , this.id)
    // }
    addEmployee(employee: string) {
       this.employees.push(employee)
    }
    printEmployees() {
        console.log(this.employees.length)
        console.log(this.employees)
    }

    static createEmployee(name: string){
        return {
            name: name
        }
    }
}

class IT extends Department {
    constructor(private admin: string[]){
        super('IT202', 'Information Technology')
        this.admin = admin
    }
    describe() {
        console.log('Describe from IT Class')
    }

}
class Accounting extends Department {
    private lastReport: string

    describe() {
        console.log('Describe from Accounting Class')
    }

    get recentReport(){
        if(this.lastReport){
            return this.lastReport
        }
        throw new Error('No reports exists! ')
    }

    set recentReport(value: string){
        if(!value){
            throw new Error('Please pass a valid value')
        }
        this.addReports(value)
    }
    constructor(private reports: string[]){
        super('Acc11', 'Accounting')
        this.lastReport = reports[0]
    }
    addReports(report: string) {
        this.reports.push(report)
    }
}

const accounting = new Accounting(['Here is report '])

accounting.recentReport = 'Test underscore report'
accounting.recentReport 


console.log('Accounting :: ', accounting.describe())
// console.log('Last Report :: ', accounting.recentReport)

const dept2 = new IT(['Khayyam'])
dept2.addEmployee('Aamir Paji')
dept2.addEmployee('Naheem Paji')
dept2.printEmployees()
console.log('Department IT', dept2)

// const dept1 = new Department('dept1','Biology')
// dept1.describe()

// dept1.addEmployee('Jani')
// dept1.addEmployee('Gaga')
// dept1.addEmployee('Gaga')

// dept1.employees[2] = 'palmor'

// dept1.printEmployees()