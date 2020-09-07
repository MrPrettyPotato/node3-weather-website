console.log('Client side javascript file is loaded')


// fetch('http://localhost:3000/weather?adress=Duffel').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.country)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    if(!location) {
        return console.log('No location')
    }
    fetch('http://localhost:3000/weather?adress='+location).then((res) =>{
        res.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                
            } else {
                messageOne.textContent = data.location +','+data.country
                messageTwo.textContent = data.info
                console.log(data.country)
            }
        })
    })
    console.log('testing!', location)
})