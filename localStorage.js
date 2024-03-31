//Get characters from localStorage
function getCharactersFromStorage() {
    const charactersString = localStorage.getItem("characters");
    console.log("Characters from localStorage:", charactersString);
    return charactersString ? JSON.parse(charactersString) : [];
}

// Function to render character with update and delete buttons if it exists in localStorage
function renderCharacterWithButtons(character) {
    const characterElement = document.createElement('div');
    characterElement.textContent = `${character.name} - ${character.homePlanet}`;

    const isInLocalStorage = JSON.parse(localStorage.getItem('characters') || '[]').some(localCharacter => localCharacter.name === character.name && localCharacter.homePlanet === character.homePlanet);

    if (isInLocalStorage) {
        const updateCharacterButton = document.createElement("button");
        updateCharacterButton.textContent = "Update Character";
        updateCharacterButton.classList.add("update-button");

        updateCharacterButton.addEventListener("click", () => {
            // Open modal to update character and fill form with current character data
            openUpdateCharacterModal(character);
        });

        const deleteCharacterButton = document.createElement("button");
        deleteCharacterButton.textContent = "Delete Character";
        deleteCharacterButton.classList.add("delete-button");

        deleteCharacterButton.addEventListener("click", () => {
            // Delete character from localStorage and re-render characters
            removeCharacter(character.name);
        });

        characterElement.appendChild(updateCharacterButton);
        characterElement.appendChild(deleteCharacterButton);
    }

    return characterElement;
}

// Function to render characters on the webpage
function renderCharactersWithButtons(characters) {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = ''; // Clear previous characters

    characters.forEach(character => {
        const characterElement = renderCharacterWithButtons(character);
        container.appendChild(characterElement);
    });
}

// Call renderCharactersWithButtons with characters from localStorage to display them on page load
document.addEventListener("DOMContentLoaded", function () {
    const characters = getCharactersFromStorage();
    renderCharactersWithButtons(characters);
});

// Save characters to localStorage
function saveCharactersToStorage(characters) {
    localStorage.setItem('characters', JSON.stringify(characters));
}

// Add a character to localStorage
function addCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage();
    const newCharacter = { id: characters.length + 1, name, homePlanet };
    characters.push(newCharacter);
    saveCharactersToStorage(characters);
    console.log("Character added:", newCharacter);
    renderCharactersWithButtons(characters); // Render characters on the webpage
}

// Update a character in localStorage
function updateCharacter(oldName, oldHomePlanet, newName, newHomePlanet) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === oldName && character.homePlanet === oldHomePlanet);
    if (index !== -1) {
        characters[index].name = newName;
        characters[index].homePlanet = newHomePlanet;
        saveCharactersToStorage(characters); // Save updated characters back to localStorage
        renderCharactersWithButtons(characters);
    } else {
        // Character not found, show error message
        alert('Character not found.');
    }
}

// Delete a character from localStorage
function removeCharacter(name) {
    const characters = getCharactersFromStorage(); // Retrieve characters from localStorage
    const index = characters.findIndex((character) => character.name === name);
    if (index !== -1) {
        characters.splice(index, 1);
        saveCharactersToStorage(characters); // Save updated characters back to localStorage
        renderCharactersWithButtons(characters);
    } else {
        // Character not found, show error message
        alert('Character not found.');
    }
}

// Function to open modal to update character
function openUpdateCharacterModal(character) {
    // Fill form fields with current character data
    document.getElementById("oldCharacterName").value = character.name;
    document.getElementById("updateCharacterName").value = character.name;
    document.getElementById("oldHomeplanet").value = character.homePlanet;
    document.getElementById("updateHomeplanet").value = character.homePlanet;

    // Open update character modal
    const updateCharacterModal = new bootstrap.Modal(document.getElementById('updateCharacterModal'));
    updateCharacterModal.show();
}

// Event listener for adding a character
document.getElementById("addCharacterBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("characterName").value;
    const homePlanet = document.getElementById("homePlanet").value;
    addCharacter(name, homePlanet);
    // Clear the input fields after adding character
    document.getElementById("characterName").value = '';
    document.getElementById("homePlanet").value = '';
});


// Event listener for update button to open update character modal
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("update-button")) {
        const characterName = event.target.parentNode.textContent.split(" - ")[0];
        const characters = getCharactersFromStorage();
        const character = characters.find(char => char.name === characterName);
        openUpdateCharacterModal(character);
    }
});

// Event listener for form submission
document.getElementById("updateCharacterForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const oldName = document.getElementById("oldCharacterName").value;
    const newName = document.getElementById("updateCharacterName").value;
    const oldHomePlanet = document.getElementById("oldHomeplanet").value;
    const newHomePlanet = document.getElementById("updateHomeplanet").value;
    updateCharacter(oldName, oldHomePlanet, newName, newHomePlanet);
    // Clear the input fields after updating to avoid having to click two times
    document.getElementById("characterName").value = '';
    document.getElementById("homePlanet").value = '';
    // Close the modal
    const openupdateCharacterModal = new bootstrap.Modal(document.getElementById('updateCharacterModal'));
    openupdateCharacterModal.hide();
    location.reload();
});
