# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, raise: false
  respond_to :json

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
      sign_in(user)
      render json: { status: 'success', user: user }, status: :ok
    else
      render json: { status: 'error', message: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user)
    render json: { status: 'success', message: 'Logged out successfully' }, status: :ok
  end
end
