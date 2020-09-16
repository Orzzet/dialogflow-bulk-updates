const dialogflow = require('dialogflow');
const fs = require('fs');
const KEY_PATH = 'secret/dialogflow-secret.json';
const projectId = JSON.parse(fs.readFileSync(KEY_PATH))['project_id'];

const intentsClient = new dialogflow.IntentsClient({ keyFilename: KEY_PATH });

module.exports = {
    async getIntents(languageCode) {
        // The path to identify the agent that owns the intents.
        const projectAgentPath = intentsClient.projectAgentPath(projectId);
        const request = { parent: projectAgentPath, intentView: 1, languageCode };
        const [response] = await intentsClient.listIntents(request);
        return response;
    },
    async updateIntents(languageCode, intents) {
        const projectAgentPath = intentsClient.projectAgentPath(projectId);

        const [operation] = await intentsClient.batchUpdateIntents({
            parent: projectAgentPath,
            languageCode: languageCode,
            intentBatchInline: {intents}
        });
        const [response] = await operation.promise();
        return response;

    }
};
