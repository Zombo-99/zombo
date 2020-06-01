const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rapportSchema = new Schema({
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
        modifyDate : {
            type: Date,
            required: true,        
    },  
    validationDate : {
        type: Date,
        required: true,
    },
    
    deleteDate : {
        type: Date,
        required: true,        
},
    État: {
        type: String,
        
    }
});

const rapport = mongoose.model('rapport', rapportSchema);

module.exports = rapport;
