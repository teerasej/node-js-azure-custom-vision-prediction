const util = require('util');
const fs = require('fs');
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const publishIterationName = "Iteration5";
const projectId = "93395755-61d4-44ce-89b6-33ccb17c63b9";

const predictionKey = "e64f898565724f03a83287b0121b96e6";
const predictionResourceId = "/subscriptions/17a8d214-246e-4828-9bc4-d4304921e2c4/resourceGroups/dotnetconf/providers/Microsoft.CognitiveServices/accounts/webinar_custom_vision";
const predictionEndpoint = "https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/93395755-61d4-44ce-89b6-33ccb17c63b9/detect/iterations/Iteration5/image";

const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);


(async () => {
    const testFile = fs.readFileSync(`Test/sushi/sushi_2.jpg`);

    const results = await predictor.detectImage(projectId, publishIterationName, testFile);
    
    // Show results
    console.log("Results:");
    results.predictions.forEach(predictedResult => {
        if(predictedResult.probability > 0.5) {
            console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
        }
    });
})()