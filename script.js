const allSongs = document.querySelector(".allSongs");
const tbody = document.querySelector(".tbody");
let timenow = Date.now()
let timestamp = timenow - 1672900000000
const songTableRow = document.createElement("ul")
songTableRow.setAttribute('class', 'tr--body')

const warning = document.createElement('h2')
warning.setAttribute('class', 'warning')


async function displayAll() {
    const response = await fetch('http://localhost:3000/songs');
    const data = await response.json()

    //tbody.innerHTML = ""
  

    songTableRow.innerHTML = ""

    data.forEach(element => {
/*         const songTableRow = document.createElement("tr")
        songTableRow.setAttribute('class', 'tr--body') */
        const collector = document.createElement("li")
        collector.setAttribute('class', 'td--li')
        const title = document.createElement("p")
        title.setAttribute('class', 'td--title')
        const artist = document.createElement("p")
        artist.setAttribute('class', 'td--artist')
        const id = document.createElement("p")
        id.setAttribute('class', 'td--id')
        const year = document.createElement("p")
        year.setAttribute('class', 'td--year')
        const editButton = document.createElement("button")
        editButton.setAttribute('class', 'td--button')
        
        editButton.addEventListener('click', function() {
            changeSong(element)
        })

        editButton.innerHTML = "edit"
        title.innerHTML = element.title
        artist.innerHTML = element.artist
        id.innerHTML = element.id
        year.innerHTML = element.year
        collector.append(id, artist, title, year, editButton)
        songTableRow.append(collector)
        allSongs.append(songTableRow)
    });
}

displayAll()

/* function changeSong(data, event) {
    let x = event.target;
    x.innerText = x
    console.log(data)
    const displayID = document.getElementById('displayID')
    displayID.value = x
} */

async function displayRandom() {
    songTableRow.innerHTML = ""

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const collector = document.createElement("li")
        collector.setAttribute('class', 'td--li')
        const title = document.createElement("p")
        title.setAttribute('class', 'td--title')
        const artist = document.createElement("p")
        artist.setAttribute('class', 'td--artist')
        const id = document.createElement("p")
        id.setAttribute('class', 'td--id')
        const year = document.createElement("p")
        year.setAttribute('class', 'td--year')

    let num = Math.floor(Math.random() * data.length);
    const song = data[num]
    if (song) {
        title.innerHTML = song.title
        artist.innerHTML = song.artist
        id.innerHTML = song.id
        year.innerHTML = song.year
        collector.append(id, artist, title, year)
        songTableRow.append(collector)
        allSongs.append(songTableRow)
    }
}

async function displayID() {
    songTableRow.innerHTML = ""
    const displayID = document.getElementById('displayID').value

    const response = await fetch(`http://localhost:3000/songs/get/${displayID}`);
    const data = await response.json()
    
    const collector = document.createElement("li")
    collector.setAttribute('class', 'td--li')
    const title = document.createElement("p")
    title.setAttribute('class', 'td--title')
    const artist = document.createElement("p")
    artist.setAttribute('class', 'td--artist')
    const id = document.createElement("p")
    id.setAttribute('class', 'td--id')
    const year = document.createElement("p")
    year.setAttribute('class', 'td--year')
    const editButton = document.createElement("button")
    editButton.setAttribute('class', 'td--button')

    editButton.addEventListener('click', function() {
        changeSong(data)
    })

    editButton.innerHTML = "edit"
    title.innerHTML = data.title
    artist.innerHTML = data.artist
    id.innerHTML = data.id
    year.innerHTML = data.year

    collector.append(id, artist, title, year, editButton)
    songTableRow.append(collector)
    allSongs.append(songTableRow)
}

async function lookUpID() {
    songTableRow.innerHTML = ""
    const displayID = document.getElementById('displayID')

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const value = displayID.value
    let songs = data.filter(element => element.artist.toLowerCase() === value.toLowerCase())

    if (songs.length > 0) {
        songs.forEach(element => {
        const collector = document.createElement("li")
        collector.setAttribute('class', 'td--li')
        const title = document.createElement("p")
        title.setAttribute('class', 'td--title')
        const artist = document.createElement("p")
        artist.setAttribute('class', 'td--artist')
        const id = document.createElement("p")
        id.setAttribute('class', 'td--id')
        const year = document.createElement("p")
        year.setAttribute('class', 'td--year')
        const editButton = document.createElement("button")
        editButton.setAttribute('class', 'td--button')

        editButton.addEventListener('click', function() {
            changeSong(element)
        })

        editButton.innerHTML = "edit"
        title.innerHTML = element.title
        artist.innerHTML = element.artist
        id.innerHTML = element.id
        year.innerHTML = element.year
        collector.append(id, artist, title, year, editButton)
        songTableRow.append(collector)
        allSongs.append(songTableRow)

    })

    } else {
        warning.innerHTML = "Bye bye bye"
        songTableRow.append(warning)
        allSongs.append(songTableRow)
    }
   
    displayID.value = ""

}

async function deleteID() {
    const deleteID = document.getElementById('deleteID').value

    const response = await fetch(`http://localhost:3000/songs/${deleteID}`, {
        method: 'DELETE'
    });
    const data = await response.json()
}

async function createID() {
    const createIDTitle = document.getElementById('createID--title').value
    const createIDArtist = document.getElementById('createID--artist').value
    const createIDYear = document.getElementById('createID--year').value

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
    songTableRow.innerHTML = ""

    const collector = document.createElement('li')
    collector.setAttribute('class', 'td--li')
    const title = document.createElement('input')
    title.setAttribute('class', 'td--title edit')
    const artist = document.createElement('input')
    artist.setAttribute('class', 'td--artist edit')
    const id = document.createElement('p')
    id.setAttribute('class', 'td--id nudge')
    const year = document.createElement('input')
    year.setAttribute('class', 'td--year edit')
    year.setAttribute("type", "number")
    const saveButton = document.createElement("button")
    saveButton.setAttribute('class', 'td--button nudge')

    saveButton.addEventListener('click', function() {
        saveSong(songId.id, artist, title, year)
    })

    saveButton.innerHTML = "save"
    title.value = songId.title
    artist.value = songId.artist
    id.innerHTML = songId.id
    year.value = songId.year
    collector.append(id, artist, title, year, saveButton)
    songTableRow.append(collector)
    allSongs.append(songTableRow)


    console.log(songId);

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