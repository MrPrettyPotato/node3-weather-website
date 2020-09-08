const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    if(!location) {
        return console.log('No location')
    }
    fetch('/weather?adress='+location).then((res) =>{
        res.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                
            } else {
                messageOne.textContent = data.location +','+data.country
                messageTwo.textContent = data.info1
                messageThree.textContent = data.info2
                messageFour.textContent = data.weatherDiscription
                console.log(data.country)
            }
        })
    })
    console.log('testing!', location)
})