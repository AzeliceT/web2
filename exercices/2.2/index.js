let compteur = 0;

let messageWrapper = document.querySelector('.message');
let compteurWrapper = document.querySelector('.compteur');

window.addEventListener('click', () => {
    compteur++;
    compteurWrapper.textContent = compteur;

    if(compteur >= 5 && compteur <= 9){
        messageWrapper.textContent = 'Bravo, bel échauffement !';
    } else if(compteur >= 10){
        messageWrapper.textContent = "Vous êtes passé maître en l'art du clic !";
    }
});