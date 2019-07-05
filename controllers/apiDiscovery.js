const IBMCloudEnv = require('../configuration/env');

const discovery_credentials = IBMCloudEnv.getDictionary("discovery_credentials");
const discovery_environments = IBMCloudEnv.getDictionary("discovery_environments");

const ENVIRONMENT = discovery_environments.find(x => x.name == "<NOMBRE_DE_ENVIRONMENT>"); // cambiar el nombre de la const 'ENVIRONMENT' por '{nombre-environment-a-consultar}_ENVIROMENT' y también cambiar <NOMBRE_DE_ENVIRONMENT> por el nombre identificador en el archivo /localdev/env.json
const COLLECTION = ENVIRONMENT.collections.find(x => x.name == "<NOMBRE_DE_COLLECTION>"); // cambiar el nombre de la const 'COLLECTION' por '{nombre-collection-a-consultar}_COLLECTION' y también cambiar <NOMBRE_DE_COLLECTION> por el nombre identificador en el archivo /localdev/env.json

var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
    version: '2018-12-03',
    iam_apikey: discovery_credentials.apikey,
    url: discovery_credentials.url
});


async function queryCollection(req, res) { // cambiar 'Collection' por el nombre de la colección a consultar.

    var environment_id = ENVIRONMENT.environment_id; //cambiar por el nombre de la constante editado en la linea 6
    var collection_id = COLLECTION.collection_id; //cambiar por el nombre de la constante editado en la linea 7
    
    var intencionDetectada = req.intencionDetectada;

    var params = {
        environment_id: environment_id,
        collection_id: collection_id,
        natural_language_query: req.body.query,
        passages: true
            //query: "",
            //filter: "",
            //count: "",
            //offset: "",
            //sort: "",
            //aggregation: ""
    };

    query(params)
        .then(function(result) {
            result.detectedIntent = intencionDetectada;
            console.log(result);
            return res.status(200).json(result);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(err.code).send(err);
        });

};

async function query(params) {
    return new Promise(function(resolve, reject) {

        discovery.query(params, function(err, result) {

            if (err) {
                console.log(JSON.stringify(err, null, 2));
                reject(err);
            } else {
                resolve(result);
            }

        });

    });
}


module.exports = {
    queryCollection //cambiar el nombre editado de la función de la línea 18
}