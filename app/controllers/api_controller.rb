class ApiController < ActionController::API
  SECRET_KEY = Rails.application.secret_key_base.to_s
  wrap_parameters false

  attr_reader :current_user

  def jwt_encode(payload, exp = 2.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  private

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = jwt_decode(header)

    if decoded && decoded[:exp] > Time.now.to_i
      @current_user = user.find(decoded[:user_id])
    else
      render json: { errors: 'Unauthorized or token expired' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e.message }, status: :unauthorized
  end
end
