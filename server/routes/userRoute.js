var express = require('express');
var router = express.Router();

let Trap = require('../models/Trap');
let bisec = require('../models/bisec');
let falsee = require('../models/falsee');
let onepointt = require('../models/onepointt');
let newtonn = require('../models/newtonn');
let secantt = require('../models/secantt');
let compositetrap = require('../models/compositetrap');
let simson = require('../models/simson');
let compositesim = require('../models/compositesim');
let forward = require('../models/forward');
let backward = require('../models/backward');
let central = require('../models/central');
/* GET users listing. */

/////////////////////////////////////////////////////////////

router.get('/showtrap', function(req, res, next) {
 
  Trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/trap',(req,res)=>{
  console.log(req.body);
  let doc = new Trap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showbisec', function(req, res, next) {
 
  bisec.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/bisec',(req,res)=>{
  console.log(req.body);
  let doc = new bisec(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showfalsee', function(req, res, next) {
 
  falsee.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/falsee',(req,res)=>{
  console.log(req.body);
  let doc = new falsee(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showfalsee', function(req, res, next) {
 
  falsee.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/falsee',(req,res)=>{
  console.log(req.body);
  let doc = new falsee(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showonepointt', function(req, res, next) {
 
  onepointt.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/onepointt',(req,res)=>{
  console.log(req.body);
  let doc = new onepointt(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showonepointt', function(req, res, next) {
 
  onepointt.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/onepointt',(req,res)=>{
  console.log(req.body);
  let doc = new onepointt(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/shownewtonn', function(req, res, next) {
 
  newtonn.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/newtonn',(req,res)=>{
  console.log(req.body);
  let doc = new newtonn(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showsecantt', function(req, res, next) {
 
  secantt.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/secantt',(req,res)=>{
  console.log(req.body);
  let doc = new secantt(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showcompositetrap', function(req, res, next) {
 
  compositetrap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/compositetrap',(req,res)=>{
  console.log(req.body);
  let doc = new compositetrap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showsimson', function(req, res, next) {
 
  simson.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/simson',(req,res)=>{
  console.log(req.body);
  let doc = new simson(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showcompositesim', function(req, res, next) {
 
  compositesim.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/compositesim',(req,res)=>{
  console.log(req.body);
  let doc = new compositesim(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showforward', function(req, res, next) {
 
  forward.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/forward',(req,res)=>{
  console.log(req.body);
  let doc = new forward(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showbackward', function(req, res, next) {
 
  backward.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/central',(req,res)=>{
  console.log(req.body);
  let doc = new central(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
router.get('/showcentral', function(req, res, next) {
 
  central.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/central',(req,res)=>{
  console.log(req.body);
  let doc = new central(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
/////////////////////////////////////////////////////////////

module.exports = router;
