import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';

import { StyledForm, Wrap, ErrorMessage } from './LoginForm.styled';

import Layout from '@/components/ui/Layout/Layout';
import { Inter } from 'next/font/google';

import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};

  if (!values.password) {
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters.';
  }

  if (!values.email) {
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const LoginForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted

  const [show, setShow] = useState({ password: false });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit,
  });

  async function onSubmit(values, actions) {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: 'http://localhost:3000/',
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.log('Error', response);

        if (response.error === 'Email is not verified') {
          console.log('Email is not verified');
        } else {
          console.log('Login failed:', response.error);
        }
      }
    } catch (error) {
      console.log('An error occurred during login:', error);
    }

    actions.resetForm();
  }

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <Wrap>
          <input
            id="email"
            name="email"
            type="email"
            required={true}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <HiAtSymbol size={35} />
        </Wrap>
        {formik.errors.email ? (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Wrap>
          <input
            id="password"
            name="password"
            required={true}
            type={`${show.password ? 'text' : 'password'}`}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <span
            onClick={() => setShow({ ...show, password: !show.password })}
            style={{ margin: 0 }}
          >
            <HiFingerPrint size={35} />
          </span>
        </Wrap>
        {formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </StyledForm>
  );
};

// const LoginForm = () => {
//   return (
//     <StyledForm>
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </StyledForm>
//   );
// };

export default LoginForm;
