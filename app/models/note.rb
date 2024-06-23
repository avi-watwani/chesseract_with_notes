class Note < ApplicationRecord
  def title
    content.split.first
  end
end
