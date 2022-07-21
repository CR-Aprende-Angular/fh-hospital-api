const { Schema, model } = require('mongoose');

const ContactSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    }
});


ContactSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


module.exports = model( 'Contact', ContactSchema );
