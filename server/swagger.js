const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.cjs'];

swaggerAutogen(outputFile, endpointsFiles);