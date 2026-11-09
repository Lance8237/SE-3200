
let editingGameId = null;

async function loadGames() {
    const response = await fetch("/games");
    const games = await response.json();

    const gamesList = document.getElementById("games-list");
    gamesList.innerHTML = "";

    games.forEach(game => {
        const gameDiv = document.createElement("div");

        gameDiv.textContent = `${game.title} - ${game.platform} - ${game.genre} - ${game.release_year} - ${game.hours_played} hours `;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            editingGameId = game.id;

            document.getElementById("title").value = game.title;
            document.getElementById("platform").value = game.platform;
            document.getElementById("genre").value = game.genre;
            document.getElementById("release_year").value = game.release_year;
            document.getElementById("hours_played").value = game.hours_played;

            document.getElementById("form-heading").textContent = "Edit Game";
            document.getElementById("submit-button").textContent = "Save Changes";
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async function() {
            const confirmed = confirm(`Are you sure you want to delete ${game.title}?`);

            if (!confirmed) {
                return;
            }

            const response = await fetch(`/games/${game.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                if (editingGameId === game.id) {
                    resetForm();
                }
                loadGames();
            } else {
                alert("Failed to delete game");
            }
        });

        gameDiv.appendChild(editButton);
        gameDiv.appendChild(deleteButton);
        gamesList.appendChild(gameDiv);
    });
}

function resetForm() {
    editingGameId = null;
    document.getElementById("game-form").reset();
    document.getElementById("form-heading").textContent = "Add a Game";
    document.getElementById("submit-button").textContent = "Add Game";
}

document.getElementById("game-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const game = {
        title: document.getElementById("title").value,
        platform: document.getElementById("platform").value,
        genre: document.getElementById("genre").value,
        release_year: Number(document.getElementById("release_year").value),
        hours_played: Number(document.getElementById("hours_played").value)
    };

    const isEditing = editingGameId !== null;

    const url = isEditing ? `/games/${editingGameId}` : "/games";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    });

    if (response.ok) {
        resetForm();
        loadGames();
    } else {
        const error = await response.json();
        alert(error.error || "Failed to save game");
    }
});

document.getElementById("cancel-button").addEventListener("click", resetForm);

loadGames();
