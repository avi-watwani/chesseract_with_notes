class Api::V1::UrlsController < ApplicationController
  def create
    url = Url.new(url_params)
    if url.save
      render json: { original: url.original, short: url.short }, status: :created
    else
      render json: url.errors, status: :unprocessable_entity
    end
  end

  private

  def url_params
    params.require(:url).permit(:original)
  end
end
