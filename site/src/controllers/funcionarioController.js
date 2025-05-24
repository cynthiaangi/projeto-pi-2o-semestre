var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
  funcionarioModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  listar,
};
