# language: fr

Fonctionnalité : Consulte un parcours adapté à ma situation

  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon un thème choisi.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon une époque choisie.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon une zone géographique choisie.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon le temps disponible.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon un moyen de locomotion.
  
Scénario : Le touriste veut se déplacer en voiture dans le lieu quelconque le plus proche contenant des vitraux.

    Étant donné que le touriste se situe à un certain endroit
    Et que il est en voiture
    Et que il aimerait connaître le parcours le plus proche contenant des vitraux
    Quand l'application lui demande de renseigner ses attentes en matière de vitraux
    Et que il le remplit
    Alors l'application lui fournirait le parcours le plus proche
    Et elle lui fournirait la distance et le temps du parcours
    Et "Wow !" - dirait-il.;

Scénario : Le touriste veut se promener à pied en visitant des vitraux étant donné qu'il ne dispose que d'une heure.

    Étant donné que le touriste se situe à une certaine position
    Et que il ne dispose que d'une heure
    Et que il est à pied
    Et que il aimerait connaître l'itinéraire le plus proche contenant des vitraux qui l'intéresse
    Quand l'application lui demande de renseigner son moyen de locomotion, son temps disponible et sa position
    Et que il le remplit
    Alors l'application lui fournirait le parcours correspondant à ses attentes 
    Et elle lui fournirait la distance et le temps de parcours exact à pied
    Et "Wow !" - dirait-il.;
