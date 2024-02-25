import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'



export default function ForgetPassword() {
    let [error, setErrorMsg] = useState('')
    let [isLoading, setLoading] = useState(false)
    let nav = useNavigate()


    async function submitForget(value) {
        setLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value).catch((err) => {
            setErrorMsg(err.response.data.message)
            setLoading(false)
        })
        if (data.statusMsg === 'success') {
            setLoading(false)
            document.getElementById('resetCode').classList.remove('d-none')
            document.getElementById('forgetPassword').classList.add('d-none')
        }

    }
    async function resetCode(value) {
        setLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch((err) => {
            setErrorMsg(err.response.data.message)
            setLoading(false)
            console.log(data);
        })
        if(data.status === 'Success'){
            nav('/ResetPassword')
        }
        


    }



    let validationSchema = Yup.object({
        email: Yup.string().email('Enter Email Valid').required('Email is required')
    })


    let ForgetFormik = useFormik({
        initialValues: {
            email: ''
        }, validationSchema,
        onSubmit: submitForget
    })
    let validationSchema2 = Yup.object({
        resetCode: Yup.string().matches(/^[0-9]+$/, 'code must be only numbers').required('reset code is required')
    })


    let resetFormik = useFormik({
        initialValues: {
            resetCode: ''
        }, validationSchema: validationSchema2,
        onSubmit: resetCode
    })


    return (
        <>
            <div id='forgetPassword' className="py-5 w-75 mx-auto">
                {error === '' ? null : <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={ForgetFormik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input onChange={ForgetFormik.handleChange} onBlur={ForgetFormik.handleBlur} type="email"
                        id='email' name='email' className='form-control w-50 mt-2' />
                    {ForgetFormik.touched.email ? <p className='text-danger'>{ForgetFormik.errors.email}</p> : ''}
                    {isLoading ? <button text='button' className='btn btn-success'>
                        <CirclesWithBar
                            height="30"
                            width="70"
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            outerCircleColor=""
                            innerCircleColor=""
                            barColor=""
                            ariaLabel='circles-with-bar-loading'
                        />
                    </button> : <button disabled={!(ForgetFormik.dirty && ForgetFormik.isValid)} text='submit'
                        className='btn btn-success my-2'>Verify Code</button>}
                </form>
            </div>
            <div id='resetCode' className="d-none py-5 w-75 mx-auto">
                {error === '' ? null : <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={resetFormik.handleSubmit}>
                    <label htmlFor="resetCode">Reset Code</label>
                    <input onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} className='form-control 
                       w-50 mt-2' type="text" id='resetCode' name='resetCode' />
                    {resetFormik.touched.resetCode ? <p className='text-danger'>{resetFormik.errors.resetCode}</p> : ''}
                    {isLoading ? <button text='button' className='btn btn-success'>
                        <CirclesWithBar
                            height="30"
                            width="70"
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            outerCircleColor=""
                            innerCircleColor=""
                            barColor=""
                            ariaLabel='circles-with-bar-loading'
                        />
                    </button> : <button disabled={!(resetFormik.dirty && resetFormik.isValid)} text='submit'
                        className='btn btn-success my-2'>Verify Code</button>}

                </form>
            </div>

        </>
    )
}
