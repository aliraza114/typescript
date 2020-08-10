// State Management

class ProjectState {
    private projects: any[] = []
    private static instance: ProjectState

    private constructor(){

    }

    static getInstance(){
        if(this.instance){
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addProject(title: string, description: string, numofPeople: number){
        const newProj = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numofPeople
        }
        this.projects.push(newProj)
    }   
}

// const projectState = new ProjectState()


// Validator

interface Validatable {
    value: string | number
    required?: boolean
    minLenght?: number
    maxLenght?: number
    min?: number
    max?: number
}

function validate(validateInput: Validatable) {
    let isValid = true
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0
    }
    if (validateInput.minLenght != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length >= validateInput.minLenght
    }
    if (validateInput.maxLenght != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length <= validateInput.maxLenght
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value >= validateInput.min
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value <= validateInput.max
    }
    return isValid
}

// autobind decorater
function autobind(_target: any, _methodName: string, descripter: PropertyDescriptor) {
    const orignalMethod = descripter.value
    const adjustDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const bindFn = orignalMethod.bind(this)
            return bindFn
        }
    }
    return adjustDescriptor
}

// list class 
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor (private type: 'active' | 'finised') {
        this.templateElement = document.getElementById(
            'project-list'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`
        this.attach()
        this.renderContent()
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }

}

// input class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement

        this.configure()
        this.attach();
    }
    // get user input method
    private getUserInput(): [string, string, number] | void {
        const userTitle = this.titleInputElement.value
        const userDesc = this.descriptionInputElement.value
        const userPeople = this.peopleInputElement.value

        const titleValidatable: Validatable = {
            value: userTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: userDesc,
            required: true,
            minLenght: 5
        }
        const peopleValidatable: Validatable = {
            value: +userPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert('Please enter valid values')
            return
        } else {
            return [userTitle, userDesc, +userPeople]
        }
    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.getUserInput()
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            console.log(title, desc, people)
            this.clearInputField()
        }
    }

    private clearInputField() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const formInput = new ProjectInput();
const activeProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finised')
