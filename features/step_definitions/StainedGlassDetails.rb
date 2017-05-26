Quand(/^il entre "([^"]*)" comme nom de vitrail du vitrail$/) do |glassname|
  pending
  visit $searchpage
  fill_in 'Nom du Vitrail', with: $glassname
  click_on 'Rechercher'
end


Alors(/^l'application lui montrerait des informations sur le vitrail$/) do
  pending
  expect('searchpage').to have_content '.result'
end

Etantdonnéque(/^Michel regarde les parcours sur l'application$/) do
  pending
  visit $pathpage
  click_on '.pathname'
end

Etantdonnéque(/^il tombe sur un vitrail qui l'interesse$ et/) do
  pending
  expect ('pathpage').to have_content '.stainedglass'
end

Quand(/^il clique dessus$/) do
  pending
  click_on '.stainedglass'
end

Alors(/^l'application lui montrerait des informations sur le vitrail\.$/) do
  pending
  expect('searchpage').to have_content '.result'
end
