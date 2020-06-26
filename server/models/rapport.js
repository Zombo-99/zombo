const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('../helpers/foreign-key-helper');

const rapportSchema = new Schema({
    Titre: {
        type: String,
        required: true,
    },
    Description: {
        type: String,required: true
    },
    addingDate : {
        type: Date,

    },
        modifyDate : {
            type: Date,
            
    },  
    validationDate : {
        type: Date,
        
    },
    
    deleteDate : {
        type: Date,
               
},
      
updateDate : {
    type: Date,
           
},  État: {
        type: String,
        
    },
    Déclaration: [{
		type: Schema.ObjectId,
		ref: 'Déclaration',
		validate: {
		
			validator: function(v) {
				return FKHelper(mongoose.model('Déclaration'), v);
			},
			message: `Déclaration doesn't exist`
		}
}],
isvalidated: { 
    type: Boolean,
    
},user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});

const rapport = mongoose.model('rapport', rapportSchema);

module.exports = rapport;
