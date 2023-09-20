const express = require('express')
const router = express.Router();
let budgetLeft = 1300;
let budgetUsed = 0;
let envelopes = [{title: 'Test', budget: 100, envelopeId: 1}, {title: 'Test2', budget: 200, envelopeId: 2}];

//Calculate value of budget on every request
router.use((req, res, next) => {
    budgetUsed = 0;
    budgetLeft = 1300;
    envelopes.forEach((element) => budgetUsed += element.budget);
    budgetLeft -= budgetUsed;
    console.log(budgetLeft);
    next();
})

//Get all envelopes
router.get('/', (req, res) => {
  
    res.json(envelopes);

})

//Get specific envelope
router.get('/:id', (req, res) => {
    const found = envelopes.find((element) => JSON.stringify(element.envelopeId) === req.params.id)
    if(found) {
        res.status(200).send(found);
    } else {
        res.status(400).send('error');
    }
})

//New envelope
router.post('/', (req, res, next) => {
    if(req.body) {
        const envelope = req.body
        envelope.envelopeId = envelopes.length + 1;
        if(envelopes.find((element) => element.title === envelope.title)) {
            res.status(400).send('Envelope with this title already exists.');
        } else {
            envelopes.push(envelope);
            res.status(200).send(envelope);
        }
   
    } else {
        res.status(400).send('Error');
    }
})

//Update envelope
router.post('/:id', (req, res) => {
    
    let target = envelopes.find((element) => JSON.stringify(element.envelopeId) === req.params.id);
    if(target) {
        if(req.body['title'] && req.body['budget']) {
        target.title = req.body['title'];
        target.budget = req.body['budget'];
        target.envelopeId = parseInt(req.params.id);
        res.status(200).json(target);
        } else {
            res.status(400).send('Please enter title and budget');
        }
        
    } else {
        res.status(400).send('error');
    }
})

router.delete('/:id', (req, res) => {
    const filteredArr = envelopes.filter((element) => JSON.stringify(element.envelopeId) !== req.params.id)
   console.log(filteredArr)
    if(filteredArr) {
        envelopes = filteredArr;
        res.status(201).send('Element removed');
    } else {
        res.status(401).send('Error');
    }
})

router.post('/transfer/:from/:to', (req, res) => {
    const transferFrom = envelopes.find((element) => JSON.stringify(element.envelopeId) === req.params.from);
    const transferTo = envelopes.find((element) => JSON.stringify(element.envelopeId) === req.params.to);
    if(transferFrom && transferTo) {
        const value = req.header('transfer_value');
        if(value) {
            transferFrom.budget -= parseInt(value);
            transferTo.budget += parseInt(value);
            return res.status(200).json({value: value})
        }

    }
    res.status(400).send(JSON.stringify(req.headers));
    
    
})
module.exports = router