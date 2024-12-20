const AuthBtn = ({ isSignUp, setIsSignUp }) => {
  return (
    <div>
      {!isSignUp ? (
        <>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl
              hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300
              transform transition-transform duration-300
              hover:scale-95 focus:scale-105"
          >
            Login
          </button>
          <div className="flex items-center justify-center mt-3">
            <span className="text-gray-500 mr-1">Don't have an account?</span>
            <span
              className="underline text-blue-600 cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </span>
          </div>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-xl
              hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300
              transform transition-transform duration-300
              hover:scale-95 focus:scale-105"
          >
            Sign up
          </button>
          <div className="flex items-center justify-center mt-3">
            <span className="text-gray-500 mr-1">Already have an account?</span>
            <span
              className="underline text-blue-600 cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthBtn;
