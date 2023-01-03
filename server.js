const { log } = require('console');
const express = require('express');
const cors = require('cors');

const app = express();
const fs = require('fs');
const cors2 = cors()

app.use(cors())

//--------- STARTS SERVER ---------\\

app.listen(3000, () => { console.log('Servern is up and running at http://localhost:3000/songs') });


//--------- Collects data from json file ---------\\

app.get('/songs', (req, res) => {

  fs.readFile('songs.json', (err, data) => {
    if (err) { res.status(404).send(`Unable to read source file. See ${err}`) }

    const songs = JSON.parse(data)
    res.status(200).send(songs)
  })

})

//--------- Collects specified object from json file ---------\\

app.get('/songs/:songId', (req, res) => {

  fs.readFile('songs.json', (err, data) => {
    if (err) { res.status(404).send(`Unable to read source file. See ${err}`) }

    const songs = JSON.parse(data)
    let showSong = req.params.songId
    let song = songs.find(element => element.id == showSong)

    if (song) {
      res.status(200).send(song);
    } else {
        res.status(404).send(`Cannot find id: ${showSong}`);
      }
  })

})

//--------- Creates new object in json file  ---------\\

app.post('/songs', (req, res) => {

  fs.readFile('songs.json', (err, data) => {
    if (err) { res.status(404).send(`Unable to read source file. See ${err}`) }

    const songs = JSON.parse(data);

    //----  Generate an id number  ----\\

    function createId() {
      let num = Math.floor(Math.random() * 10000000);

      if (!(songs.find(element => element.id == num))) {
        return num; 
      } else {
          createId()
        }
    }

    //---- Creates new object in array ----\\

    let newSong =
    {
      "Title": "Oops! I Did It Again",
      "Artist": "Britney Spears",
      "Year": 1999,
      "Genre": "pop",
      "id": createId()
    }

    //---- Pushes new object to songs array ----\\

    songs.push(newSong);

    //---- Overwrites json file with updated array ----\\

    fs.writeFile('songs.json', JSON.stringify(songs, null, 2), function (err) {
      if (err) { res.status(404).send(`Unable to write file. See ${err}`) }
    })
    res.status(201).json(songs);
  })

})

//--------- Updates specified product inside object in json file ---------\\

app.put('/songs/:songId', (req, res) => {

  fs.readFile('songs.json', (err, data) => {
    if (err) { res.status(404).send(`Unable to read source file. See ${err}`) }

    const songs = JSON.parse(data);
    const id = req.params.songId;
    let song = songs.find(element => element.id == id);

    if (song) {
      const newArr = songs.map(item => {
        if (item.id == id) {
          return { ...item, Artist: 'THIS IS REPLACEMENT TEXT 2' }
        } return item;
      });

      fs.writeFile('songs.json', JSON.stringify(newArr, null, 2), function (err) {
        if (err) { res.status(404).send('Cannot overwrite file') }
      });

      res.status(200).json(newArr);

    } else {
      res.status(404).send('Unknown ID.');
    }
  });

});

//--------- Deletes specified object from json file ---------\\

app.delete('/songs/:songId', (req, res) => {

  fs.readFile('songs.json', (err, data) => {
  if (err) { res.status(404).send(`Unable to read source file. See ${err}`) }

    //---- array parser and collector of id and parser of id ----\\

    const songs = JSON.parse(data);
    const id = req.params.songId;

    //---- goes through songs array and locates specified array id by comparing song id with requested id. ----\\

    let found = songs.findIndex(item => item.id == id)
    
    //---- if not assigned an id  ----\\
    if (!(found === -1)) {
      songs.splice(found, 1)

      fs.writeFile('songs.json', JSON.stringify(songs, null, 2), (err) => {
        if (err) { res.status(404).send('404 Error - could not overwrite file') }
      })
      res.status(200).send(songs)

    } else { res.status(404).send('Unknown ID') }

  })
})