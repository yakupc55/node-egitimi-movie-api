const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://yakupc55:abc12345@cluster0-shard-00-00-y0tjq.mongodb.net:27017,cluster0-shard-00-01-y0tjq.mongodb.net:27017,cluster0-shard-00-02-y0tjq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true } );
    mongoose.connection.on('open',()=>{
        console.log('MongoDB : connected');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB : eror',err);
    });

    mongoose.Promise = global.Promise;
};