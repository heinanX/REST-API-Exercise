let express = require('express');
const app = express();
let fs = require('fs')

app.use(express.json())

app.get('/songs', (req, res) =>

    fs.readFile('songs.json', 'utf8', (err, data) => {
        res.status(200).send(data)
    })
)

app.listen(2800, () => console. log('server is up localhost:2800/songs'));