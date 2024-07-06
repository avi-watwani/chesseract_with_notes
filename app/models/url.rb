class Url < ApplicationRecord
  before_create :generate_short_code

  validates :original, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
  validates :short, uniqueness: true

  private

  def generate_short_code
    self.short = SecureRandom.urlsafe_base64(6) # Generates a 6-character URL-safe base64 string
  end
end
