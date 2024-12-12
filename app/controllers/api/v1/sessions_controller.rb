module Api
  module V1
    class SessionsController < ApiController
      before_action :authorize_request, except: [:create]

      def create
        user = User.find_by(username: user_params[:username])

        if user&.authenticate(user_params[:password])
          token = jwt_encode(user_id: user.id)

          render json: { token: token, user: UserSerializer.new(user).serializable_hash }, status: :ok
        else
          render json: { errors: 'Invalid username or password' }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:password, :username)
      end
    end
  end
end
