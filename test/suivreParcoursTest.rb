require 'def'

feature 'Suivre parcours' do

	scenario 'Choisir Parcours' do
		visit $home_page
    click_on ('Parcours "Moïse"')
    isParcoursPreviewComplete?()
  end

	scenario 'Recherche Parcours' do
		visit $home_page
		expect(page).to have_content 'Rechercher un thème, une époque...'
		fill_in 'search-course', :with => 'Moïse'
		expect(page).to have_content 'Parcours "Moïse"'

		fill_in 'search-course', :with =>'15'
		expect(page).to have_content 'Parcours "Technique Narrative"'

	end



end
