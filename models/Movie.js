const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
   title:{
       type: String,
        required : [true,'`{PATH}` alanı zorunludur.'],
       maxlength : [15, '`{PATH}` alanı `{MAXLENGTH}`  karekterden uzun olamaz. siz `{VALUE}` karekter girdiniz'],
       minlength: [4, '`{PATH}` alanı `{MINLENGTH}`  karekterden kısa olamaz. siz `{VALUE}` karekter girdiniz']

   },
    category:{
        type : String,
        maxlength : 30,
        minlength:1
    } ,
    country : {
        type : String,
        maxlength : 30,
        minlength:1
    },
    year: {
        type : Number,
        maxlength : 2040,
        minlength:1900
    },
    imdb_score: {
        type : Number,
        maxlength : 10,
        minlength:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('movie',MovieSchema);