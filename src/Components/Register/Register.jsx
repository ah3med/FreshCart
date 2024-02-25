import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

export default function Register() {
  let baseUrl = "https://ecommerce.routemisr.com"
  let [errorMessage, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()

  async function submitRegister(values) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, values).catch((err) => {
      console.log(err);
      setErrMsg(err.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message === "success") {
      setLoading(false)
      nav('/login')
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required("name Required").min(3, "min length 3").max(20, "max length 20"),
    email: Yup.string().email('Enter Email Valid').required('Email is required'),
    password: Yup.string().required("Passowrd Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Passowrd"),
    rePassword: Yup.string().required("Confirm Password Required").oneOf([Yup.ref('password')], 'Enter matched password'),
    phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "Phone not Valid")
  })


  let RegisterFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, validationSchema,
    onSubmit: submitRegister
  })


  return (

    <div className='py-5 w-75 mx-auto'>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <h2 className='fw-bolder mb-3 h4 text-center text-success'>Register Form :- </h2>
      
      <form onSubmit={RegisterFormik.handleSubmit}>
        <div className="my-2">
          <label htmlFor="name" className='mb-2'>Name</label>
          <input onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} type="text" name='name' id='name' className='form-control' />
          <p className='text-danger pt-2'>{RegisterFormik.errors.name}</p>
        </div>
        <div className="my-2">
          <label htmlFor="email" className='mb-2'>Email</label>
          <input onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} type="email" name='email' id='email' className='form-control' />
          <p className='text-danger pt-2'>{RegisterFormik.errors.email}</p>
        </div>
        <div className="my-2">
          <label htmlFor="password" className='mb-2'>Password</label>
          <input onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} type="password" name='password' id='password' className='form-control' />
          <p className='text-danger pt-2'>{RegisterFormik.errors.password}</p>
        </div>
        <div className="my-2">
          <label htmlFor="rePassword" className='mb-2'>rePassword</label>
          <input onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} type="password" name='rePassword' id='rePassword' className='form-control' />
          <p className='text-danger pt-2'>{RegisterFormik.errors.rePassword}</p>
        </div>
        <div className="my-2">
          <label htmlFor="phone" className='mb-2'>Phone</label>
          <input onBlur={RegisterFormik.handleBlur} onChange={RegisterFormik.handleChange} type="tel" name='phone' id='phone' className='form-control' />
          <p className='text-danger pt-2'>{RegisterFormik.errors.phone}</p>
        </div>
        {loading ? <button text='button' className='btn btn-success ms-auto d-block'>
          <Audio
            height="20"
            width="20"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </button> : <button disabled={!(RegisterFormik.isValid && RegisterFormik.dirty)} text='submit' className='btn btn-success ms-auto d-block w-100 mb-2'>Register</button>}
        {errorMessage === '' ? null : <div className='alert alert-danger'>{errorMessage}</div>}

      </form>
    </div>
  )
}
