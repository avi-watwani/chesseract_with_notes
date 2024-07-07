Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'notes/index'
      post 'notes/create'
      get '/show/:id', to: 'notes#show'
      put '/update/:id', to: 'notes#edit'
      delete '/destroy/:id', to: 'notes#destroy'

      devise_scope :user do
        get '/current_user_details', to: 'sessions#current_user_details'
        post '/sign_up', to: 'registrations#create'
        post '/sign_in', to: 'sessions#create'
        delete '/sign_out', to: 'sessions#destroy'
      end

      post 'urls/create'
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "homepage#index"

  # For unknown route, redirect to homepage. It should always be at the end of the routes.
  get '/*path' => 'homepage#index'
end
