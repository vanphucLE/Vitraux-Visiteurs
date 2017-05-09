Etantdonnéque(/^André visite les vitraux de Troyes avec sa famille$/) do
  visit $homepage
  pending
end


Etantdonnéque(/^il souhaite garder intéréssés ses enfants en les amusant$/) do
  click_on 'Mes badges'
  pending
end

Quand(/^il voit un vitrail de "([^"]*)"$/) do |arg1|
  fill_in 'Nom du Vitrail', with: arg1
  pending
end

Alors(/^il gagnerait un badge et montrerait à ses enfants le badge "([^"]*)" gagné\. ;$/) do |badge|
  expect($pageBadge).to have_content badge
  pending
end

Etantdonnéque(/^André effectue un parcours sur "([^"]*)" avec sa famille$/) do |glassname|
  click_on 'Rechercher un parcours'
  fill_in 'Localisation', with: 'Current Localisation'
  fill_in 'Choisir vos tags', with: glassname
  select 'Vélo', from: 'Moyen de Transport'
  click_on 'Rechercher'
  pending
end

Quand(/^il termine la visite "([^"]*)"$/) do |pathname|
  check $pathname
  pending
end

Alors(/^il gagnerait un badge spécial de fin de parcours "([^"]*)" et ses enfants auraient été motivés par le gain de ce haut\-fait\. ;$/) do |pathname|
  expect($pageBadge).to have_content pathname
  pending
end

Etantdonnéque(/^André a une grande collection de badge$/) do
  click_on 'Mes badges'
  pending
end

Quand(/^il partage son score à ses amis$/) do
  click_on 'Partager à mes amis'
  pending
end

Alors(/^son score est posté sur ses réseaux sociaux préférés\. ;$/) do
  expect('facebook').to have_content 'Score:'
  pending
end
