import React,{useState} from 'react'
import {Formik,Form,ErrorMessage,Field,useField} from 'formik';
import * as yup from 'yup'
import * as email from 'emailjs-com'
import Service from './Service'
import {generateOTP} from 'otp-agent';
import alertify from 'alertifyjs'

const MyTextArea = ({label, ...props}) => {
    const [field] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-control" {...field} {...props} />
        </>
    )
  }

export default function CreateAccount(props) {
    console.log(props)
    const [isclick,setClick] = useState(false)
    const [isVerified,setVerified] = useState(false)
    const [btnVal,setBtnVal] = useState("Create")
    // const random = generateOTP(4, { numbers: true, alphabets: false, upperCaseAlphabets: false, specialChars: false })
    const OTP = 123


    const initialValues = {
        name:"",
        username:"",
        address:"",
        contact:'',
        email:"",
        password:"",
        otp:0
    }

    const validationSchema = yup.object({
        name:yup.string().required("Required..."),
        username:yup.string().required("Required..."),
        address:yup.string().required("Required..."),
        contact:yup.number().required("Required..."),
        password:yup.string().required("Required..."),
        otp:yup.number().required("Required...").test('match',"Invalid OTP",otp=>{
            if(otp===OTP){
                setVerified(true)
                return true
            }
            else{
                setVerified(false)
                return false                
            }
        }),
        email:yup.string().required("Required...").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/,'Invalid mail')
    })

    const onSubmit = (provider) => {
        setBtnVal("Creating...")
        Service.addProvider(provider).then((res) => {
            console.log(res)
            alertify.set('notifier','position', 'top-center')
            alertify.success('account created')    
            window.location.replace("/account/login")
        }).catch(()=> {
            setBtnVal("Create")
            alertify.set('notifier','position', 'top-center')
            alertify.error('Invalid Information')    
        })
    }
    const sendOTP = () => {
        setClick(true)
        const templatePrams = {
            from_name:"findmyPG",
            to_name:initialValues.email,
            subject:"findmyPG Email Verification",
            message_html:generateOTP
        }
        email.send(
            "gmail",
            "template_Lg08WAAG",
            templatePrams,
            "user_aKxF1QSlL5PasziNQ0gxP"
        )
    }

    return (
        <div className="resume-section-content col-sm-5 ml-5">
            <h5>Create Account</h5>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    props => {
                        return (
                            <Form>
                                <label htmlFor="name">Name:</label>
                                <Field type="text" className="form-control" name="name" id="name" placeholder="Name"autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="name" /></p>
                                
                                <label htmlFor="username">Username:</label>
                                <Field type="text" className="form-control" name="username" id="username" placeholder="Username"autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="username" /></p>
                                
                                <MyTextArea label="address" name="address" rows="6" placeholder="Address? city? state?"/>
                                <p className="text-danger mb-1"><ErrorMessage name="address" /></p>
                                
                                <label htmlFor="contact">Contact:</label>
                                <Field type="number" className="form-control" name="contact" id="contact" placeholder="Contact" autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="contact" /></p>
                                
                                <label htmlFor="email">Email:</label>
                                <Field type="email" className="form-control" name="email" id="email" placeholder="jevvjeeva001@findmypg.com"autoComplete="off"/>
                                <button type="button" className="btn btn-link float-right" onClick={sendOTP} disabled={!props.touched.email || props.errors.email}>Send OTP?</button>
                                <p className="text-danger mb-1"><ErrorMessage name="email" /></p>
                                
                                <div className={ isclick ? "d-block":"d-none" }>
                                    <label htmlFor="otp">OTP:</label>
                                    <Field type="number" className="form-control" name="otp" id="otp" placeholder="otp"autoComplete="off"/>
                                    <p className="text-danger mb-1"><ErrorMessage name="otp" /></p>
                                </div>

                                <label htmlFor="role">Password:</label>
                                <Field type="password" className="form-control" name="password" id="password" placeholder="Password"autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="password" /></p>
                                <button type="submit" className="btn btn-success mt-4 d-flex float-right" disabled={!props.isValid || props.isSubmitting || !isclick || !isVerified}>{btnVal}</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}