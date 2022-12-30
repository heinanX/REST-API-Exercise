const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

// ----- STARTS THE SERVER
app.listen(3000, () => {console.log('Servern is up and running at http://localhost:3000/songs')})


// ----- Collects data from json file

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

// ----- Collects specified object from json file

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

// ----- Creates new object in json file
app.post('/songs', (req, res) => {
 
    fs.readFile('songs.json',  (err, data) => {
        if (err) {
        res.status(404).send('404 Error')
        }

        const songs = JSON.parse(data)
      
        //---------  Generate an id number.
    
        async function createId() {
            let num = Math.floor(Math.random() * 10000000)
            console.log(num)
        
             songs.forEach(element => {
                let ids = element.id
                if (num === ids) {
                    console.log("noo")
                createId()
            } else { 
                console.log("works so far")
                return num
            }
        })
    }
      // ------------------------------

      let newSong =    
        {
          "title": "Oops! I Did It Again",
          "artist": "Britney Spears",
          "id": createId()
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

  // ----- Updates specified product inside object in json file

  app.put('/songs/:songId', (req, res) => {

    fs.readFile("songs.json",  (err, data) => {

      if (err) {
        res.status(404).send(err)
      }

      const songs = JSON.parse(data)
      const id = req.params.songId;

      songs.map(item => {
        const songId = JSON.stringify(item.id)
        if (songId === id) {

          const newArr = songs.map(makeTheChanges)
          function makeTheChanges(item) {
  
            if (item.id == id) {
              return { ...item, artist: "Kansas" }
            }
  
            return item;
  
          }

          fs.writeFile("songs.json", JSON.stringify(newArr, null, 2), function (err) {
            
            if (err) {"404 Error - could not overwrite file"}

          })

          res.status(200).json(newArr)

          return
        }
      })
      
    });
});

// ----- Deletes specified object from json file

app.delete('/songs/:songId', (req, res) => {
    fs.readFile("songs.json",  (err, data) => {
  
      if (err) {res.status(404).send("404 - could not read file")}
  
      // ----- array parser and collector of id and parser of id
      const songs = JSON.parse(data);
      const id = req.params.songId;
      const newId = JSON.parse(id);

      // ----- goes through songs array and locates specified array id by comparing song id with requested id.
      // ----- it then uses that position to delete specified item.
  
      let found = songs.findIndex(item => item.id === newId)
      songs.splice(found, 1)

      // ----- old array is written over with modified array
  
      fs.writeFile('songs.json', JSON.stringify(songs, null, 2), (err) => {
        if (err) { }
      })
      res.status(200).send(songs)
    })
  })