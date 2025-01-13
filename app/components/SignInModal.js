  import { FcGoogle } from "react-icons/fc";
  import { FaFacebook } from "react-icons/fa";
  import { FaXTwitter } from "react-icons/fa6";

  const SignInModal = ({ signInRef }) => {
    return (
      <div 
        className="fixed top-0 left-0 p-20 z-20 backdrop-blur-sm w-full h-full transform transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-center items-center">
          <div 
            ref={signInRef} 
            className="flex flex-col justify-center items-center w-[80%] h-[80vh] bg-[var(--background)]
            shadow-xl border border-black/20 rounded-xl
            "
          >
            <div>
              <h1 className="text-3xl">Welcome back.</h1>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <button
                className="flex items-center bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FcGoogle className="text-2xl mr-14" /> Sign in with Google
              </button>
              <button
                className="flex items-center bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FaFacebook className="text-2xl mr-14" /> Sign in with Facebook
              </button>
              <button
                className="flex items-center bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FaXTwitter className="text-2xl mr-14" /> Sign in with X
              </button>
            </div>
            <div className="flex justify-center mt-5">
              <h2 className="">No account?</h2> 
              &nbsp;
              <button className="font-bold text-[var(--green-color)]">Create one.</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default SignInModal