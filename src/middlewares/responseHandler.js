module.exports = (req, res, next) => {

    res.sucess = (data, status = 200) =>{

        res.status(status).json({sucess: true, data});
    };

    res.error = (message, stauts = 400) => {
        res.status(status).json({sucess: false, error: message});
    };

    next();
};