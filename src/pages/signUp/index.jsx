import Layout from '@/components/ui/Layout/Layout';
import { Inter } from 'next/font/google';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Wrap, StyledForm } from '../../Style/SignUpForm.styled';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.name) {
  } else if (values.name.length < 5) {
    errors.name = 'Must be at least 5 characters.';
  }

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

const SignupForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted

  const [show, setShow] = useState({ password: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
    },
    validate,
    onSubmit: async (values, actions) => {
      try {
        await axios.post('/api/auth/reg', values);

        await signIn('email', {
          redirect: true,
          email: values.email,
          callbackUrl: 'https://pom-mom-admin.vercel.app/',
        });
      } catch (error) {
        throw new Error(error.message);
      }

      actions.resetForm();
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <Wrap>
        <input
          id="name"
          name="name"
          type="text"
          required={true}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <HiOutlineUser size={30} />
      </Wrap>
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}

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
        <span onClick={() => setShow({ ...show, password: !show.password })}>
          <HiFingerPrint size={30} />
        </span>
      </Wrap>
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

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
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </StyledForm>
  );
};

export default SignupForm;
