module.exports = (err, req, res, next) => {
    console.error("Erro encontrado: ", err);

    res.status(err.status || 500).json({

        sucess: false,
        error: err.message || "Erro interno no servidor",

    });
};