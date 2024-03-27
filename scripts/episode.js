(async () => {
    const episodes = await API.getEpisodes();
    episodes.forEach(addEpisodeToFrontPage);
})();

const episodesContainer = document.getElementById("episodesList");

async function addEpisodeToFrontPage(episode) {
    const episodeElement = document.createElement("div");
    
        
    episodeElement.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Number: ${episode.number}</h4>
        <hr>`;

    const episodeButton = document.createElement("button");
    episodeButton.textContent = "Show Episode";
    episodeButton.classList.add("open-button");

    episodeButton.addEventListener("click", () => {
        showSingleEpisode(episode);
    });

    episodeElement.appendChild(episodeButton);

    episodesContainer.appendChild(episodeElement);
}

function showSingleEpisode(episode) {
    // Close any previously opened episode
    const previousEpisode = document.getElementById("single-episode");
    if (previousEpisode) {
        previousEpisode.remove();
    }

    const episodeContainer = document.createElement("div");
    episodeContainer.id = "single-episode";

    episodeContainer.innerHTML = `
        <h4>Title: ${episode.title}</h4>
        <h4>Number: ${episode.number}</h4>
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

(async () => {
    const episodes = await API.getEpisodes();
    episodes.forEach(addEpisodeToFrontPage);
})();



