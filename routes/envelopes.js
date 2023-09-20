const express = require('express')
const router = express.Router();
const budget = 1300;
const envelopes = [{budget}];



router.get('/', (req, res) => {
    res.json({
        envelopes
    })
})

router.get('/:id', (req, res) => {
    const result = envelopes.find((element) => element.id === req.params.id);
    if(result) {
        res.json(result);
    } else {
        res.status(404).send('Cannot find id');
    }
})

router.post('/:id', (req, res) => {

    const data = {
        envelope: req.body
    }

    if(!data) {
        res.status(404).send({ message: 'No data received.'});
    } 
    data.envelope.id = req.params.id;
    console.log(data)
    envelopes.push(data.envelope)

    res.json({
        data
    })
})

router.put('/:id', (req, res) => {
    const match = (element) => element.id === req.params.id;
    const index = envelopes.findIndex(match);
    console.log(index);
    if(index > -1) {
        envelopes[index] = req.body;
        req.body.id = req.params.id;
        res.status(201).send('Envelope change successful')
    } else {
        res.status(404).send('Id not found');
    }
    
})

router.delete('/:id', (req, res) => {
    const match = (element) => element.id === req.params.id;
    const index = envelopes.findIndex(match);
    console.log(index)
    if(index > -1) {
        envelopes.splice(index, 1);
        res.status(200).send('Deleted element');
    } else {
        res.status(404).send('Cannot find id');
    }
})

router.post('/transfer/:from/:to', (req, res) => {
    const transferFrom = req.params.from;
    const transferTo = req.params.to;
    const transferFromMatch = (element) => element.id === req.params.from;
    const transferFromIndex = envelopes.findIndex(transferFromMatch);
    const transferToMatch = (element) => element.id === req.params.to;
    const transferToIndex = envelopes.findIndex(transferToMatch);
    if(transferFrom && transferTo) {
        console.log(envelopes[transferFromIndex]['food']);
        console.log(envelopes[transferToIndex]['rent']);
        const value = req.body
        envelopes[transferFromIndex]['food'] - value;
        envelopes[transferToIndex]['rent'] + value;
        res.status(200).json(`Success`);
    } else {
        res.status(400).send('Could not find id');
    }
})

module.exports = router