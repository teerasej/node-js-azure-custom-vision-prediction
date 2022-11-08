require('dotenv').config();
const util = require('util');
const fs = require('fs');
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");


const publishIterationName = process.env.publishIterationName;
const projectId = process.env.projectId;

const predictionKey = process.env.predictionKey;
const predictionResourceId = process.env.predictionResourceId;
const predictionEndpoint = process.env.predictionEndpoint;

const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);


(async () => {
    const testFile = fs.readFileSync(`Test/sushi/sushi_1.jpg`);

    const results = await predictor.detectImage(projectId, publishIterationName, testFile);
    
    // Show results
    console.log("Results:");
    results.predictions.forEach(predictedResult => {
        if(predictedResult.probability > 0.5) {
            console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
        }
    });
})()