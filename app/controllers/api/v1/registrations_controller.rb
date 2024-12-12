module Api
  module V1
    class RegistrationsController < ApiController
      before_action :authorize_request, except: [:create]

      def create
        user = User.new(user_params)

        if user.save
          token = jwt_encode(user_id: user.id)

          render json: { token: token, user: UserSerializer.new(user).serializable_hash }, status: :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:password, :username)
      end
    end
  end
end
