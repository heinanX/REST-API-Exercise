const allSongs = document.querySelector(".allSongs");
const tbody = document.querySelector(".tbody");

async function displayAll() {
    const response = await fetch('http://localhost:3000/songs');
    const data = await response.json()

    data.forEach(element => {
        const songTableRow = document.createElement("tr")
        songTableRow.setAttribute('class', 'tr--body')
        const title = document.createElement("td")
        title.setAttribute('class', 'td--styling')
        const artist = document.createElement("td")
        artist.setAttribute('class', 'td--styling')
        const id = document.createElement("td")
        id.setAttribute('class', 'td--id')
        const year = document.createElement("td")
        year.setAttribute('class', 'td--styling')

        title.innerHTML = element.Title
        artist.innerHTML = element.Artist
        id.innerHTML = element.id
        year.innerHTML = element.Year
        songTableRow.append(id, artist, title, year)
        tbody.append(songTableRow)
    });
}



async function displayRandom() {
    tbody.innerHTML = ""

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const songTableRow = document.createElement("tr")
    songTableRow.setAttribute('class', 'tr--body')
    const title = document.createElement("td")
    title.setAttribute('class', 'td--styling')
    const artist = document.createElement("td")
    artist.setAttribute('class', 'td--styling')
    const id = document.createElement("td")
    id.setAttribute('class', 'td--id')
    const year = document.createElement("td")
    year.setAttribute('class', 'td--styling')

    let num = Math.floor(Math.random() * data.length);
    const song = data[num]
    if (song) {
        title.innerHTML = song.Title
        artist.innerHTML = song.Artist
        id.innerHTML = song.id
        year.innerHTML = song.Year
        songTableRow.append(id, artist, title, year)
        tbody.append(songTableRow)
    }
}

async function displayID() {
    allSongs.innerHTML = "";
    const displayID = document.getElementById('displayID').value

    const response = await fetch(`http://localhost:3000/songs/${displayID}`);
    const data = await response.json()
    
    const p = document.createElement("p");

    p.innerHTML = '<b>Title: </b>' + data.Title + '<br>' + '<b>Artist: </b>' + data.Artist + '<br>' + '<b>id: </b>' + data.id
    allSongs.append(p)
}

async function deleteID() {
    console.log("Id not")
    allSongs.innerHTML = "";
    const deleteID = document.getElementById('displayID').value

    const response = await fetch(`http://localhost:3000/songs/${deleteID}`, {
        method: 'DELETE'
    });
    const data = await response.json()
}

/* async function createID() {
    allSongs.innerHTML = "";
    const createIDTitle = document.getElementById('createID--title').value
    const createIDArtist = document.getElementById('createID--artist').value
    const createIDYear = document.getElementById('createID--year').value
    const createIDGenre = document.getElementById('createID--genre').value

    const response = await fetch('http://localhost:3000/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    } );
    const data = await response.json()
    
    const p = document.createElement("p");

    p.innerHTML = '<b>Title: </b>' + data.Title + '<br>' + '<b>Artist: </b>' + data.Artist + '<br>' + '<b>id: </b>' + data.id
    allSongs.append(p)
} */