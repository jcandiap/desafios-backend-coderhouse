export const validateRegister = async (req, res, next) => {
    if( !Boolean(req.body?.id) && req.body?.id === '' ) {
        res.status(500).send({ status: 'error', message: 'El correo es requerido' });
    } else if( !Boolean(req.body?.alias) && req.body?.alias === '' ) {
        res.status(500).send({ status: 'error', message: 'El alias es requerido' });
    } else if( !Boolean(req.body?.nombre) && req.body?.nombre === '' ) {
        res.status(500).send({ status: 'error', message: 'El nombre es requerida' });
    } else if( !Boolean(req.body?.apellido) && req.body?.apellido === '' ) {
        res.status(500).send({ status: 'error', message: 'El apellido es requerido' });
    } else if( !Boolean(req.body?.edad) && req.body?.edad === '' ) {
        res.status(500).send({ status: 'error', message: 'La edad es requerida' });
    } else if( !Boolean(req.body?.password) && req.body?.password === '' ) {
        res.status(500).send({ status: 'error', message: 'La contraseña es requerida' });
    } else {
        next();
    }
}

export const validateLogin = async (req, res, next) => {
    if( !Boolean(req.body?.id) && req.body?.id === '' ) {
        res.status(500).send({ status: 'error', message: 'El correo es requerido' });
    } else {
        next();
    }
}