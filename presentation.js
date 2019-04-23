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
            console.log("Recherche en cours du nom xxx");
            //service.rechercherColleguesParNom("Astier", (matricule) => console.log("matricule = " + matricule) );
            service.rechercherColleguesParNom("Astier", (matricule) => service.rechercheCollegueParMatricule(matricule, (collegue) => console.log(collegue["nom"] + "(" + collegue["dateDeNaissance"] + ")") ));
            service.rechercherColleguesParNom("Astier", (matricule) => console.log("matricule = " + matricule) );
            run();
        }
        else if (choice === "99") {
            console.log("Au revoir!");
            process.exit();
        }
    });
}



run();