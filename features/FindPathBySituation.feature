# language: fr

Fonctionnalité: Consulte un parcours adapté à ma situation

  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon un thème choisi.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon une époque choisie.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon une zone géographique choisie.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon le temps disponible.
  Un utilisateur aimerait bien se voir proposé un parcours touristique sur les vitraux selon un moyen de locomotion.
  
Scénario: Le touriste veut se déplacer en voiture dans le lieu quelconque le plus proche contenant des vitraux.

    Étant donné que le touriste se situe à un certain endroit
    Et que il est en voiture
    Et que il aimerait connaître le parcours le plus proche contenant des vitraux
    Quand il renseigne ses attentes en matière de vitraux
    Alors il lui serait fourni le parcours le plus proche
    Et il lui serait fourni la distance et le temps du parcours
    Et "Wow !" - dirait-il.;

Scénario: Le touriste veut se promener à pied en visitant des vitraux étant donné qu'il ne dispose que d'une heure.

    Étant donné que le touriste se situe à une certaine position
    Et que il ne dispose que d'une heure
    Et que il est à pied
    Et que il aimerait connaître l'itinéraire le plus proche contenant des vitraux qui l'intéresse
    Quand il serait demandé son moyen de locomotion, son temps disponible et sa position
    Alors il lui serait founi le parcours correspondant à ses attentes 
    Et il lui serait fourni la distance et le temps de parcours exact à pied
    Et "Wow !" - dirait-il.;
