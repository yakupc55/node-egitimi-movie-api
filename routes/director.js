const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');


router.post('/', (req, res,next)=> {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

router.get('/', (req, res)=> {
   const promise = Director.aggregate([
   {   $lookup : {
           from: 'movies',
           localField: '_id',
           foreignField: 'director_id',
           as: 'movies'
       }
   },
       {
           $unwind: {
               path : '$movies',
               preserveNullAndEmptyArrays: true
           }
       },
       {//gruplama yapmamızı sağlayan yapı
           $group:{
               _id:{
                   _id: '$_di',
                   name: '$name',
                   surname: '$surname',
                   bio: '$bio',
               },
               movies:{
                   $push: '$movies'
               }
           }
       },
       {//listelemenin nasıl yapılacağını burda yapıyoruz
           $project: {
               _id: '$_id._id',
               name: '$_id.name',
               surname: '$_id.surname',
                movies: '$movies'
           }
       }
   ]);
   promise.then((data)=>{
       res.json(data);
   }).catch((err)=>{
        res.json(err);
   });
});

router.get('/:director_id', (req, res)=> {
    const promise = Director.aggregate([
        {
          $match: {
              '_id' : mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {   $lookup : {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path : '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {//gruplama yapmamızı sağlayan yapı
            $group:{
                _id:{
                    _id: '$_di',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {//listelemenin nasıl yapılacağını burda yapıyoruz
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});


// güncelleme işlemi
router.put('/:director_id',(req, res,next)=> {
    //res.send(req.params.movie_id);
    const promise=Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {new: true}
    );
    promise.then((data)=>{
        if(!data)
            next({message : 'The director was not found', code : 1});
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

router.delete('/:movie_id',(req, res,next)=> {
    //res.send(req.params.movie_id);
    const promise=Movie.findByIdAndRemove(req.params.movie_id,);

    promise.then((data)=>{
        if(!data)
            next({message : 'The movie was not found', code : 1});
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});
module.exports = router;
