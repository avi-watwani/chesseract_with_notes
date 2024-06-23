class Note < ApplicationRecord
  def title
    content&.split&.first || '<no content>'
  end
end
