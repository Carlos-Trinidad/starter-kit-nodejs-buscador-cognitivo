# Starter kit - Demo Buscador Cognitivo.

(Creo que esto todavia anda)
Este es un starter kit de un Buscador Cognitivo utilizando Watson Discovery como motor de busqueda y Watson Assistant como detector de intenciones.

# Proceso de puesta a punto del código:

1. Instala las dependencias

```
  npm install
```

2. Comenzaremos a agregar las variables de ambiente. 
   Primero vamos al archivo mapping.json. Este archivo va a "buscar" las variables de ambiente necesarias entendiendo cuando se desarrolla local y cuando la aplicación está en IBM Cloud.

   Agregaremos el nombre de nuestras instancias de Assistant y Discovery en las líneas 4 y 16 del archivo:

   (Por más información sobre cómo funciona este archivo ----> [IBM-CLOUD-ENV](https://github.com/ibm-developer/ibm-cloud-env))

```
  Línea 4: "cloudfoundry:$.*[?(@.name == 'nombre-instancia-discovery')].credentials"

  Línea 16: "cloudfoundry:$.*[?(@.name == 'nombre-instancia-assistant')].credentials"
```

3. Ahora agregaremos las variables de ambiente local, que luego también utilizaremos el mismo formato cuando estemos en la nube, por lo que es importante realizar este paso.

Nos dirigiremos a la carpeta /localdev y copiaremos el archivo "env.example.json" pero lo renombraremos por "env.json".

Una vez hecho esto, comenzaremos a ingresar nuestras variables de ambiente.

Como podemos tener varios environments y varias collections es necesario que agregemos un nombre como identificador de cada una, para luego a través del código poder referirnos al environment y collection que queremos.

```
  {
    "discovery": {
        "credentials": {
            "apikey": "",
            "url": ""
        },
        "environments": [
            {
                "name": "",
                "environment_id": "",
                "collections": [
                    {
                        "name": "",
                        "collection_id": ""
                    }
                ]
            }
        ]
    },
    "assistant": {
        "credentials": {
            "apikey": "",
            "url": ""
        },
        "assistant_id": ""
    }
}

```

4. Editando nuestro código.

A continuación iremos al archivo controllers/apiDiscovery.js y comenzaremos a editar las líneas siguientes:

```
Línea 6: const ENVIRONMENT = discovery_environments.find(x => x.name == "<NOMBRE_DE_ENVIRONMENT>"); // cambiar el nombre de la const 'ENVIRONMENT' por '{nombre-environment-a-consultar}_ENVIROMENT' y también cambiar <NOMBRE_DE_ENVIRONMENT> por el nombre identificador en el archivo /localdev/env.json

Línea 7: const COLLECTION = ENVIRONMENT.collections.find(x => x.name == "<NOMBRE_DE_COLLECTION>"); // cambiar el nombre de la const 'COLLECTION' por '{nombre-collection-a-consultar}_COLLECTION' y también cambiar <NOMBRE_DE_COLLECTION> por el nombre identificador en el archivo /localdev/env.json

Línea 18: async function queryCollection(req, res) { // cambiar 'Collection' por el nombre de la colección a consultar.

Línea 20: var environment_id = ENVIRONMENT.environment_id; //cambiar por el nombre de la constante editado en la linea 6

Línea 21: var collection_id = COLLECTION.collection_id; //cambiar por el nombre de la constante editado en la linea 7

Línea 70: queryCollection //cambiar el nombre editado de la función de la línea 18
```

Luego de esto iremos al archivo routes/routes.js y editaremos la línea siguiente:

```
Línea 6: router.post('/query', middlewareAssistant.detectarIntencion, apiDiscovery.queryCollection); //cambiar el nombre "queryCollection" por el nombre de la función que editamos en controllers/apiDiscovery.js
```

4. Editando nuestro manifest.yml.

Para hacer deploy a nuestra aplicación a IBM Cloud vamos a precisar editar nuestro manifest.yml

Agregaremos el valor de las variables: <NOMBRE_ENVIROMENT>, <ENVIROMENT_ID>, <NOMBRE_COLLECTION>, <COLLECTION_ID> y <ASSISTANT_ID>. Estos nombres y valores son los mismos que utilizamos e ingresamos en localdev/env.json en el punto 3.

También agregaremos los nombres del servicio de discovery y assistant. Estos nombres son los mismos que utilizamos en el punto 2.

Y por último cambiamos el "name" de nuestra aplicación.

```
applications:
  - name: 'starter-kit-nodejs-buscador-cognitivo'
    memory: 256M
    instances: 1
    services:
      - NOMBRE_SERVICIO_DISCOVERY
      - NOMBRE_SERVICIO_ASSISTANT
    env:
      discovery_environments: '[{"name": "<NOMBRE_ENVIRONMENT>","environment_id": "<ENVIRONMENT_ID>","collections": [{"name": "<NOMBRE_COLLECTION>","collection_id": "<COLLECTION_ID>"}]}]'
      assistant_id: '<ASSISTANT_ID>'
```

5. Ya esta todo listo. Con esta configuración el proyecto debería quedar funcionando. 

Si todavía no funciona, vuelva a leer esta guía desde el punto 1.

Si todavía no funciona, comienza a debuguear, comprender y analizar el código para intentar arreglalo como puedas. Buena suerte...