const request = require('request-promise-native');

function rechercherCollegueParNom(nomRecherche) {

    return new Promise((resolve, reject) => {
        tabCollPromises = [];
        const matricules$ = request(`https://pennecot-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true })
        matricules$.then(matricules => {
            matricules.forEach(matricule => {
                tabCollPromises.push(rechercheCollegueParMatricule(matricule));
            });
            Promise.all(tabCollPromises).then(collegues => resolve(collegues))
                .catch(err => reject(`Au moins un collegue n'a pas pu êtreUne erreur au code ${err.statusCode} est arrivée`));
        })
            .catch(err => reject(`Une erreur au code ${err.statusCode} est arrivée`));
    });
}

function rechercheCollegueParMatricule(matricule) {
    return new Promise((resolve, reject) => {
        request(`https://pennecot-collegues-api.herokuapp.com/collegues/${matricule}`, { json: "true" })
            .then(collegue => resolve(collegue))
            .catch(err => reject(`Une erreur au code ${err.statusCode} est arrivée`))
    });
}

function creerCollegue(nom, prenoms, email, dateDeNaissance, photoUrl) {


    let options = {
        method: 'POST',
        uri: "https://pennecot-collegues-api.herokuapp.com/collegues/",
        body: {
            "nom": nom,
            "prenoms": prenoms,
            "email": email,
            "dateDeNaissance": dateDeNaissance,
            "photoUrl": photoUrl
        },
        json: true // Automatically stringifies the body to JSON
    };

    return request(options);
}
exports.rechercherCollegueParNom = rechercherCollegueParNom;
exports.rechercheCollegueParMatricule = rechercheCollegueParMatricule;
exports.creerCollegue = creerCollegue;