/*
    Ruta: /api/contacts
*/
const { Router } = require('express');

const { getContacts, createContact, updateContact, deleteContact } = require('../controllers/contacts');

const { check } = require('express-validator');
/*const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');
 */

const router = Router();

router.get( '/', getContacts );
//router.get( '/', validarJWT , getUsuarios );

router.post( '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        //check('phone', 'El telefono es obligatorio').not().isEmpty(),
        //check('email', 'El email es obligatorio').isEmail()
        //validarCampos,
    ], 
    createContact
);

router.put( '/:id',
    [
        //validarJWT,
        //varlidarADMIN_ROLE_o_MismoUsuario,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El role es obligatorio').not().isEmpty()
        //validarCampos,
    ],
    updateContact
);

router.delete( '/:id', 
    //[ validarJWT, varlidarADMIN_ROLE ],
    deleteContact
);



module.exports = router;