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
            rl.question("Entrez le nom du collègue à rechercher\n", (nomRecherche) => {
                console.log("Recherche en cours du nom " + nomRecherche);
                service.rechercherCollegueParNom(nomRecherche, (collegues) => {
                    console.log("Les collègues suivants " + nomRecherche + " ont été trouvés:");
                    for (var i = 0; i < collegues.length; i++) {
                        let collegue = collegues[i];
                        console.log(collegue["nom"] +" " + collegue["prenoms"] + " (" + collegue["dateDeNaissance"] + ")");
                    };

                } );
                start();
            });
        }

        else if (choice === "99") {
            console.log("Au revoir!");
            process.exit();
        }
    });
}

run();