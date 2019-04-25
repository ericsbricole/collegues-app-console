var service = require("./service");
function start() {
    console.log("1. Rechercher un collègue par nom");
    console.log("99. Sortir");
    run();
}

exports.start = start;

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function run() {
    rl.question("", function (choice) {
        if (choice === "1") {
            rl.question("Entrez le nom du collègue à rechercher\n", nomRecherche => {
                console.log("Recherche en cours du nom " + nomRecherche);
                let collegues$ = service.rechercherCollegueParNom(nomRecherche)
                collegues$.then(collegues => {
                    console.log(`Les ${collegues.length} collègues suivants ${nomRecherche} ont été trouvés:`);
                    collegues.forEach(collegue => console.log(`${collegue["nom"]} ${collegue["prenoms"]}  (${collegue["dateDeNaissance"]})`));
                })
                    .catch(err => console.error(err));
                start();
            });
        }

        else if (choice == "2") {
            rl.question("Entrez le nom du collègue à créer\n", (nom) => {
                rl.question("Entrez les prénoms du collègue à créer\n", (prenoms) => {
                    rl.question("Entrez son email\n", (email) => {
                        rl.question("Entrez sa date de naissance au format yyyy-mm-dd\n", (dateDeNaissance) => {
                            rl.question("Entrez l'url de sa photo\n", (photoUrl) => {
                                service.creerCollegue(nom, prenoms, email, dateDeNaissance, photoUrl, (httpResp, body) => console.log("Code réponse = " + httpResp + " body = " + body), (err) => console.log(err))
                                    .then(success => console.log(`success = ${success}`))
                                    .catch(err => console.error(`error = ${error}`))
                                start();
                            })
                        })
                    })
                })
            })
        }

        else if (choice === "99") {
            console.log("Au revoir!");
            process.exit();
        }
    });
}

run();