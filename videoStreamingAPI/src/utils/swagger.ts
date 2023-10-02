import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `Video Streaming API Docs`,
      version: `1.0.0`,
    },
  },
  apis: [
    "./src/routes/*.ts",
    "./src/routes/*.js",
    "./src/routes/*/*.ts",
    "./src/routes/*/*.js",
    "./src/models/*.ts",
    "./src/models/*.js",
    "./src/models/*/*.ts",
    "./src/models/*/*.js",
  ],
};

// Hide Schema in the UI
const swaggerCustomOptions = {
  customCss: ".swagger-ui section.models { visibility: hidden;}",
};
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: any, port: number) => {
  // Swagger page

  app.use('/api-doc', serve, setup(swaggerSpec, swaggerCustomOptions));

  // Docs in JSON format

  app.get("docs.json", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
