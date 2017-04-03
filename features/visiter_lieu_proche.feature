# language: fr

Fonctionnalité: Visiter un lieu proche contenant des vitraux

  Un utilisateur se trouve à une certaine position et souhaiterait connaître les lieux alentours à visiter contenant des vitraux.
  L'utilisateur se nomme Michel et est un touriste en visite sur Troyes pour le Week-end.

  Scénario: Le touriste veut se déplacer dans le lieu quelconque le plus proche contenant des vitraux

    Étant donné que le touriste se situe à une certaine position
    Quand il aimerait connaître l'endroît le plus proche contenant des vitraux
    Alors l'application lui fournit la localisation du lieu
    Et elle lui fournit le chemin le plus court pour y accéder
    Et elle lui fournit la distance et le temps de trajet

    Scénario: Le touriste veut se déplacer dans un lieu le plus proche contenant des vitraux qui l'intéresse

      Étant donné que le touriste se situe à une certaine position
      Quand il aimerait connaître l'endroît le plus proche contenant des vitraux qui l'intéresse
      Alors l'application lui demande de renseigner ses attentes en matière de vitraux
      Et l'application lui fournit la localisation du lieu
      Et elle lui fournit le chemin le plus court pour y accéder
      Et elle lui fournit la distance et le temps de trajet
