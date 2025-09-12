const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition:{
    openapi:'3.0.0',
    info:{title:'MS Controle de Vacinas',version:'1.0.0',description:'API RESTful para controle de vacinas e estoque'},
    servers:[{url:'http://localhost:3001'}]
  },
  apis:['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
