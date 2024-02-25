import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'



export default function ResetPassword() {
    let nav = useNavigate()
    let [error, setErrorMsg] = useState('')
    let validationSchema = Yup.object({
        email: Yup.string().email('Enter Email Valid').required('Email is required'),
        newPassword: Yup.string().required("Password Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Password")
    })
    let ResetPasswordFormik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''

        },
        validationSchema,
        onSubmit: ResetPassword
    })

    async function ResetPassword(value) {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value).catch((err) => {
            setErrorMsg(err.response.data.message)
        })
        if (data.token) {
            nav('/login')
        }
    }




    return (
        <>
            <Helmet>
                <title>Reset Password</title>
                <meta name="description" content="Reset Password Page" />
            </Helmet>
            <div className='py-5 w-75 mx-auto'>
                {error === '' ? null : <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={ResetPasswordFormik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input onChange={ResetPasswordFormik.handleChange} onBlur={ResetPasswordFormik.handleBlur}
                        type="text" name='email' id='email' className='form-control w-50 mt-2' />
                    {ResetPasswordFormik.touched.email ? <p className='text-danger'>{ResetPasswordFormik.errors.email}</p> : ''}
                    <label htmlFor="newPassword"> New Password</label>
                    <input onChange={ResetPasswordFormik.handleChange} onBlur={ResetPasswordFormik.handleBlur}
                        type="password" id='newPassword' name='newPassword' className='form-control w-50 mt-2' />
                    {ResetPasswordFormik.touched.newPassword ? <p className='text-danger'>{ResetPasswordFormik.errors.newPassword}</p> : ''}
                    <button text="submit" disabled={!(ResetPasswordFormik.dirty && ResetPasswordFormik.isValid)} className='btn btn-success'>Reset Password</button>
                </form>
            </div>


        </>
    )
}
