import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../Context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'



export default function CheckOut() {
    let nav = useNavigate()
    let headers = localStorage.getItem("userToken");


    let { checkPayment } = useContext(CartContext)
    let validationSchema = Yup.object({
        details: Yup.string().required('details Required'),
        phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "Phone not Valid"),
        city: Yup.string().required('city Required')
    })
    let { id } = useParams()

    let checkOutFormik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        }, validationSchema,
        onSubmit: function (val) {
            submitCheckOut(val)
        }
    })

    async function submitCheckOut(val) {
        let { data } = await checkPayment(id, val)
        console.log(data);
        if (data.status === 'success') {
            window.location.href = data.session.url
        }
    }


    async function payCash(id) {
        const detailsValue = document.querySelector('#details').value
        const phoneValue = document.querySelector('#phone').value
        const cityValue = document.querySelector('#city').value

        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        };
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${id}`, shippingAddress,
                {
                    headers: {
                        token: headers,
                    },
                }
            );
            console.log(data);
            if (data.status === 'success') {
                toast.success('Order successfully initialized')
                nav('/allorders')
            }
            else {
                toast.error('Error on crating order')
            }
        } catch (error) {
            console.log("error", error);

        }

    }

    return (
        <div className='py-5 w-75 mx-auto'>
            <Helmet>
                <title>Add Checkout Address</title>
                <meta name="description" content="Checkout Address Page" />
            </Helmet>
            <h2 className='text-main pb-3'>Shipping Details : </h2>
            <form onSubmit={checkOutFormik.handleSubmit}>
                <label htmlFor="details">Details</label>
                <input id='details' onChange={checkOutFormik.handleChange} onBlur={checkOutFormik.handleBlur}
                    type="text" name='details' className='form-control' />
                <p className='text-danger pt-2'>{checkOutFormik.errors.details}</p>
                <label htmlFor="phone">Phone</label>
                <input id='phone' onChange={checkOutFormik.handleChange} onBlur={checkOutFormik.handleBlur}
                    type="tel" name='phone' className='form-control' />
                <p className='text-danger pt-2'>{checkOutFormik.errors.phone}</p>
                <label htmlFor="city">City</label>
                <input id='city' onChange={checkOutFormik.handleChange} onBlur={checkOutFormik.handleBlur}
                    type="text" name='city' className='form-control' />
                <p className='text-danger pt-2'>{checkOutFormik.errors.city}</p>
                <div className='d-flex justify-content-center flex-column gap-2 align-items-center'>
                    <button onClick={() => payCash(id)} type='button' className='btn btn-success w-100'>Pay Cash</button>
                    <button text='submit' className='btn btn-success w-100'>Pay by Credit Card
                        <i className='fa-brands fa-cc-visa ps-2 mt-2'></i>
                        <i className='fa-brands fa-cc-mastercard ps-2 mt-2'></i>
                        <i className='fa-brands fa-cc-paypal ps-2 mt-2'></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
