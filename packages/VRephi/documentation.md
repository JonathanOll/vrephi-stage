## Dossier: components/
Composants React responsables du rendu 3D, de l'UI XR (boutons, menus) et du point d'entrée visuel (Graph3D).

---

## Dossier: core/

Contient la logique coeur (paramètres globaux, layout / simulation, fonctions mathématiques réutilisables).
Devrait être le lieu des opérations coûteuses (simulations, worker, algos de layout).

---

## Dossier: hooks/

Hooks React

---

## Dossier: store/

Contient le store global local au module (probablement Zustand ou un store maison) qui maintient l'état du graphe et sert de source de vérité pour les composants et hooks.

---

## Dossier: xr/

Contient la logique spécifique à la réalité virtuelle / XR (entités, helpers, intégration WebXR).

