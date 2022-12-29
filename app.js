let express = require('express');
const app = express();
let fs = require('fs')

app.use(express.json())

app.get('/songs', (req, res) =>
    res.status(200).send(
        /* "Here are my songs" */
        fs.readFile('songs.json', 'utf8', (err, data) => {
            console.log(data.toString())
        })
))

app.listen(2800, () => console. log('server is up localhost:2800/songs'));