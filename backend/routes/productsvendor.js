const router = require('express').Router();
let Productv = require('../models/productv.model');
let Productc = require('../models/productc.model');
let users = require('../models//user.model')

router.route('/').get((req, res) => {
    Productv.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const product_name = req.body.product_name;
    const vendor = req.body.vendor;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const quantity_sold = Number(req.body.quantity_sold);
    const state = req.body.state;
    const quantity_left = Number(req.body.quantity) - Number(req.body.quantity_sold);

    const newProductv = new Productv({
        product_name,
        vendor,
        price,
        quantity,
        quantity_sold,
        quantity_left,
        state
    });


    newProductv.save()
        .then(() => res.json('Productv added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Productv.findByIdAndDelete(req.params.id)
        .then(() => res.json('Productv deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Getting a product by id
router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Productv.findById(id, function (err, product) {
        res.json(product);
    });
});

router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Productv.findById(id, function (err, product) {
        res.json(product);
    });
});

router.route('/update/:id').post((req, res) => {
    Productv.findById(req.params.id)
        .then(product => {
            product.product_name = req.body.product_name;
            product.vendor = req.body.vendor;
            product.price = Number(req.body.price);
            product.quantity = Number(req.body.quantity);
            product.quantity_sold = Number(req.body.quantity_sold);
            product.quantity_left = Number(req.body.quantity) - Number(req.body.quantity_sold);
            product.state = req.body.state;

            product.save()
                .then(() => res.json('Productv updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/find/:name').get((req, res) => {
    Productv.find({ product_name: req.params.name })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findfuzzy/:name').get((req, res) => {
    Productv.find({ product_name: {$regex: new RegExp(req.params.name)} })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/findlisted/:name').get((req, res) => {
    Productv.find({ product_name: req.params.name, state: "Listed" })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findlistedfuzzy/:name').get((req, res) => {
    Productv.find({ product_name: {$regex: new RegExp(req.params.name)}, state: "Listed" })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findlisted/:name/sortp').get((req, res) => {
    Productv.find({ product_name: req.params.name, state: "Listed" }).sort({price:'desc'})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findlistedfuzzy/:name/sortp').get((req, res) => {
    Productv.find({ product_name: {$regex: new RegExp(req.params.name)}, state: "Listed" }).sort({price:'desc'})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findlistedfuzzy/:name/sortq').get((req, res) => {
    Productv.find({ product_name: {$regex: new RegExp(req.params.name)}, state: "Listed" }).sort({quantity_left:'desc'})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findlisted/:name/sortq').get((req, res) => {
    Productv.find({ product_name: req.params.name, state: "Listed" }).sort({quantity_left:'desc'})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendor/:name').get((req, res) => {
    Productv.find({ vendor: req.params.name })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/distinct/vendor').get((req, res) => {
    users.find({ cclass: true }).distinct('username')
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendor/:name/listed').get((req, res) => {
    Productv.find({ vendor: req.params.name, state: "Listed" })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendor/:name/ready').get((req, res) => {
    Productv.find({ vendor: req.params.name, state: "Ready" })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findvendor/:name/dispatched').get((req, res) => {
    Productv.find({ vendor: req.params.name, state: "Dispatched" })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/changelisted').post(async (req, res) => {
    Productv.update({ quantity_left: 0, state: "Listed" },
        { state: "Ready" },
        { multi: true })
        .then(product => { res.json(product) })
        .catch(err => res.status(400).json('Error: ' + err));
    const result = await (Productv.find({ state: "Ready" }).distinct('_id'))
    result.forEach(e => {
        Productc.update({ productv_id: e._id },
            { state: "Placed" }, { multi: true })
            .then(productc => { res.json(productc) })
            .catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/changeplaced/:id').post(async (req, res) => {
    Productv.findById(req.params.id)
        .then(product => {
            product.product_name = req.body.product_name;
            product.vendor = req.body.vendor;
            product.price = Number(req.body.price);
            product.quantity = Number(req.body.quantity);
            product.quantity_sold = Number(req.body.quantity_sold);
            product.quantity_left = Number(req.body.quantity) - Number(req.body.quantity_sold);
            product.state = req.body.state;

            product.save()
                .then(() => res.json('Productv updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

})
router.route('/changeplaced2/:id').post(async (req, res) => {
    Productc.update({ productv_id: req.params.id },
        { state: "Dispatched" }, { multi: true })
        .then(productc => { res.json(productc) })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/cancel/:id').post(async (req, res) => {
    Productv.update({ _id: req.params.id },
        { state: "Cancelled" }, { multi: true })
        .then(productv => { res.json(productv) })
        .catch(err => res.status(400).json('Error: ' + err))
    Productc.update({ productv_id: req.params.id },
        { state: "Cancelled" }, { multi: true })
        .then(productc => { res.json(productc) })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/getproducts/:id').get((req, res) => {
    Productc.find({ productv_id: req.params.id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;