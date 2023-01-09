const allSongs = document.querySelector('.allSongs');
const songUl = document.createElement('ul');
songUl.setAttribute('class', 'songUl');
const warning = document.createElement('h2');
warning.setAttribute('class', 'warning');
let timenow = Date.now();
let timestamp = timenow - 1672900000000;


async function displayAll() {
    const response = await fetch('http://localhost:3000/songs');
    const data = await response.json()

    songUl.innerHTML = '';

    data.forEach(element => {
        const liContainer = document.createElement('li');
        liContainer.setAttribute('class', 'li--container');
        const title = document.createElement('p');
        title.setAttribute('class', 'td--title');
        const artist = document.createElement('p');
        artist.setAttribute('class', 'td--artist');
        const id = document.createElement('p');
        id.setAttribute('class', 'td--id');
        const year = document.createElement('p');
        year.setAttribute('class', 'td--year');
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'td--button');

        editButton.addEventListener('click', function () {
            changeSong(element);
        })

        editButton.innerHTML = 'edit';
        title.innerHTML = element.title;
        artist.innerHTML = element.artist;
        id.innerHTML = element.id;
        year.innerHTML = element.year;

        liContainer.append(id, artist, title, year, editButton);
        songUl.append(liContainer);
        allSongs.append(songUl);
    });
}

displayAll()

async function displayRandom() {
    songUl.innerHTML = '';

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const liContainer = document.createElement('li');
    liContainer.setAttribute('class', 'li--container');
    const title = document.createElement('p');
    title.setAttribute('class', 'td--title');
    const artist = document.createElement('p');
    artist.setAttribute('class', 'td--artist');
    const id = document.createElement('p');
    id.setAttribute('class', 'td--id');
    const year = document.createElement('p');
    year.setAttribute('class', 'td--year');

    let num = Math.floor(Math.random() * data.length);
    const song = data[num];
    if (song) {
        title.innerHTML = song.title;
        artist.innerHTML = song.artist;
        id.innerHTML = song.id;
        year.innerHTML = song.year;

        liContainer.append(id, artist, title, year);
        songUl.append(liContainer);
        allSongs.append(songUl);
    }
}

async function displayID() {
    songUl.innerHTML = '';
    const displayID = document.getElementById('displayID').value;

    const response = await fetch(`http://localhost:3000/songs/get/${displayID}`);
    const data = await response.json()

    const liContainer = document.createElement('li');
    liContainer.setAttribute('class', 'li--container');
    const title = document.createElement('p');
    title.setAttribute('class', 'td--title');
    const artist = document.createElement('p');
    artist.setAttribute('class', 'td--artist');
    const id = document.createElement('p');
    id.setAttribute('class', 'td--id');
    const year = document.createElement('p');
    year.setAttribute('class', 'td--year');
    const editButton = document.createElement('button');
    editButton.setAttribute('class', 'td--button');

    editButton.addEventListener('click', function () {
        changeSong(data);
    })

    editButton.innerHTML = 'edit';
    title.innerHTML = data.title;
    artist.innerHTML = data.artist;
    id.innerHTML = data.id;
    year.innerHTML = data.year;

    liContainer.append(id, artist, title, year, editButton);
    songUl.append(liContainer);
    allSongs.append(songUl);
}

async function lookUpID() {
    songUl.innerHTML = '';
    const displayID = document.getElementById('displayID');

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const value = displayID.value;
    let songs = data.filter(element => element.artist.toLowerCase() === value.toLowerCase());

    if (songs.length > 0) {
        songs.forEach(element => {
            const liContainer = document.createElement('li');
            liContainer.setAttribute('class', 'li--container');
            const title = document.createElement('p');
            title.setAttribute('class', 'td--title');
            const artist = document.createElement('p');
            artist.setAttribute('class', 'td--artist');
            const id = document.createElement('p');
            id.setAttribute('class', 'td--id');
            const year = document.createElement('p');
            year.setAttribute('class', 'td--year');
            const editButton = document.createElement('button');
            editButton.setAttribute('class', 'td--button');

            editButton.addEventListener('click', function () {
                changeSong(element);
            })

            editButton.innerHTML = 'edit';
            title.innerHTML = element.title;
            artist.innerHTML = element.artist;
            id.innerHTML = element.id;
            year.innerHTML = element.year;

            liContainer.append(id, artist, title, year, editButton);
            songUl.append(liContainer);
            allSongs.append(songUl);

        })

    } else {
        warning.innerHTML = "Unknown Artist. Check spelling.";
        songUl.append(warning);
        allSongs.append(songUl);
    }

    displayID.value = '';

}

async function deleteID() {
    const deleteID = document.getElementById('deleteID').value;

    const response = await fetch(`http://localhost:3000/songs/${deleteID}`, {
        method: 'DELETE'
    });
    const data = await response.json()
}

async function createID() {
    const createIDTitle = document.getElementById('createID--title').value;
    const createIDArtist = document.getElementById('createID--artist').value;
    const createIDYear = document.getElementById('createID--year').value;

    const response = await fetch('http://localhost:3000/songs', {
        method: 'POST',
        body: JSON.stringify({
            "title": createIDTitle,
            "artist": createIDArtist,
            "year": createIDYear,
            "id": timestamp

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
}

async function changeSong(songId) {
    songUl.innerHTML = '';

    const liContainer = document.createElement('li');
    liContainer.setAttribute('class', 'li--container');
    const title = document.createElement('input');
    title.setAttribute('class', 'td--title edit');
    const artist = document.createElement('input');
    artist.setAttribute('class', 'td--artist edit');
    const id = document.createElement('p');
    id.setAttribute('class', 'td--id nudge');
    const year = document.createElement('input');
    year.setAttribute('class', 'td--year edit');
    year.setAttribute('type', 'number');
    const saveButton = document.createElement('button');
    saveButton.setAttribute('class', 'td--button nudge');

    saveButton.addEventListener('click', function () {
        saveSong(songId.id, artist, title, year);
    })

    saveButton.innerHTML = 'save';
    title.value = songId.title;
    artist.value = songId.artist;
    id.innerHTML = songId.id;
    year.value = songId.year;

    liContainer.append(id, artist, title, year, saveButton);
    songUl.append(liContainer);
    allSongs.append(songUl);
}

async function saveSong(songId, artist, title, year) {
    const response = await fetch(`http://localhost:3000/songs/${songId}`, {
        method: 'PUT',
        body: JSON.stringify({
            "title": title.value,
            "artist": artist.value,
            "year": year.value,
            "id": songId

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
}