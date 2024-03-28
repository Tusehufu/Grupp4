const episodeOptionsBtn = document.getElementById("episode-OPT");
const episodeOptionsContainer = document.getElementById("episode-options-container");

let isFormVisible = false; // Variable to track visibility state of the form

// Add event listener to the button
episodeOptionsBtn.addEventListener("click", function() {
    // Toggle the display style of the container
    if (!isFormVisible) { // If the form is not visible
        episodeOptionsContainer.style.display = "block"; // Show the form
        episodeOptionsBtn.textContent = "X"; // Remove text from the button
        isFormVisible = true; // Update visibility state
    } else { // If the form is visible
        episodeOptionsContainer.style.display = "none"; // Hide the form
        episodeOptionsBtn.textContent = "Episode Options"; // Restore the text
        isFormVisible = false; // Update visibility state
    }
});



(async () => {
    const episodesFromAPI = await API.getEpisodes();
    console.log('Episodes from API:', episodesFromAPI); // L�gg till denna logg

    let episodesFromLocalStorage = JSON.parse(localStorage.getItem('episodes')) || [];
    console.log('Episodes from LocalStorage:', episodesFromLocalStorage); // L�gg till denna logg

    // Kombinera avsnitten fr�n API:et och local storage
    const allEpisodes = [...episodesFromLocalStorage, ...episodesFromAPI];
    console.log(allEpisodes);
    // Sortera den kombinerade arrayen
    const sortedEpisodes = sortEpisodes(allEpisodes);

    // Rendera de sorterade avsnitten
    sortedEpisodes.forEach(addEpisodeToFrontPage);
})();

const episodesContainer = document.getElementById("episodesList");
window.addEventListener('DOMContentLoaded', renderEpisodes);

