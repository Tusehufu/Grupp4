//Get characters from localStorage
function getCharactersFromStorage() {
  const charactersString = localStorage.getItem("characters");
  console.log("Characters from localStorage:", charactersString);
  return charactersString ? JSON.parse(charactersString) : [];
}

// Function to render characters on the webpage
function renderCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = ''; // Clear previous characters
   
    characters.forEach(character => {
       const characterElement = document.createElement('div');
       characterElement.textContent = `${character.name} - ${character.homePlanet}`;
       container.appendChild(characterElement);
    });
   }
   


// Save characters to localStorage
function saveCharactersToStorage(characters) {
    localStorage.setItem('characters', JSON.stringify(characters));
}

//add a character to localStorage
function addCharacter(name, homePlanet) {
  const characters = getCharactersFromStorage();
  const newCharacter = { id: characters.length + 1, name, homePlanet };
  characters.push(newCharacter);
  saveCharactersToStorage(characters);
  console.log("Character added:", newCharacter);
  renderCharacters(characters); // Render characters on the webpage
}
// Event listener for form submission
document
  .getElementById("addCharacterBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("characterName").value;
    const homePlanet = document.getElementById("homePlanet").value;
    addCharacter(name, homePlanet);
  });

// Update a character in localStorage
function updateCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === name);
    if (index !== -1) {
       characters[index].homePlanet = homePlanet;
       saveCharactersToStorage(characters); // Save updated characters back to localStorage
       renderCharacters(characters);
    }
   }
// Event listener for updating a character
document
  .getElementById("updateCharacterBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("characterName").value;
    const homePlanet = document.getElementById("homePlanet").value;
    updateCharacter(name, homePlanet);
    // Clear the input fields after updating to avoid having to click two times
    document.getElementById("characterName").value = '';
    document.getElementById("homePlanet").value = '';
    renderCharacters(characters);
  });

// Delete a character from localStorage
function removeCharacter(name) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === name);
    if (index !== -1) {
       characters.splice(index, 1);
       saveCharactersToStorage(characters); // Save updated characters back to localStorage
       renderCharacters(characters);
    }
   }

// Event listener for delete button
document
  .getElementById("deleteBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("characterName").value;
    removeCharacter(name);
     // Clear the input fields after deletion
     document.getElementById("characterName").value = '';
     document.getElementById("homePlanet").value = '';
  });
