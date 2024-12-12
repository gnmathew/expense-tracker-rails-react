module Api
  module V1
    class UserSerializer
      include FastJsonapi::ObjectSerializer

      attributes :id, :username
    end
  end
end
