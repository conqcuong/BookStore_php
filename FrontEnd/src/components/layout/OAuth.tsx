import Google from '../../assets/google.svg'
import { app } from '../../firebase'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { loginGoogle } from '../../redux/apiRequest';
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

export const OAuth = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const formData = {
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
                name: resultsFromGoogle.user.displayName,
            }
            dispatch(loginGoogle(formData) as unknown as AnyAction);
        } catch (err:any) {
            console.error(err.message);
        }
    }
  return (
    <button className='w-full active:scale-[.98] flex border-2 border-gray-100 py-3 rounded-xl items-center justify-center gap-2' onClick={handleGoogleClick}>
        <img src={Google} className='w-6' alt="" />
        Sign in with Google
    </button>
  )
}
