
(async () => {
    const characters = await API.getCharacters();
    characters.forEach(addCharacterToFrontPage)
   
})();     
    
    const charactersContainer = document.getElementById("charactersList");
    async function addCharacterToFrontPage(character){
    const characterElement = document.createElement("div");
    const fullName = `${character.name.first} ${character.name.middle} ${character.name.last}`;
        

        characterElement.innerHTML = 
        `<h4>Character Name: ${fullName}</h4><br>
        <h4>Home Planet: ${character.homePlanet}</h4><br>
        <h4>Occupation: ${character.occupation}</h4><br>
        <img src="${character.images.main}" id="start-img" alt="Character Image">`

    const characterButton = document.createElement("button");
    characterButton.textContent = "Show Character";
    characterButton.classList.add("open-button")
    
    


    characterButton.addEventListener("click", () => {
        showSingleCharacter(character);
    })

        characterElement.appendChild(characterButton);
        charactersContainer.appendChild(characterElement);
        characterElement.insertAdjacentHTML('beforeend', '<hr>');
        characterElement.insertAdjacentHTML('beforeend', '<br>');
    }


    function showSingleCharacter(character){
        // Stäng tidigare visade characters (visa en i taget)
        const previousCharacter = document.getElementById("single-character");
        if (previousCharacter) {
            previousCharacter.remove();
        }
    
        
        const characterContainer = document.createElement("div");
        characterContainer.id = "single-character";
        const fullName = `${character.name.first} ${character.name.middle} ${character.name.last}`;
        const sayings = character.sayings.slice(0, 10).map(saying => `<li>${saying}</li>`).join("");

        characterContainer.innerHTML = `
            <h4>Character Name: ${fullName}</h4>
            <h4>Age: ${character.age}</h4>
            <h4>Gender: ${character.gender}</h4>
            <h4>Home Planet: ${character.homePlanet}</h4>
            <h4>Occupation: ${character.occupation}</h4>
            <h4>Species: ${character.species}</h4>
            <h4>Images:</h4>
            <img src="${character.images.main}" alt="Character Image" style="width: 100px;">
            <h4>Sayings:<p>
             ${sayings}
             </h4></p>
        `;
    
        // En close knapp för Div:en
        const closeButton = document.createElement("button")
        closeButton.textContent = "Close";
        closeButton.classList.add("close-button");
    
        closeButton.addEventListener("click", () =>{
            characterContainer.remove();
        });
    
        // 
        characterContainer.appendChild(closeButton);
    
        
        document.body.appendChild(characterContainer);
    }







/*Add new characters to the list but to the API and it doesnt work
document.getElementById('characterForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const homePlanet = document.getElementById('homePlanet').value;
   

    const characterData = {
        name,
        homePlanet
    };

    try {
        const response = await fetch('https://da-demo.github.io/api/futurama/characters', {
            method: 'POST',
            body: JSON.stringify(characterData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`'HTTP error! status:' ${response.status}`);
        }

        const add = await response.json();
        console.log('Added character:', add);
        alert('Character added successfully!');
    } catch (error) {
        console.error('Error adding character:', error);
    }
});*/

const characterOptionsBtn = document.getElementById("character-OPT");
const characterOptionsContainer = document.getElementById("character-options-container");

let isFormVisible = false; // Variable to track visibility state of the form

// Add event listener to the button
characterOptionsBtn.addEventListener("click", function() {
    // Toggle the display style of the container
    if (!isFormVisible) { // If the form is not visible
        characterOptionsContainer.style.display = "block"; // Show the form
        characterOptionsBtn.textContent = "X"; // Remove text from the button
        isFormVisible = true; // Update visibility state
    } else { // If the form is visible
        characterOptionsContainer.style.display = "none"; // Hide the form
        characterOptionsBtn.textContent = "Character Options"; // Restore the text
        isFormVisible = false; // Update visibility state
    }
});

