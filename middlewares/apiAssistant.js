const IBMCloudEnv = require('../configuration/env');

const assistant_credentials = IBMCloudEnv.getDictionary("assistant_credentials");
const assistant_id = IBMCloudEnv.getDictionary("assistant_id").value;

const AssistantV2 = require('watson-developer-cloud/assistant/v2');

var assistant = new AssistantV2({
    iam_apikey: assistant_credentials.apikey,
    version: '2018-11-08'
});

function detectarIntencion(req, res, next) {

    var assistantId = assistant_id || '<assistant-id>';
    var textIn = req.body.query;

    createSession(assistantId)
        .then(function (session) {

            var payload = {
                assistant_id: assistantId,
                session_id: session.session_id,
                input: {
                    message_type: 'text',
                    text: textIn,
                    options: {
                        return_context: true,
                        debug: true
                    }
                }
            };

            // Send the input to the assistant service
            assistant.message(payload, function (err, data) {
                if (err) {
                    return res.status(err.code || 500).json(err);
                }

                console.log(JSON.stringify(data, null, 2));
                var intencionDetectada = data.output.intents[0];
                req.intencionDetectada = intencionDetectada;
                next();
            });
        })
        .catch(function (err) {
            console.log(err);
            return res.status(err.code).send(err);
        });
}


function createSession(assistantId) {
    return new Promise(function (resolve, reject) {
        assistant.createSession({
            assistant_id: assistantId,
        }, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}


module.exports = {
    detectarIntencion
}