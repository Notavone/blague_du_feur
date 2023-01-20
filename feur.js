if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

const inputQuoi = document.getElementById('quoi');
const labelQuoi = document.getElementById('labelQuoi');
const leBody = document.getElementById('leBody');
const avertissementRelou = document.getElementById('avertissementRelou');

document.addEventListener("DOMContentLoaded", () => {
    inputQuoi.focus();
    inputQuoi.addEventListener("blur", () => {
        inputQuoi.focus();
    });
    inputQuoi.addEventListener('input', (e) => {
        if ("QUOI?" === e.target.value.trim().toUpperCase()
            || "QUOI ?" === e.target.value.trim().toUpperCase()) {
            showTime();
        }
    });

    const nbFeur = undefined ?? Math.floor(leBody.getBoundingClientRect().width * leBody.getBoundingClientRect().height / 5000);

    for (let i = 0; i < nbFeur; i++) {
        const ceFeur = document.createElement('h1');
        ceFeur.style.opacity = "0";
        ceFeur.classList.add('feur');
        majFeur(ceFeur);
        leBody.appendChild(ceFeur);
    }

    window.addEventListener("resize", () => {
        for (const ceFeur of document.getElementsByClassName("feur")) {
            majFeur(ceFeur);
        }
    });
});

function ecritureFeurAleatoire() {
    const tableauFeur = ['feur', 'feuR', 'feUr', 'feUR', 'fEur', 'fEuR', 'fEUr', 'fEUR', 'Feur', 'FeuR', 'FeUr', 'FeUR', 'FEur', 'FEuR', 'FEUr', 'FEUR', 'feur!', 'feuR!', 'feUr!', 'feUR!', 'fEur!', 'fEuR!', 'fEUr!', 'fEUR!', 'Feur!', 'FeuR!', 'FeUr!', 'FeUR!', 'FEur!', 'FEuR!', 'FEUr!', 'FEUR!',];
    return tableauFeur[Math.floor(Math.random() * tableauFeur.length)];
}

function couleurCSSAleatoire() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function yAleatoire(tailleTexte) {
    const hauteurPage = leBody.getBoundingClientRect().height - tailleTexte;
    return Math.floor(Math.random() * hauteurPage);
}

function xAleatoire(tailleTexte) {
    const largeurPage = leBody.getBoundingClientRect().width - tailleTexte;
    return Math.floor(Math.random() * largeurPage);
}

function rotationAleatoire() {
    return Math.floor(Math.random() * 90) - 45;
}

function majFeur(ceFeur) {
    ceFeur.innerHTML = ecritureFeurAleatoire();
    ceFeur.style.transform = `rotate(${rotationAleatoire()}deg)`;
    ceFeur.style.color = couleurCSSAleatoire();
    ceFeur.style.left = xAleatoire(ceFeur.getBoundingClientRect().width + 20) + "px";
    ceFeur.style.top = yAleatoire(ceFeur.getBoundingClientRect().height + 20) + "px";
}

function majLeBody() {
    document.title = ecritureFeurAleatoire();
    document.body.style.backgroundColor = couleurCSSAleatoire();
}

function showTime() {
    labelQuoi.remove();
    avertissementRelou.remove();

    for (const ceFeur of document.getElementsByClassName("feur")) {
        const tempsReactionFeur = Math.floor(Math.random() * 50) * 70 + 1000;
        ceFeur.style.opacity = "1";
        intervalAvecAnimationFrame(() => {
            majFeur(ceFeur);
        }, tempsReactionFeur);
    }

    majLeBody();
    setInterval(() => {
        majLeBody();
    }, 500);

}

function intervalAvecAnimationFrame(callback, interval) {
    let lastTime = 0;

    function loop(time) {
        if (time - lastTime >= interval) {
            lastTime = time;
            callback();
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}
