var Api = (function () {
    var data;
    var queryEndpoint = '/api/query';

    // Publicly accessible methods defined
    return {
        postJsonAsync: postJsonAsync,

        setData: function (dataNew) {
            data = JSON.parse(dataNew);
        },
        getData: function () {
            return data;
        }
    };

    function post(body, bodyType, async) {
        $.ajax({
            async: async, type: 'post', url: queryEndpoint, data: body, contentType: bodyType,
            success: successCallOut, error: function (xhr, status, error) {
                console.log("-----------Error Api POST " + queryEndpoint + "------------------");
                console.log("Body: \"" + bodyType + "\" " + body);
                console.log("Status: " + status);
                console.log("Error: " + error);
                console.log(xhr);
                console.log("---------------End Error----------------");
            }
        });
    }
    function postJson(body, async) {
        return this.post(body, "application/json", async);
    }
    function postJsonSync(body) {
        return this.post(body, "application/json", false);
    }
    function postJsonAsync(body) {
        return post(body, "application/json", true);
    }



    // Aqui es donde trabajaremos con los resultados de la petición, por ejemplo tu haces la peticion a /productos y la redirijes a la funcion ProcesarProductos(), mi ejemplo es /news/last
    function successCallOut(data) {
        console.log("API GET/POST SUCCESS");
        console.log(data);
        Api.setData(JSON.stringify(data));
        $("#content-result").children(" section ").remove();
        if (data.detectedIntent) {
            var confianza = traerConfianza(data.detectedIntent.confidence);
            $("#myModal").children(".modal-content").append("<p class='noborder'>Intención detectada: <span class='tag-result'>#" + data.detectedIntent.intent + "</span> </br>" + confianza + "% Confidence <em>(" + data.detectedIntent.confidence + ")</em></p>")
        }
        else {
            $("#myModal").children(".modal-content").append("<p class='noborder'>Intención no detectada</p>")
        }
        data.results.forEach(element => {
            $("#content-result").append($("<section><h3>" + element.extracted_metadata.filename + "</h3><p>" + element.text + "</p><p><b>Confidence:</b> " + element.result_metadata.confidence + "</p><a href='#'>" + element.extracted_metadata.title + "</a></section>"));
        });
    };

    function traerConfianza(confidence) {
        if (confidence == 1) {
            return 100;
        }
        else if (confidence < 1 && confidence > 0) {
            var confidenceFixed = confidence.toFixed(2);
            var confidenceSplit = confidenceFixed.split(".");
            if(confidenceSplit[0] == 1){
                return 100;
            }
            else{
                return confidenceSplit[1];
            }
        }
        else {
            return 0;
        }
    }
}());