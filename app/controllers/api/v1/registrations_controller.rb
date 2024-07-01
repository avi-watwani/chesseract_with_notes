# app/controllers/api/v1/registrations_controller.rb
class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, raise: false
  respond_to :json

  def create
    user = User.new(sign_up_params)
    if user.save
      sign_in(user)
      render json: { status: 'success', user: user }, status: :created
    else
      render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
