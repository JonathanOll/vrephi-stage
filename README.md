# VRephi

## Installation:
- cloner le repo
- `npm i` à la racine

## Lancement
- `npm start` à la racine
- charger un graphe en utilisant l'interface de gephi de base
- cliquer sur le bouton "Start VR"

## Utilisation

### Sur Meta Quest (2/3)

/!\ Controlleurs obligatoires.
Presser la gachette du controlleur de gauche permet de saisir le graphe dans son entièreté pour le déplacer
Déplacer le joystick du controlleur de droite permet de faire apparaitre une roue permettant de faire apparaitre certaines fenêtres devant la caméra.
Attraper un noeud avec le controlleur droite permet de le déplacer.

## Architecture

vrephi-stage/
```
├── packages
│   ├── broadcast
│   │   └── ...
│   ├── gephi-lite
│   │   └── ...
│   ├── sdk
│   │   └── ...
│   └── VRephi
│       ├── src
│       │   ├── components # vue
│       │   │   ├── core
│       │   │   │   └── Tous les composants de base de Vrephi (Composant Graphe, Bouton pour démarrer la vr, ...)
│       │   │   ├── graph
│       │   │   │   └── Types TS de base utilisés de partout 
│       │   │   └── ui
│       │   │       ├── core
│       │   │       │   └── Tous les composants XR de base (bouton, label, switch, ...)
│       │   │       └── Tous les menus XR
│       │   ├── core
│       │   │   ├── Logique métier
│       │   │   └── types
│       │   │       └── Types TS de base utilisés de partout 
│       │   ├── hooks
│       │   │   └── Store séparé en plusieurs hooks (pour éviter des rerenders inutiles)
│       │   ├── store
│       │   │   └── Lien entre la vue et la logique métier
└──     └── └── index.ts
```

## Principes de base

### Store, Hooks
Le code permettant le lien entre la logique métier et la vue est situé dans un store. Le store est un singleton contenant à la fois les données, et des fonctions pour les manipuler. L'utilisation d'une de ces fonctions entrainera le re render des composants React les utilisant.
Pour éviter que tous les composants soit re-rendus à chaque changement sur des attributs qu'ils n'utilisent pas, on utilise des hooks. un Hook est simplement un filtre, qui vient récupérer dans le store les élements qu'il veut exposer, un hook s'abonne automatiquement aux variables qu'il suit pour déclencher un re-render dès que besoin.

### XRComponents et Modifier
On utilise la librairie uikit pour les interfaces. Dans un soucis de simplicité et d'extensibilité, nous avons créé des composants génériques à réutiliser dans tous les menus, dont des labels, des boutons, ou encore des fenêtres (permettant le déplacement grâce à une handle sur le bas de la fenêtre et la fermeture). 
Tous les composants ont un style par défaut, qui sont définis en haut de chaque fichier. Il est possible de modifier ce style en passant en paramètre un Modifier. Un Modifier est un type représentant une ensemble d'attributs de style (padding, margin, fontColor, backgroundColor...). 

## Bugs connus
- Dans certains cas, un bouton pour lancer le mode VR apparaitra sur le navigateur (pas le bouton bleu qu'on a ajouté nous-même), lancer la VR en appuyant dessus affichera une scène vide, puisque les données ne seront pas chargées, il faut bien cliquer sur le bouton bleu
- Dans certains cas, après avoir lancé une première fois le mode VR, le relancer à nouveau sans refresh la page conduira à une erreur
- Le controlleur gauche sert à déplacer le graphe en entier, mais nous n'avons pas réussi à désactiver les autres interactions, ainsi, en voulant déplacer le graphe, il peut arriver de saisir un node ou d'appuyer sur un bouton d'une fenêtre 

# Bon courage 😉

En cas de besoin, discord jonatanbien / mail jonathan.ollivier@etu.univ-lyon1.fr
