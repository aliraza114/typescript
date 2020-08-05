const names: Array<string> = ['aka', 'jakalar']

function test<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

test({ name: 'ali', age: 45 }, 'age')

class DataStorage<U extends string | number | boolean> {
    private data: U[] = []

    addItem(item: U){
        this.data.push(item)
    }

    removeItem(item: U){
        if(this.data.indexOf(item) === -1){
            return 
        }
        this.data.splice(this.data.indexOf(item),2)
    }

    getItems(){
        return [...this.data]
    }
}

// const textStorage = new DataStorage<string>()
// textStorage.addItem('Jani')
// textStorage.addItem('Gaga')
// textStorage.addItem('Jakalar')
// textStorage.addItem('Kurtlar')
// textStorage.addItem('Aslan')
// console.log(textStorage.getItems())
// textStorage.removeItem('Jani')
// console.log(textStorage.getItems())

// const objectStorage = new DataStorage<object>()
// objectStorage.addItem({name: 'kaleem'})
// objectStorage.addItem({name: 'arslan'})
// objectStorage.removeItem({name: 'kaleem'})
// console.log(objectStorage.getItems())

// function merge<T, U>(objA: T, objB: U){
//     return Object.assign(objA, objB);
// }

// let testy = merge({name: 'Some data', hobbies: ['playing']} , {name: '43'})
// testy.name
// console.log(testy)

interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date ):CourseGoal {
    let couseGoal: Partial<CourseGoal> = {}
    couseGoal.title = title
    couseGoal.description = description
    couseGoal.completeUntil = date
    return couseGoal as CourseGoal

}