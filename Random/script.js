//array
const names = ["Buddy", "Luna", "Max", "Bella", "Charlie", "Daisy", "Rocky", "Milo", "Coco", "Ziggy"];
const traits = [
    "Loves belly rubs",
    "Afraid of the vacuum",
    "Steals socks",
    "Best friends with everyone",
    "Chases squirrels nonstop",
    "Sleeps 20 hours a day",
    "Knows how to shake hands",
    "Howls at sirens"
];
const colors = ["#fde68a", "#bfdbfe", "#fbcfe8", "#bbf7d0", "#ddd6fe", "#fed7aa"];
 
const generateBtn = document.querySelector("#generate-btn");
const clearBtn = document.querySelector("#clear-btn");
const dogList = document.querySelector("#dog-list");
const message = document.querySelector("#message");
const adoptedCount = document.querySelector("#adopted-count");
 
let adopted = 0;
 
//random
function randomItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
 
async function getRandomDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
}
 
function addDogCard(dog) {
    const card = document.createElement("article");
    card.className = "dog-card";
    card.style.backgroundColor = dog.color;
    
    const img = document.createElement("img");
    img.src = dog.image;
    img.alt = "A dog named " + dog.name;
    
    const nameHeading = document.createElement("h2");
    nameHeading.textContent = dog.name;
    
    const ageText = document.createElement("p");
    ageText.textContent = "Age: " + dog.age + " years old";
    
    const traitText = document.createElement("p");
    traitText.textContent = dog.trait;
    
    const adoptBtn = document.createElement("button");
    adoptBtn.textContent = "Adopt Me";
    
    adoptBtn.onclick = function () {
        card.classList.add("adopted");
        adoptBtn.textContent = "Adopted!";
        adoptBtn.disabled = true;
        adopted++;
        adoptedCount.textContent = "Dogs adopted: " + adopted;
  };
 
    card.appendChild(img);
    card.appendChild(nameHeading);
    card.appendChild(ageText);
    card.appendChild(traitText);
    card.appendChild(adoptBtn);
    dogList.prepend(card); 
}
 
//main
async function generateDog() {
    generateBtn.disabled = true;
    
    try {
        const imageUrl = await getRandomDogImage();
        const dog = {
        name: randomItem(names),
        age: Math.floor(Math.random() * 15) + 1,
        trait: randomItem(traits),
        color: randomItem(colors),
        image: imageUrl
        };
    
        addDogCard(dog);
        message.textContent = "Meet " + dog.name + "!";
    } catch (error) {
        message.textContent = "Could not load a dog. Check your internet and try again.";
    }
    
    generateBtn.disabled = false;
}
 
function clearDogs() {
    dogList.innerHTML = "";
    adopted = 0;
    adoptedCount.textContent = "Dogs adopted: 0";
    message.textContent = "";
}
 
generateBtn.addEventListener("click", generateDog);
clearBtn.addEventListener("click", clearDogs);