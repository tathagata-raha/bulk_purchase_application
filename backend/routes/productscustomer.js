const router = require('express').Router();
let Productc = require('../models/productc.model');
let users = require('../models//user.model')

router.route('/').get((req, res) => {
    Productc.find()
        .then(products => res.json(products))
        .then(text => console.log(text))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const product_name = req.body.product_name;
    const productv_id = req.body.productv_id;
    const vendor = req.body.vendor;
    const price = Number(req.body.price);
    const quantity_ordered = Number(req.body.quantity_ordered);
    const customer = req.body.customer;
    const state = req.body.state;
    const rating = 0;
    const comment = "";

    const newProductc = new Productc({
        product_name,
        productv_id,
        vendor,
        price,
        quantity_ordered,
        customer,
        state,
        rating,
        comment
    });


    newProductc.save()
        .then(() => res.json('Productc added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Productc.findByIdAndDelete(req.params.id)
        .then(() => res.json('Productc deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Productc.findById(id, function (err, product) {
        res.json(product);
    });
});

router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Productc.findById(id, function (err, product) {
        res.json(product);
    });
});

router.route('/update/:id').post((req, res) => {
    Productc.findById(req.params.id)
        .then(product => {
            product.product_name = req.body.product_name;
            product.vendor = req.body.vendor;
            product.price = Number(req.body.price);
            product.quantity_ordered = Number(req.body.quantity_ordered);
            product.customer = req.body.customer;
            product.state = req.body.state;
            product.save()
                .then(() => res.json('Productc updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/find/:name').get((req, res) => {
    Productc.find({ product_name: req.params.name })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendor/:name').get((req, res) => {
    Productc.find({ vendor: req.params.name })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendorreviews/:name').get((req, res) => {
    Productc.find({ vendor: req.params.name , state:"Dispatched"})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/findcustomer/:name').get((req, res) => {
    Productc.find({ customer: req.params.name })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/distinct/customer').get((req, res) => {
    users.find({ cclass: false }).distinct('username')
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/rating/:id').post(async (req, res) => {
    Productc.update({ _id: req.params.id },
        { rating: req.body.rating }, { multi: true })
        .then(productc => { res.json(productc) })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/comment/:id').post(async (req, res) => {
    Productc.update({ _id: req.params.id },
        { comment: req.body.comment }, { multi: true })
        .then(productc => { res.json(productc) })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;