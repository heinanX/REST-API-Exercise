const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');


app.listen(3000, () => {console.log('Servern är igång. Eller...')})