async function getData() {
    const response = await fetch('http://localhost:3000/songs');
    const data = await response.json()
    console.log(data);
}

getData()

async function displayAll() {
    const response = await fetch('http://localhost:3000/songs');
    const data = await response.json()

    const div = document.querySelector(".allSongs")
    div.innerHTML = ""
    const ol = document.createElement("ol")
    ol.setAttribute("class", "displayAll-ol")

    data.forEach(element => {
        const li = document.createElement("li")
        li.setAttribute("class", "li")

        li.innerHTML = '<b>Title: </b>' + element.Title + '<br>' + '<b>Artist: </b>' + element.Artist + '<br>' + '<b>id: </b>' + element.id
        ol.append(li)
        div.append(ol)
    });
}



async function displayRandom() {
    const div = document.querySelector(".allSongs")
    div.innerHTML = ""

    const response = await fetch(`http://localhost:3000/songs`);
    const data = await response.json()

    const p = document.createElement("p");
    let num = Math.floor(Math.random() * data.length);
    const song = data[num]
    if (song) {
        p.innerHTML = '<b>Title: </b>' + song.Title + '<br>' + '<b>Artist: </b>' + song.Artist + '<br>' + '<b>id: </b>' + song.id
        div.append(p)
    }
    
}