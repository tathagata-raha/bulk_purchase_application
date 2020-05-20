const router = require('express').Router();
let Userdata = require('../models/login.model');
const userid=""
router.route('/').get((req, res) => {
    Userdata.find()
      .then(products => res.json(products))
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add/:name').post((req, res) => {
    const username = req.params.name;
    const newUserdata = new Userdata({
        username
    });
    newUserdata.save()
    .then(() => res.json('Userdata added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/addempty').post((req, res) => {
    const username ="";
    const cclass =true;
    const newUserdata = new Userdata({
        username,
        cclass
    });
    newUserdata.save()
    .then(() => {res.json('Userdata added!')
})
    .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/clear').post((req, res) => {
    Userdata.update({},{username:""})
    .then(user => { res.json(user) })
      .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/update/:name/:class').post((req, res) => 
    
    {if(req.params.class=='v')
        {Userdata.update({},{username:req.params.name,class:true})
        .then(user => { res.json(user) })
        .catch(err => res.status(400).json('Error: ' + err));}
        else{
            Userdata.update({},{username:req.params.name,class:false})
        .then(user => { res.json(user) })
        .catch(err => res.status(400).json('Error: ' + err));
        }
    }
);
    // Userdata.findById("5e4dba173ff79f276565e1d5")
    //     .then(user => {
    //         user.username=req.params.name;
    //         if(req.params.class=='v')
    //         {
    //         user.class=true
    //         }else{
    //         user.class=false
    //         }user.save()
    //         .then(() => res.json('Userdata updated!'))
    //         .catch(err => res.status(400).json('Error: ' + err));
    //   })
    //   .catch(err => res.status(400).json('Error: ' + err));
    // });


    module.exports = router;