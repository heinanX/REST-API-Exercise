const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');


app.listen(3000, () => {console.log('Servern är igång. Eller...')})

app.get('/songs', (req, res) => {

    fs.readFile('songs.json', (err, data) => {
       if (err) {
        console.log('error 404')
       }

       const songs = JSON.parse(data)
       res.send(songs)
       return;
    })
})

app.get('/songs/:songId', (req, res) => {

    let showSong = req.params.songId

    fs.readFile('songs.json', (err, data) => {
       if (err) {
        console.log('error 404')
       }
       const songs = JSON.parse(data)

       songs.forEach(element => {
        if (element.id == showSong) {
            res.send(element)
        }
       })

    })
})

app.post('/song', (req, res) => {
 
    fs.readFile('songs.json',  (err, data) => {
      if (err) {
        res.status(404).send('404 Error')
      }

      const songs = JSON.parse(data)
      
      // Generate an id number depending on array length.
      function makeCounter() {
        let songId = songs.length +1
        return songId++;
      }
      // ------------------------------

      let newSong =    
        {
          "title": "Oops! I Did It Again",
          "artist": "Britney Spears",
          "id": makeCounter()
        }
        
        songs.push(newSong)

        fs.writeFile("songs.json", JSON.stringify(songs, null, 2), function(err) {
          if(err) {
            console.log(err)
          }
        } )

        res.status(201).json(songs)
        return
    })
  })