class HomepageController < ApplicationController
  def index
    path = params[:path].to_s
    return if path.blank?

    url = Url.find_by(short: path)
    return if url.blank?

    redirect_to url.original, allow_other_host: true
  end
end
