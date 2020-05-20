const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/findc/:name').get((req, res) => {
    let name= req.params.name;
    User.find({'username':name,'cclass':false})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/findv/:name').get((req, res) => {
    let name= req.params.name;
    User.find({'username':name,'cclass':true})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Adding a new user
router.route('/add').post((req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error' + err);
        });
});

// Getting a user by id
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;