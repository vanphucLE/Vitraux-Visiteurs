Etantdonnéque(/^Michel se trouve devant un vitrail$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il souhaite avoir des informations sur celui\-ci$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il connait le nom du vitrail$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il lance l'application sur son téléphone$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il entre le nom du vitrail$/) do
  expect('stainedGlasseDetailsPage').to have_selector('input#stainedGlassName')
  click_submit 'Rechercher'
end

Alors(/^l'application lui montrerait des informations sur le vitrail$/) do
  expect(page).to have_selector('div#stainedGlasseDetails')
end

Alors(/^"([^"]*)" \- dirait\-il\. ;$/) do |reaction|
  visit 'commentPage'
  fill_in 'reaction', with: reaction
end

Etantdonnéque(/^Michel regarde les parcours sur l'application$/) do
  visit 'pathPage'
  expect('pathPage').to have_selector('table tr.path')
end

Etantdonnéque(/^il tombe sur un vitrail qui l'interesse$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonnéque(/^il souhaite en savoir plus dessus$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il clique dessus$/) do
  click_on "Details"
end

Alors(/^l'application lui montrerait des informations sur le vitrail\.$/) do
  expect(page).to have_selector('div#stainedGlasseDetails')
end
