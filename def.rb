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
