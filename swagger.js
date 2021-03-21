const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/index.js']
const doc = {
    info: {
        version: "1.0.0",
        title: "Chat APP",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:8080",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
	require('./src/index.js')
})