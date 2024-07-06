class Api::V1::UrlsController < ApplicationController
  def create
    url = Url.new(url_params)
    if url.save
      render json: { original: url.original, short: url.short }, status: :created
    else
      render json: url.errors, status: :unprocessable_entity
    end
  end

  # def show
  #   url = Url.find_by(short: params[:id])
  #   if url
  #     render json: { original: url.original, short: url.short }
  #   else
  #     render json: { error: 'URL not found' }, status: :not_found
  #   end
  # end

  # def redirect
  #   url = Url.find_by(short: params[:short])
  #   if url
  #     redirect_to url.original
  #   else
  #     render json: { error: 'URL not found' }, status: :not_found
  #   end
  # end

  private

  def url_params
    params.require(:url).permit(:original)
  end
end
