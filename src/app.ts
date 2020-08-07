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
    private getUserInput(): [string, string, number] | void{
        const userTitle = this.titleInputElement.value
        const userDesc = this.descriptionInputElement.value
        const userPeople = this.peopleInputElement.value

        if(userTitle.trim().length === 0 || userDesc.trim().length === 0 || userPeople.trim().length === 0){
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
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput
            console.log(title, desc, people)
            this.clearInputField()
        }
    }

    private clearInputField(){
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
