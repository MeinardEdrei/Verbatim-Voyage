  import { FcGoogle } from "react-icons/fc";
  import { FaFacebook } from "react-icons/fa";
  import { FaXTwitter } from "react-icons/fa6";
  import { signIn } from "next-auth/react"

  const SignInModal = ({ signInRef, onClose, setShowSignUpModal }) => {
    return (
      <div 
        className="fixed top-0 left-0 p-10 xl:p-20 z-20 backdrop-blur-sm w-full h-full transform transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-center items-center">
          <div 
            ref={signInRef} 
            className="flex flex-col justify-center items-center w-[100%] xl:w-[80%] h-[80vh] bg-[var(--background)]
            shadow-xl border border-black/20 rounded-xl
            "
          >
            <div>
              <h1 className="text-xl xl:text-3xl">Welcome back.</h1>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <button
                onClick={() => signIn("google")}
                className="flex items-center text-xs xl:text-base bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FcGoogle className="text-xl xl:text-2xl mr-2 xl:mr-14" /> Sign in with Google
              </button>
              <button
                className="flex items-center text-xs xl:text-base bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FaFacebook className="text-xl xl:text-2xl mr-2 xl:mr-14" /> Sign in with Facebook
              </button>
              <button
                className="flex items-center text-xs xl:text-base bg-white py-4 pl-[1em] pr-[2em] border border-black/40 rounded-full"
              >
                <FaXTwitter className="text-xl xl:text-2xl mr-2 xl:mr-14" /> Sign in with X
              </button>
            </div>
            <div className="flex justify-center items-center mt-5">
              <h2 className="text-xs xl:text-base">No account?</h2> 
              &nbsp;
              <button 
                onClick={() => {
                  setShowSignUpModal(true);
                  onClose(false);
                }} 
                className="font-bold text-[var(--green-color)] text-xs xl:text-base"
              >
                Create one.
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default SignInModal