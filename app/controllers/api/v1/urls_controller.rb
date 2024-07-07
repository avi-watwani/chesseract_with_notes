class Api::V1::UrlsController < ApplicationController
  def create
    original = url_params[:original]
    url = Url.find_by(original: original)
    if url
      render json: { short: url.short }
    else
      url = Url.new(url_params)
      if url.save
        render json: { short: url.short }, status: :created
      else
        render json: url.errors, status: :unprocessable_entity
      end
    end
  end

  private

  def url_params
    params.require(:url).permit(:original)
  end
end
