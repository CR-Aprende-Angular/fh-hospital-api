const { response } = require('express');
//const bcrypt = require('bcryptjs');

const Contact = require('../models/contact');
//const { generarJWT } = require('../helpers/jwt');


const getContacts = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ contacts, total ] = await Promise.all([
        Contact
            .find({}, 'name email phone img')
            .skip( desde )
            .limit( 5 ),

        Contact.countDocuments()
    ]);


    res.json({
        ok: true,
        contacts,
        total
    });

}


const createContact = async(req, res = response) => {

    //const { nombre, email, phone } = req.body;

    try {

        /*const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );*/
        const contact = new Contact( req.body );
    
        /*/ Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await usuario.save();*/
        await contact.save();

        // Generar el TOKEN - JWT
        //const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            contact
            //token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const updateContact = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const contactDB = await Contact.findById( uid );

        if ( !contactDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un contacto para ese id'
            });
        }

        // Actualizaciones
        //const { name, phone, email, ...campos } = req.body;

        /*if ( contactDB.email !== email ) {

            const existeEmail = await Contact.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un contacto con ese email'
                });
            }
        }
        
        /*if ( !usuarioDB.google ){
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }*/

        const chgContact = {
            ...req.body,
            id: uid
        }

        const updatedContact = await Contact.findByIdAndUpdate( uid, chgContact, { new: true } );

        res.json({
            ok: true,
            contact: updatedContact
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const deleteContact = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const contactDB = await Contact.findById( uid );

        if ( !contactDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }

        await Contact.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Contacto eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}


module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact /*,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario */
}