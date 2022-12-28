async function getSongs() {
    
    try {
        console.log("Hello");
        const response = await fetch("./songs.json");
        console.log("Hello 2");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("There was an error loading songs. Sorry.");
    }
}

getSongs();