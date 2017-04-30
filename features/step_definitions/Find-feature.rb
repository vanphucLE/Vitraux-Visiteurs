require 'capybara/cucumber'

Etantdonnéque(/^le visiteur connait le vitrail "([^"]*)" à "([^"]*)" et souhaiterait des informations dessus$/) do |nomVitrail, localisation|
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il lance l'application sur son téléphone$/) do
  visit $homepage
end

Quand(/^il entre la localisation "([^"]*)"$/) do |localisation|
  fill_in 'localisation', with: $localisation
end

Alors(/^l'application lui montrerait une liste de vitraux correspondant$/) do
  visit $listeVitraux
end

Alors(/^il pourrait sélectionner le vitrail qu'il souhaiterait$/) do
  click_on $nomVitrail
end

Alors(/^"([^"]*)" \- dirait\-il\. ;$/) do |reaction|
  visit $commentpage
  fill_in 'reaction', with: $reaction
end

Etantdonnéque(/^Michel connait le nom du parcours$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il souhaite avoir des informations précises pour chaque vitrail de ce parcours$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il entre le nom du parcours : "([^"]*)"$/) do |nomParcours|
  fill_in 'nomParcours', with: $nomParcours
end

Etantdonnéque(/^Michel connait l'époque qui l'intéresse$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il souhaite avoir des informations précises pour chaque vitrail de cette époque$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il entre "([^"]*)" et "([^"]*)"$/) do |dateDebut, dateFin|
  fill_in 'dateDebut', with: $dateDebut
  fill_in 'dateFin', with: $dateFin
end

Etantdonnéque(/^Michel connait le nom de l'église$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il souhaite avoir des informations précises pour chaque vitrail de cette église$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il entre le nom de l'église en question : "([^"]*)"$/) do |nomEglise|
  fill_in 'nomEglise', with: $nomEglise
end
