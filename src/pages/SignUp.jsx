import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';

const SignUp = () => {
  //! State
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //! Function
  const handleSubmit = async (state, action) => {
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: state.name
      })

      delete state.password
      state.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), state)

      navigate("/")
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  }

  //! Render
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <Formik
          initialValues={
            {
              name: "",
              email: "",
              password: ""
            }
          }
          onSubmit={handleSubmit}
        >
          {propsFormik => (
            <Form>
              <input type="name" className='nameInput' placeholder='Name' id='name' value={propsFormik.values.name} onChange={propsFormik.handleChange} />

              <input type="email" className='emailInput' placeholder='Email' id='email' value={propsFormik.values.email} onChange={propsFormik.handleChange} />

              <div className="passwordInputDiv">
                <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={propsFormik.values.password} onChange={propsFormik.handleChange} />
                <img src={visibilityIcon} alt="show password" className='showPassword' onClick={() => setShowPassword(prevState => !prevState)} />
              </div>

              <Link to='/forgotpassword' className='forgotPasswordLink'>Forgot Password</Link>

              <div className="signUpBar">
                <p className="signUpText">Sign Up</p>
                <button type="submit" className='signUpButton'>
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <OAuth />

        <Link to='/signin' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp