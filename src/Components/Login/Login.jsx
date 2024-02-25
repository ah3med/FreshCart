import { useFormik } from 'formik'
import React, {useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Login({ saveUserData }) {
  let baseUrl = "https://ecommerce.routemisr.com"
  let [errorMessage, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()

  async function submitLogin(values) {
    console.log(values);
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, values).catch((err) => {
      setErrMsg(err.response.data.message)
      console.log(err);
      setLoading(false)
    })
    console.log(data);
    if (data.message === "success") {
      localStorage.setItem('userToken', data.token)
      saveUserData(data.user)
      nav('/')
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Enter Email Valid').required('Email is required'),
    password: Yup.string().required("Password Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Password")

  })


  let LoginFormik = useFormik({
    initialValues: {

      email: '',
      password: ''

    }, validationSchema,
    onSubmit: submitLogin
  })






  return (
    <div className='py-5 w-75 mx-auto'>
      <Helmet>
        <title>Log in</title>
        <meta name="description" content="Log in Page" />
      </Helmet>
      <h2 className=' fw-bolder mb-3'>Login Form : </h2>
      {errorMessage === '' ? null : <div className='alert alert-danger'>{errorMessage}</div>}
      <form onSubmit={LoginFormik.handleSubmit}>

        <div className="my-2">
          <label htmlFor="email">Email</label>
          <input onBlur={LoginFormik.handleBlur} onChange={LoginFormik.handleChange} type="email" name='email' id='email' className='form-control' />
          <p className='text-danger pt-2'>{LoginFormik.errors.email}</p>
        </div>
        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input onBlur={LoginFormik.handleBlur} onChange={LoginFormik.handleChange} type="password" name='password' id='password' className='form-control' />
          <p className='text-danger pt-2'>{LoginFormik.errors.password}</p>
        </div>

        <Link className='text-success' to='/ForgetPassword'>forget password..?</Link>
        {loading ? <button text='button' className='btn btn-success ms-auto d-block'>
          <CirclesWithBar
            height="30"
            width="40"
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel='circles-with-bar-loading'
          />
        </button> : <button disabled={!(LoginFormik.isValid && LoginFormik.dirty)} text='submit' className='btn btn-success ms-auto d-block w-100 mt-2'>Login</button>}


      </form>
    </div>
  )
}
