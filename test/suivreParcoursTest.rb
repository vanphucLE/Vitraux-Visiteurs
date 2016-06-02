feature 'Suivre parcours' do

	scenario 'Choisir Parcours' do
		visit $home_page
		isParcoursListComplete?()
    click_on first(".parcoursButtonHomepage")
    isParcoursPreviewComplete?()

  end

  def isParcoursListComplete?()
    has_css?(".findByKeywordHomepage")
    has_css?(".parcoursButtonHomepage")
    isParcoursButtonHomepageComplete?(#first(".parcoursButtonHomepage"))
  end

  def isParcoursButtonHomepageComplete?(parcoursButton)
    parcoursButton.has_css?(".parcoursTitle")
    parcoursButton.has_css?(".parcoursInfos")
  end


  def isParcoursPreviewComplete?()
    has_css?(".titleParcoursPreview")
    has_css?(".mapParcoursPreview")
    has_css?(".infosParcoursPreview")
    has_css?(".descriptionParcoursPreview")
    has_css?(".reviewParcoursPreview")
    has_css?(".startButtonParcoursPreview")
  end





    click_on_link 'UV'
		click_on 'OFF'
		click_plus_sign_next_to 'Items'
		click_on 'Sans nom'
		fill_in '', :with => 'IF05 - Qualité du logiciel'
		click_on 'IF05 - Qualité du logiciel'
		click_plus_sign_next_to 'Attributs'
		fill_in 'Nom', :with => 'Responsable'
		fill_in 'Valeur', :with => 'Aurélien Bénel'
		click_on 'Créer'
	end

	scenario 'Pour un utilisateur non connecté' do
		visit $home_page
		click_on_link 'UV'
		click_on 'Se connecter'
		log_in_as 'alice', 'lapinblanc'
		click_on 'Se connecter'
		click_on 'OFF'
		click_plus_sign_next_to 'Items'
		click_on 'Sans nom'
		fill_in 'Nom', :with => 'IF05 - Qualité du logiciel'
		click_on 'IF05 - Qualité du logiciel'
		click_plus_sign_next_to 'Attributs'
		fill_in 'Nom', :with => 'Responsable'
		fill_in 'Valeur', :with => 'Aurélien Bénel'
		click_on 'Créer'
	end

end
