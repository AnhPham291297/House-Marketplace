import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {

  const onSubmit = async (state) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, state.email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={onSubmit}
        >
          {propsFormik => (
            <Form>
              <input type="email" className='emailInput' placeholder='Email' id='email' value={propsFormik.values.email} onChange={propsFormik.handleChange} />

              <Link className='forgotPasswordLink' to='/signin'>Sign In</Link>

              <div className='signInBar'>
                <div className='signInText'>Send Reset Link</div>
                <button className='signInButton'>
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div >
  )
}

export default ForgotPassword