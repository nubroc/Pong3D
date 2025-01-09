# Jeu de Tennis en 3D avec Three.js

Ce projet est un jeu de tennis simple développé en utilisant la bibliothèque **Three.js**. Le jeu met en scène deux joueurs qui contrôlent des raquettes pour renvoyer une balle de tennis et marquer des points. Le jeu se termine lorsqu'un joueur atteint le score maximal de 5.

## Prérequis

Pour faire fonctionner ce projet, vous devez avoir un navigateur compatible avec WebGL et Three.js. Aucun serveur n'est nécessaire si vous ouvrez simplement le fichier HTML localement, mais il est recommandé d'utiliser un serveur pour éviter des problèmes de chargement de ressources.

## Installation

1. Clonez ce repository ou téléchargez les fichiers sources.
   
2. Placez-vous dans le répertoire du projet et ouvrez le fichier `index.html` dans votre navigateur.

3. Si vous préférez héberger ce projet, vous pouvez le déployer sur un serveur web de votre choix.

## Fonctionnalités

- **2 joueurs** : Chaque joueur contrôle une raquette avec les touches directionnelles (haut/bas) pour le joueur 2 et "z" et "s" pour le joueur 1.
- **Balle de tennis** : La balle rebondit sur les murs et les raquettes.
- **Scores** : Les scores sont affichés en temps réel en haut de l'écran.
- **Partie terminée** : Lorsque l'un des joueurs atteint 5 points, un message s'affiche et la partie redémarre.

## Commandes

- **Joueur 1** : 
  - Touche **'z'** pour déplacer la raquette vers le haut.
  - Touche **'s'** pour déplacer la raquette vers le bas.

- **Joueur 2** : 
  - Flèche **haut** pour déplacer la raquette vers le haut.
  - Flèche **bas** pour déplacer la raquette vers le bas.

## Structure des fichiers

- `index.html` : Fichier HTML qui charge le jeu.
- `style.css` : Fichier de styles pour le rendu et l'affichage des scores.
- `assets/` : Dossier contenant les images et textures utilisées dans le jeu.
  - `tennis.jpg` : Texture du sol.
  - `mur.avif` : Texture des murs.
  - `balle.jpg` : Texture de la balle de tennis.
  - `raquette.jpg` : Texture des raquettes.

- `main.js` : Fichier JavaScript principal qui contient la logique du jeu (initialisation, animation, mouvements, gestion des scores).

## Auteurs
Développé par @nubroc.

## autres 
Commentaires et README générés par IA.