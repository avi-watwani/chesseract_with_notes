class Note < ApplicationRecord
  def title
    content ? content.split.first : 'no content'
  end
end
