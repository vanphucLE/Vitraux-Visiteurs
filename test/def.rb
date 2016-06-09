def isParcoursListComplete?()
  has_css?(".search-bar")
  has_css?(".table-view list")
  isParcoursButtonHomepageComplete?(#first(".table-view list"))
end

def isParcoursButtonHomepageComplete?(parcoursButton)
  parcoursButton.has_css?(".course-title")
  parcoursButton.has_css?(".course-abstract")
end


def isParcoursPreviewComplete?(Title)
  expect(page).to have_content Title
  expect(page).to have_content 'maps'
  expect(page).to have_content 'Description :'
  expect(page).to have_content 'Avis :'
  expect(page).to have_content 'Démarrer'
end
