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