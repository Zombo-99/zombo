const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DéclarationSchema = new Schema({
    Titre: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Adresse: {
        type: String,
        required: true,
    },
    CordonnéesGPS: {
        type: String,
        

        
    },
    addingDate : {
        type: Date,
     
    },
        modifyDate : {
            type: Date,
            
    },
    Priorité: {
        type: String,
        
    }, 
    État: {
        type: String,
        
    }
});

const Déclaration = mongoose.model('Déclaration', DéclarationSchema);

module.exports = Déclaration;
