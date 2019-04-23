var request = require('request');

/*
function rechercherColleguesParNom(nomRecherche, callback) {
    request("https://pennecot-collegues-api.herokuapp.com/collegues?nom=" + nomRecherche, { json: true }, function (err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
}
*/

function rechercherColleguesParNom(nomRecherche, callback) {
    request("https://pennecot-collegues-api.herokuapp.com/collegues?nom=" + nomRecherche, { json: true }, function (err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
}

function rechercheCollegueParMatricule(matricule, callback) {
    console.log("matricule = " + matricule);
    request("https://pennecot-collegues-api.herokuapp.com/collegues/" + matricule, { json: true }, function (err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.rechercheCollegueParMatricule = rechercheCollegueParMatricule;