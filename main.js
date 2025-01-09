import * as THREE from 'three';

// Initialisation de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lumières
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Lumière douce
scene.add(ambientLight);

// Chargement des textures
const textureLoader = new THREE.TextureLoader();
const solTexture = textureLoader.load('assets/tennis.jpg');
const murTexture = textureLoader.load('assets/mur.avif');
const balleTexture = textureLoader.load('assets/balle.jpg');
const raquetteTexture = textureLoader.load('assets/raquette.jpg');

// Répétition des textures
solTexture.wrapS = solTexture.wrapT = THREE.RepeatWrapping;
solTexture.repeat.set(1, 2);

murTexture.wrapS = murTexture.wrapT = THREE.RepeatWrapping;
murTexture.repeat.set(2, 1);

balleTexture.wrapS = balleTexture.wrapT = THREE.RepeatWrapping;
raquetteTexture.wrapS = raquetteTexture.wrapT = THREE.RepeatWrapping;

// Sol
const sol = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 20),
  new THREE.MeshStandardMaterial({ map: solTexture })
);
sol.rotation.x = -Math.PI / 2;
scene.add(sol);

// Murs
const epaisseurMur = 0.2;
const hauteurMur = 5;
const murMateriau = new THREE.MeshStandardMaterial({ map: murTexture });

const murGauche = new THREE.Mesh(new THREE.BoxGeometry(epaisseurMur, hauteurMur, 20), murMateriau);
murGauche.position.set(-5, hauteurMur / 2, 0);
scene.add(murGauche);

const murDroit = new THREE.Mesh(new THREE.BoxGeometry(epaisseurMur, hauteurMur, 20), murMateriau);
murDroit.position.set(5, hauteurMur / 2, 0);
scene.add(murDroit);

// Raquettes
const raquetteGeometrie = new THREE.BoxGeometry(0.5, 1, 3);
const raquetteMateriau = new THREE.MeshStandardMaterial({ map: raquetteTexture });

const raquette1 = new THREE.Mesh(raquetteGeometrie, raquetteMateriau);
raquette1.position.set(-4.5, 0.5, 0);
scene.add(raquette1);

const raquette2 = new THREE.Mesh(raquetteGeometrie, raquetteMateriau);
raquette2.position.set(4.5, 0.5, 0);
scene.add(raquette2);

// Balle de tennis
const balleGeometrie = new THREE.SphereGeometry(0.3, 32, 32);
const balleMateriau = new THREE.MeshStandardMaterial({ map: balleTexture });
const balle = new THREE.Mesh(balleGeometrie, balleMateriau);
balle.position.set(0, 0.3, 0);
scene.add(balle);

// Variables de jeu
let vitesseBalle = new THREE.Vector3(0.1, 0, 0.1);
let scoreJoueur1 = 0;
let scoreJoueur2 = 0;
const scoreMax = 5;

// Affichage des scores
const affichageScore = document.createElement('div');
affichageScore.style.position = 'absolute';
affichageScore.style.top = '10px';
affichageScore.style.left = '50%';
affichageScore.style.transform = 'translateX(-50%)';
affichageScore.style.color = 'white';
affichageScore.style.fontSize = '24px';
document.body.appendChild(affichageScore);

// Mise à jour du score
function mettreAJourScore() {
    affichageScore.textContent = `Joueur 1: ${scoreJoueur1} - Joueur 2: ${scoreJoueur2}`;
}
mettreAJourScore();

// Déplacements des raquettes
let vitesseRaquette1 = 0;
let vitesseRaquette2 = 0;

window.addEventListener('keydown', (e) => {
    if (e.key === 'z') vitesseRaquette1 = -0.2;
    else if (e.key === 's') vitesseRaquette1 = 0.2;
    else if (e.key === 'ArrowUp') vitesseRaquette2 = -0.2;
    else if (e.key === 'ArrowDown') vitesseRaquette2 = 0.2;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'z' || e.key === 's') vitesseRaquette1 = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') vitesseRaquette2 = 0;
});

// Fonction d'animation
function animer() {
    requestAnimationFrame(animer);

    // Déplacement des raquettes
    raquette1.position.z += vitesseRaquette1;
    raquette2.position.z += vitesseRaquette2;

    // Limitation des déplacements des raquettes
    raquette1.position.z = Math.max(-8.5, Math.min(8.5, raquette1.position.z));
    raquette2.position.z = Math.max(-8.5, Math.min(8.5, raquette2.position.z));

    // Déplacement de la balle
    balle.position.add(vitesseBalle);

    // Rebond sur les murs
    if (balle.position.z > 9 || balle.position.z < -9) vitesseBalle.z *= -1;

    // Rebond sur les raquettes
    if (balle.position.x < -4.5 && Math.abs(balle.position.z - raquette1.position.z) < 1.5) vitesseBalle.x *= -1;
    else if (balle.position.x > 4.5 && Math.abs(balle.position.z - raquette2.position.z) < 1.5) vitesseBalle.x *= -1;

    // Gestion des scores
    if (balle.position.x < -5) {
        scoreJoueur2++;
        reinitialiserBalle();
    } else if (balle.position.x > 5) {
        scoreJoueur1++;
        reinitialiserBalle();
    }

    mettreAJourScore();

    // Vérification de la fin de la partie
    if (scoreJoueur1 >= scoreMax || scoreJoueur2 >= scoreMax) {
        alert(`Partie terminée ! Gagnant: Joueur ${scoreJoueur1 >= scoreMax ? 1 : 2}`);
        scoreJoueur1 = 0;
        scoreJoueur2 = 0;
        mettreAJourScore();
    }

    renderer.render(scene, camera);
}

// Réinitialisation de la balle
function reinitialiserBalle() {
    balle.position.set(0, 0.3, 0);
    const directionX = Math.random() > 0.5 ? 0.1 : -0.1;
    const directionZ = Math.random() > 0.5 ? 0.1 : -0.1;
    vitesseBalle = new THREE.Vector3(directionX, 0, directionZ);
}

// Redimensionner la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Positionner la caméra
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

// Lancer l'animation
animer();
