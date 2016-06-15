require 'spec_helper'

feature 'En savoir plus sur un vitrail qui se trouve devant moi' do
	
    scenario 'Pour un parcours suivi : Parcours Moïse' do 
        listEglises 'Parcours Moïse'
        expect(page).to have_content 'Église Saint Nizier'
        click_on 'Église Saint-Nizier'
        listVitraux 'Église Saint Nizier'
        expect(page).to have_content 'Buisson Ardent'
        click_on 'Buisson Ardent'
        click_on 'J\'ai vu'
        visit '/details-BuissonArdent'
	end
    
    scenario 'Pour un vitrail isolé : Buisson Ardent' do
        expect(page).to have_content 'Rechercher un thème, une époque, une église...'
        fill_in 'search-course', :with => 'Saint Nizier'
        expect(page).to have_content 'Église Saint Nizier'
        click_on 'Église Saint-Nizier'
        listVitraux 'Église Saint Nizier'
        expect(page).to have_content 'Buisson Ardent'
        click_on 'Buisson Ardent'
        click_on 'J\'ai vu'
        visit '/details-BuissonArdent'
	end

end
