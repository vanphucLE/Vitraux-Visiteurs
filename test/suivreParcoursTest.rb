require 'def'

feature 'Suivre parcours' do

	scenario 'Choisir Parcours' do
		visit $home_page
    click_on ('Parcours "Moïse"')
    isParcoursPreviewComplete?('Parcours "Moïse"')
  end

	scenario 'Recherche Par Nom Du Parcours' do
		visit $home_page
		expect(page).to have_content 'Rechercher un thème, une époque...'
		fill_in 'search-course', :with => 'Moïse'
		expect(page).to have_content 'Parcours "Moïse"'

	end
	
	scenario 'Recherche Par Nombre de Vitraux' do
		visit $home_page
		expect(page).to have_content 'Rechercher un thème, une époque...'
		fill_in 'search-course', :with =>'15'
		expect(page).to have_content 'Parcours "Technique Narrative"'

	end



end
