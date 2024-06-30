class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::RoutingError, with: :route_not_found

  private

  def record_not_found
    render json: { error: "Record not found" }, status: :not_found
  end

  def route_not_found
    render json: { error: "Route not found" }, status: :not_found
  end

  def authenticate_user!
    unless user_signed_in?
      render json: { error: "You need to sign in or sign up before continuing." }, status: :unauthorized
    end
  end
end
