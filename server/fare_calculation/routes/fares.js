const router = require('express').Router();
let Fare = require('../models/fare.model');

//GET add fare details
router.route('/').get((req, res) => {
    Fare.find()
        .then(fares => res.json(fares))
        .catch(err => res.status(400).json('Error: ' + err));
});

//ADD new fare details
router.route('/addFare').post((req, res) => {
    const userId = req.body.userId;
    const source = req.body.source;
    const destination = req.body.destination;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    const fareAmount = req.body.fareAmount;

    const newFare = new Fare({
        userId,
        source,
        destination,
        duration, 
        date,
        fareAmount
    });

    newFare.save()
        .then(() => res.json('Fare Added!'))
        .catch(() => res.status(400).json('Error: ' + err));

});

//GET fare details by id 
router.route('/:id').get((req,res) => {
    Fare.findById(req.params.id)
        .then(fare => res.json(fare))
        .catch(err => res.status(400).json('Error: ' + err));
})

//DELETE fare details
router.route('/:id').delete((req,res) => {
    Fare.findByIdAndDelete(req.params.id)
        .then(fare => res.json('Fare details deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//UPDATE fare details
router.route('/update/:id').post((req,res) => {
    Fare.findById(req.params.id)
        .then(fare => {
            fare.userId = req.body.userId;
            fare.source = req.body.source;
            fare.destination = req.body.destination;
            fare.duration = req.body.duration;
            fare.date = req.body.date;
            fare.fareAmount = req.body.fareAmount;

            fare.save()
                .then(() => res.json('Fare Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;