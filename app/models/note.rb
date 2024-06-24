class Note < ApplicationRecord
  def title
    content ? CGI.unescapeHTML(content.split.first(3).join(' ')).gsub(/<\/?[^>]*>/, "") : 'no content'
  end
end
