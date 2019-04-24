var request = require('request');

function rechercherCollegueParNom(nomRecherche, callback) {
    request("https://pennecot-collegues-api.herokuapp.com/collegues?nom=" + nomRecherche, { json: true }, function (err, res, body) {
        var tableauMatriculesTrouves = body;
        var tableauColleguesTrouves = [];
        for (var i = 0; i < tableauMatriculesTrouves.length; i++) {
            rechercheCollegueParMatricule(tableauMatriculesTrouves[i], (collegueTrouve) => {
                tableauColleguesTrouves.push(collegueTrouve);
                if (tableauColleguesTrouves.length === tableauMatriculesTrouves.length)
                    callback(tableauColleguesTrouves);
            });
        }
    });
}

function rechercheCollegueParMatricule(matricule, callback) {
    request("https://pennecot-collegues-api.herokuapp.com/collegues/" + matricule, { json: true }, function (err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
}

exports.rechercherCollegueParNom = rechercherCollegueParNom;
exports.rechercheCollegueParMatricule = rechercheCollegueParMatricule;