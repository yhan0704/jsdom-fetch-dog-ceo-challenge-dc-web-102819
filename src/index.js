// console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
document.addEventListener("DOMContentLoaded",function(){
    let dropDown = document.getElementById("breed-dropdown")
    fetchPictures();
    fetchBreed();
    
    dropDown.addEventListener("change", filterBreed)
    
})

// function filterDogNames(event){
  
    
//    console.log("afewf")
//    //get all Brred
//     const getSelectDown = document.querySelector("#breed-dropdown").value
//    const allDogBreed = document.querySelector("#dog-breeds").querySelectorAll("li")
// //    document.querySelector("#dog-breeds").remove()
//    let array = []
//    for(let i = 0; i < allDogBreed.length; i++){
//         array.push(allDogBreed[i].innerText)
//    }
//    const result = array.filter(x => x.charAt(0) === getSelectDown)
//    return result
// }

function filterBreed(event){
    let ulEl = document.getElementsByClassName("#dog-breeds")
    let dd = document.getElementById("breed-dropdown")
    var TextElements = document.getElementsByTagName("li");
    let input = dd.value
    console.log(input)
   
    // pull the full list of dog breeds
    let fullList = document.getElementsByTagName("li")
    let fullName = [ ]
    for( var i = 0 ; i < fullList.length ; i ++){ 
        let name = fullList[i] = fullList[i].innerText 
        fullName.push(name) }
    
    let filtered = fullName.filter(breed => breed.indexOf(input) === 0)
    console.log(filtered)
    

    for (var i = 0; i < TextElements.length; i++) {
        TextElements[i].style.display = "none";
    }
    filtered.forEach((breed) => {
        listBreed(breed)
    })
}


function renderDog(imgUrl){
    let container = document.getElementById("dog-image-container")
    let divide = document.createElement('div')
    container.appendChild(divide)
    let dogImage = document.createElement("img")
    dogImage.src = imgUrl
    dogImage.style.width = '100px'
    divide.appendChild(dogImage)
}

function listBreed(breed){
    let ulEl = document.getElementById("dog-breeds")
    let liEl = document.createElement("li")
    liEl.innerText = breed
    ulEl.appendChild(liEl)
    liEl.addEventListener("click", changeColor)
}

function changeColor(event){
    event.preventDefault()
    // use target of elements that dont have ids
    let liEl = event.currentTarget
    // let liId = document.getElementById("#dog-breeds")
    // debugger
    let change = "#" + Math.floor(Math.random()*16777215).toString(16);
    if (liEl.style.color !== "black"){
        liEl.style.color = "black"
    }
    else{
        liEl.style.color = change
    }
}

function fetchPictures(){
    fetch(imgUrl)
    .then(respose => respose.json())
    .then(dogImages => {
        dogImages.message.forEach((imgUrl) => {
            renderDog(imgUrl)
            
        })
    })
    
}

function fetchBreed(){

    fetch(breedUrl)
    .then(respose => respose.json())
    .then (dogBreed => {
        
        Object.keys(dogBreed.message).forEach((breed) => {
            listBreed(breed)
        })
    })
}



// function fetchImage(){
//     fetch(imgUrl)
//     .then(response => response.json())
//     .then(dogImage => {
//         dogImage.forEach((dog) => {
//         renderDog(dog)
//         })
//     })
// }

