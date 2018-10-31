const message = 'Some message from myModule.js'
const name = 'Andrew'
const location = 'Philadelphia'

const getGreeting = (name) => {
    return `Welcome in this course ${name}`
}

export { message, name, getGreeting, location as default }