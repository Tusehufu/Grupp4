// Function to render characters from localStorage
function renderCharacters() {
    const characters = getCharactersFromStorage();
    characters.forEach(character => {
        addCharacterToList(character);
    });
}

// Function to fetch characters from localStorage
function getCharactersFromStorage() {
    const charactersString = localStorage.getItem('characters');
    console.log('Characters from localStorage:', charactersString);
    return charactersString ? JSON.parse(charactersString) : [];   
}

// Function to save characters to localStorage
function saveCharactersToStorage(characters){
    localStorage.setItem('characters', JSON.stringify(characters));
}

function addCharacterToList(character) {
    const charactersList = document.getElementById('charactersList');

    // Create a new list item element
    const listItem = document.createElement('ul');

    // Create a new div element to hold character information
    const characterInfoDiv = document.createElement('div');

    // Create text nodes for character name and home planet
    const nameTextNode = document.createTextNode(`Character Name: ${character.name}`);
    const planetTextNode = document.createTextNode(`Home Planet: ${character.homePlanet}`);

    // Append text nodes to the character info div
    characterInfoDiv.appendChild(nameTextNode);
    characterInfoDiv.appendChild(document.createElement('br')); // Add a line break
    characterInfoDiv.appendChild(planetTextNode);

    // Append the character info div to the list item
    listItem.appendChild(characterInfoDiv);

    // Append a horizontal line to the list item
    listItem.appendChild(document.createElement('hr'));

    // Append the list item to the characters list
    charactersList.appendChild(listItem);
}


function addCharacter(name, homePlanet) {
    const characters = getCharactersFromStorage();
    const newCharacter = { id: characters.length + 1, name, homePlanet };
    characters.push(newCharacter);
    saveCharactersToStorage(characters);
    console.log('Character added:', newCharacter);

    // Find the element with the id "added-text"
    const addedTextElement = document.getElementById('added-text');

    // Check if the element exists before updating textContent
    if (addedTextElement) {
        // Change the text content of the h3 element inside added-text
        addedTextElement.querySelector('h3').textContent = 'A New Character has been added to the list!';
    }

    // Add the new character to the characters list
    addCharacterToList(newCharacter);

    // Reload the page after a delay
    setTimeout(() => {
        location.reload();
    }, 2000); // Reload after 2 seconds (2000 milliseconds)
}

// Function to handle form submission
document.getElementById('character-options').addEventListener('submit', function(event) {
    console.log('Form submitted');
    event.preventDefault(); // Prevent form submission
    const nameInput = document.getElementById('characterName');
    const homePlanetInput = document.getElementById('homePlanet');
    const name = nameInput.value;
    const homePlanet = homePlanetInput.value;
    addCharacter(name, homePlanet);
    nameInput.value = ''; // Clear input fields after submission
    homePlanetInput.value = '';
});

// Function to delete a character by name
function deleteCharacterByName(name) {
    const characters = getCharactersFromStorage();
    const updatedCharacters = characters.filter(character => character.name !== name);
    saveCharactersToStorage(updatedCharacters);
    console.log('Character with name', name, 'deleted.');
}

// When the DOM content is loaded, render characters from localStorage
document.addEventListener('DOMContentLoaded', renderCharacters);

// When clicking the delete button
document.getElementById('delete-character-Btn').addEventListener('click', function() {
    const characterNameToDelete = document.getElementById(characterName);
    deleteCharacterByName(characterNameToDelete);
});