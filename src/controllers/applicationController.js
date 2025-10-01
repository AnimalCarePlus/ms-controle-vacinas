const { applyVaccine } = require("../services/stockService");
const { applicationSchema } = require("../validators/applicationValidator");
const axios = require("axios");

const PRONTUARIO_URL = process.env.PRONTUARIO_SERVICE_URL;

exports.applyVaccine = async (req, res, next) => {
  try {
    
    const { error, value } = applicationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.error(
      "Erro de validação",
      400,
      error.details.map(d => d.message)
    );

    const { animalId } = value;

    
    try {
      const resp = await axios.get(`${PRONTUARIO_URL}/api/animais/${animalId}/exists`, {
        headers: { Authorization: req.headers.authorization },
      });
      const prontuarioAnimal = resp.data;
      if (!prontuarioAnimal.exists) {
        const err = new Error("Animal não encontrado no prontuário");
        err.status = 404;
        throw err;
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const error = new Error("Animal não encontrado no prontuário");
        error.status = 404;
        return next(error);
      }
      const error = new Error("Erro ao consultar ms-prontuario");
      error.status = 500;
      error.details = err.response?.data || err.message;
      return next(error);
    }

    
    const result = await applyVaccine(value);

    
    try {
      
      const animalIdInt = parseInt(animalId, 10);

      await axios.post(
        `${PRONTUARIO_URL}/api/animais/${animalIdInt}/exames`,
        {
          descricao: `Vacina aplicada: ${value.vaccineId}, lote: ${value.batchNumber}, dose: ${value.dose}`,
          imagem_url: value.imageUrl || "", 
        },
        {
          headers: { Authorization: req.headers.authorization },
        }
      );
    } catch (err) {
      console.error("Erro ao registrar no prontuário:", err.response?.data || err.message);
      return res.error("Vacina aplicada, mas falha ao registrar no prontuário", 500);
    }

    
    res.sucess(result, 201);

  } catch (err) {
    next(err); 
  }
};
