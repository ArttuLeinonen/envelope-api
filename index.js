const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
const envelopeRouter = require('./routes/envelopes')

app.use('/envelopes', envelopeRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})