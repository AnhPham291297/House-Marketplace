import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Formik, Form } from 'formik'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';

const SignIn = () => {
  //! State
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //! Function
  const handleSubmit = async (state, action) => {
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);

      if(userCredential.user) {
        navigate("/")
      }

    } catch (error) {
      toast.error("Bad User Credentials")
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
              email: "",
              password: ""
            }
          }
          onSubmit={handleSubmit}
        >
          {propsFormik => (
            <Form>
              <input type="email" className='emailInput' placeholder='Email' id='email' value={propsFormik.values.email} onChange={propsFormik.handleChange} />

              <div className="passwordInputDiv">
                <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={propsFormik.values.password} onChange={propsFormik.handleChange} />
                <img src={visibilityIcon} alt="show password" className='showPassword' onClick={() => setShowPassword(prevState => !prevState)} />
              </div>

              <Link to='/forgotpassword' className='forgotPasswordLink'>Forgot Password</Link>

              <div className="signInBar">
                <p className="signInText">Sign In</p>
                <button type="submit" className='signInButton'>
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <OAuth/>
        
        <Link to='/signup' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn