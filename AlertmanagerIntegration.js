class Script {
    process_incoming_request({
        request
    }) {
        console.log(request.content);

        var alertColor = "warning";
        if (request.content.status == "resolved") {
            alertColor = "good";
        } else if (request.content.status == "firing") {
            alertColor = "danger";
        }

        let finFields = [];
        for (i = 0; i < request.content.alerts.length; i++) {
            var endVal = request.content.alerts[i];
            var elem = {
                title: "Alerta: " + endVal.labels.alertname,
                value: "*Instância:* " + endVal.labels.instance,                
                short: false                
            };

          	var separador = {
                title: "____________________________",
                value: "",                
                short: false                
            };
          
            finFields.push(separador);
          
            finFields.push(elem);

            if (!!endVal.annotations.message) {
                finFields.push({
                    title: "Mensagem",
                    value: endVal.annotations.message
                });
            }

            if (!!endVal.labels.severity) {
                finFields.push({
                    title: "Severidade",
                    value: endVal.labels.severity
                });
            }

            if (!!endVal.labels.pod) {
                finFields.push({
                    title: "Pod",
                    value: endVal.labels.pod
                });
            }
        }

        return {
            content: {
                username: "Prometheus Alert",
                attachments: [{
                    color: alertColor,
                    title_link: request.content.externalURL,
                    title: "Prometheus notification",
                    fields: finFields
                }]
            }
        };

        return {
            error: {
                success: false
            }
        };
    }
}
