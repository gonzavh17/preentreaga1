import { __dirname } from "../path.js"
import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Documentacion del curso de Back-end',
        description: 'API Coderhouse Back-end'
      }
    },
    apis: [`${__dirname}/docs/**/*.yaml` ]
  };
export const specs = swaggerJSDoc(swaggerOptions)