Étantdonnéque(/^"([^"]*)" a effectué un parcours$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il veut donner son avis sur le parcours qu'il a effectué$/) do
  pending
  visit EvaluateMyPathExperience_POPUP_REVIEW_PROPOSITION
  click_on 'Oui'
end

Alors(/^il lui serait offert la possibilité de exprimer un avis "([^"]*)" à son parcours$/) do |avis|
  pending
    visit EvaluateMyPathExperience_MAIN
    select $avis,from:'Niveau_Evaluation'
end

Alors(/^il lui serait offert la possibilité de donner un avis de façon libre et d'écrire "([^"]*)"$/) do |avislibre|
  pending
  fill_in 'Commentaire libre', with: $avislibre
end

Alors(/^il lui serait offert la possibilité de mentionner que son parcours a été de type "([^"]*)" en le labélisant$/) do |typeParcours|
  pending
    select $typeParcours, from:'Type_Parcours'
    click_on 'Envoyer'
    visit EvaluateMyPathExperience_POPUP_THANKS
end
