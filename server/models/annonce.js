const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const annonceSchema = new Schema({
    Titre: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    addingDate : {
        type: Date,
        required: true,
    },
    deleteDate : {
        type: Date,
        required: true,},
        
        modifyDate : {
            type: Date,
            required: true,        
    },  
    startDate : {
        type: Date,
        required: true,
    },
    
    endDate : {
            type: Date,
            required: true,        
    },
    État: {
        type: String,
        
    }
});

const annonce = mongoose.model('annonce', annonceSchema);

module.exports = annonce;