async function addEpisodeToFrontPage(episode) {
    const episodeElement = document.createElement("div");
    const episodeNumber = parseInt(episode.number.split(" ")[0]);
    let season = "";
    let episodeNumberInSeason = 0;
    // Anv�nd calculateSeasonAndEpisode f�r avsnitt fr�n API
    if (!episode.title || !episode.season || !episode.number) {
        const { season: calculatedSeason, episodeNumberInSeason: calculatedEpisode } = calculateSeasonAndEpisode(episodeNumber);
        season = calculatedSeason;
        episodeNumberInSeason = calculatedEpisode;
    } else {
        // Anv�nd de direkt angivna v�rdena f�r s�song och avsnitt
        season = episode.season;
        episodeNumberInSeason = episode.number;
    }
    // Skapa HTML-elementet f�r avsnittet
    episodeElement.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Season: ${season}</h4>
        <h4>Episode: ${episodeNumberInSeason}</h4>
        `;

    // Skapa knappen f�r att visa avsnittet
    const episodeButton = document.createElement("button");
    episodeButton.textContent = "Show Episode";
    episodeButton.classList.add("open-button");
    
    episodeButton.addEventListener("click", () => {
        showSingleEpisode(episode);
    });

    episodeElement.appendChild(episodeButton);

    episodesContainer.appendChild(episodeElement);
    episodeElement.insertAdjacentHTML('beforeend', '<hr>');
    episodeElement.insertAdjacentHTML('beforeend', '<br>');
}



function calculateSeasonAndEpisode(episodeNumber) {
    let season = "";
    let episodeNumberInSeason = 0;

    if (episodeNumber >= 1 && episodeNumber <= 9) {
        season = "1";
        episodeNumberInSeason = episodeNumber;
    } else if (episodeNumber >= 10 && episodeNumber <= 29) {
        season = "2";
        episodeNumberInSeason = episodeNumber - 9;
    } else if (episodeNumber >= 30 && episodeNumber <= 44) {
        season = "3";
        episodeNumberInSeason = episodeNumber - 29;
    } else if (episodeNumber >= 45 && episodeNumber <= 56) {
        season = "4";
        episodeNumberInSeason = episodeNumber - 44;
    } else if (episodeNumber >= 57 && episodeNumber <= 72) {
        season = "5";
        episodeNumberInSeason = episodeNumber - 56;
    } else if (episodeNumber >= 73 && episodeNumber <= 76) {
        season = "6";
        episodeNumberInSeason = episodeNumber - 72;
    } else if (episodeNumber >= 77 && episodeNumber <= 80) {
        season = "6";
        episodeNumberInSeason = episodeNumber - 76 + 1;
    } else if (episodeNumber >= 81 && episodeNumber <= 84) {
        season = "6";
        episodeNumberInSeason = episodeNumber - 80 + 2;
    } else if (episodeNumber >= 85 && episodeNumber <= 88) {
        season = "6";
        episodeNumberInSeason = episodeNumber - 84 + 3;
    } else if (episodeNumber >= 89 && episodeNumber <= 101) {
        season = "7";
        episodeNumberInSeason = episodeNumber - 88;
    } else if (episodeNumber >= 102 && episodeNumber <= 114) {
        season = "8";
        episodeNumberInSeason = episodeNumber - 101;
    } else if (episodeNumber >= 115 && episodeNumber <= 127) {
        season = "9";
        episodeNumberInSeason = episodeNumber - 114;
    } else if (episodeNumber >= 128 && episodeNumber <= 140) {
        season = "10";
        episodeNumberInSeason = episodeNumber - 127;
    } else {
        season = "Unknown";
        episodeNumberInSeason = episodeNumber;
    }

    return { season, episodeNumberInSeason };
}

function showSingleEpisode(episode) {
    const previousEpisode = document.getElementById("single-episode");
    if (previousEpisode) {
        previousEpisode.remove();
    }

    const episodeContainer = document.createElement("div");
    episodeContainer.id = "single-episode";

    const episodeNumber = parseInt(episode.number.split(" ")[0]);

    // Anropa calculateSeasonAndEpisode f�r att best�mma s�songen och avsnittsnumret
    const { season, episodeNumberInSeason } = calculateSeasonAndEpisode(episodeNumber);

    episodeContainer.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Season: ${season}</h4>
        <h4>Episode: ${episodeNumberInSeason}</h4>
        <h4>Air Date: ${episode.originalAirDate}</h4>
        <h4>Description:<p> ${episode.desc}</p></h4>
        <h4>Writers: ${episode.writers}</h4>
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("close-button");

    closeButton.addEventListener("click", () => {
        episodeContainer.remove();
    });

    episodeContainer.appendChild(closeButton);
    document.body.appendChild(episodeContainer);
}

document.getElementById('episode-options-container').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('episodeTitle').value;
    const season = document.getElementById('seasonNumber').value;
    const episodeNumber = document.getElementById('episodeNumber').value;
    const releaseDate = document.getElementById('releaseDate').value;

    const newEpisode = {
        title: title,
        season: season,
        number: episodeNumber,
        originalAirDate: releaseDate
    };

    let episodes = JSON.parse(localStorage.getItem('episodes')) || [];
    episodes.push(newEpisode);
    episodes = sortEpisodes(episodes);
    localStorage.setItem('episodes', JSON.stringify(episodes));

    // Find the element with the id "added-text"
    const addedTextElement = document.getElementById('added-text');

    // Check if the element exists before updating textContent
    if (addedTextElement) {
        // Change the text content of the h3 element inside added-text
        addedTextElement.querySelector('h3').textContent = 'A New Episode has been added to the list!';
    }

    // Clear input fields
    document.getElementById('episodeTitle').value = '';
    document.getElementById('seasonNumber').value = '';
    document.getElementById('episodeNumber').value = '';
   

    // Reload the page after a delay
    setTimeout(() => {
        location.reload();
    }, 2000); // Reload after 2 seconds (2000 milliseconds)
});

// Function to sort episodes
function sortEpisodes(episodes) {
    return episodes.sort((a, b) => {
        const episodeNumberA = parseInt(a.number);
        const episodeNumberB = parseInt(b.number);
        return episodeNumberA - episodeNumberB;
    });

    
}

// Function to render episodes from LocalStorage
function renderEpisodes() {
    const episodesContainer = document.getElementById("episodesList");
    episodesContainer.innerHTML = "";
    let episodes = JSON.parse(localStorage.getItem('episodes')) || [];
    episodes = sortEpisodes(episodes);
    episodes.forEach(addEpisodeToFrontPage);
}

function addLocalEpisodeToFrontPage(episode) {
    const episodeElement = document.createElement("div");

    // Anv�nd de direkt angivna v�rdena f�r s�song och avsnitt
    const { season, number: episodeNumber } = episode;

    // Skapa HTML-elementet f�r avsnittet
    episodeElement.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Season: ${season}</h4>
        <h4>Episode: ${episodeNumber}</h4>
        `;

        
    // L�gg till avsnittselementet i avsnittscontainer
    episodesContainer.appendChild(episodeElement);
    episodeElement.insertAdjacentHTML('beforeend', '<hr>');
    episodeElement.insertAdjacentHTML('beforeend', '<br>');
}

// Initial render of episodes
renderEpisodes();

