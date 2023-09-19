const express = require('express')
const app = express();
const PORT = 3000;
const envelope = {

}

app.use(express.json())

app.get('/envelope', (req, res) => {
    res.send({
        food: 230,
        rent: 450,
        clothes: 100,
    })
})

app.post('/envelope/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    if(!data) {
        res.status(404).send({ message: 'No data received.'});
    } 
    console.log(data)
    console.log(id)
    res.send({
        envelope: {
            id,
            data
        }
    })
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})