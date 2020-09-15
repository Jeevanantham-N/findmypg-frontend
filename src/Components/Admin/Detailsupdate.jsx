import * as email from 'emailjs-com';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import { generateOTP } from 'otp-agent';
import React, { useState,useEffect } from 'react';
import * as yup from 'yup';
import alertify from 'alertifyjs';
import Service from './Service';
import ProviderDetailsSession from './ProviderDetailsSession';

export default function Register({details}) {
    const [isclick,setClick] = useState(false)
    const [file,setFile] = useState(null)
    const OTP = 123
    const initialValues = {
        password:"",
        providerDetails:{
            name:details.name,
            address:details.address,
            contact:details.contact,
            email:details.email,
            otp:''
        }
    }
    const handleSetfile = (event) => {
        const file = event.target.files[0]
        setFile(file)
    }
    const validationSchema = yup.object({
        password : yup.string().matches(/^[A-Za-z0-9_]{6,20}$/,"Not a Strong Password"),
        providerDetails:yup.object({
            name : yup.string().required("Required..."),
            contact : yup.number().required("Required..."),
            address : yup.string().required("Required..."),
            email:yup.string().required("Required...").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/,'Invalid mail').test('match','',email => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/.test(email)){
                    setClick(true)
                    return true
                }
                else{
                    setClick(false)
                    return false
                }
                
            }),
            otp:yup.number().required("Required...").test('match',"Invalid OTP",otp=>{
                if(otp===OTP){
                    return true
                }
                else{
                    return false
                }
            })
        })
    })
    const sendOTP = () => {
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
    const onSubmit = (values) => {
        Service.updateProviderDetails(values).then((res)=> {
            ProviderDetailsSession.setNewProviderdetails(res.data)
            window.location.replace("/")
        }).catch(()=>{
            alertify.set('notifier','position', 'top-center')
            alertify.warning("Invalid Details")
        }).then(() => {
            if (file !== null){
                const formData = new FormData()
                formData.append("file",file)    
                Service.updateProfile(formData).then((res)=> {
                    ProviderDetailsSession.setNewProviderProfile(res.data.profile)
                    window.location.replace("/")
            })}
        })
    }
    return (
        <section className="resume-section">
        <div className="resume-section-content col-sm-6">
            <FormikStepper initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <div>
                    <h4>Create Account</h4>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" className="form-control" name="providerDetails.name" id="name" placeholder="Name"autoComplete="off"/>
                    <p className="text-danger mb-1"><ErrorMessage name="providerDetails.name" /></p>
                    
                    <label htmlFor="contact">Contact:</label>
                    <Field type="number" className="form-control" name="providerDetails.contact" id="contact" placeholder="Contact" autoComplete="off"/>
                    <p className="text-danger mb-1"><ErrorMessage name="providerDetails.contact" /></p>

                    <MyTextArea label="Address" name="providerDetails.address" rows="6" placeholder="Address? city? state?"/>
                    <p className="text-danger mb-1"><ErrorMessage name="providerDetails.address" /></p>
                    
                    <label htmlFor="email">Email:</label>
                    <Field type="email" className="form-control" name="providerDetails.email" id="email" placeholder="jevvjeeva001@findmypg.com"autoComplete="off"/>
                    <button type="button" className="btn btn-link float-right" onClick={sendOTP} disabled={!isclick}>Send OTP?</button>
                    <p className="text-danger mb-1"><ErrorMessage name="providerDetails.email" /></p>
                    
                    <label htmlFor="otp">OTP:</label>
                    <Field type="number" className="form-control" name="providerDetails.otp" id="otp" placeholder="otp"autoComplete="off" disabled = {!isclick}/>
                    <p className="text-danger mb-1"><ErrorMessage name="providerDetails.otp" /></p>
                </div>
                <div>
                    <h4>Not Required!</h4>
                    <label htmlFor="role">Password:</label>
                    <Field type="password" className="form-control" name="password" id="password" placeholder="Password"autoComplete="off"/>
                    <p className="text-danger mb-1"><ErrorMessage name="password" /></p>
                    <label htmlFor="role">Profile:</label>
                    <input type="file" className="form-control btn btn-dark" id="file" accept=".jpg, .jpeg, .png" 
                    onChange={handleSetfile}/>
                </div>
            </FormikStepper>
        </div>
        </section>
    )
}
const MyTextArea = ({label, ...props}) => {
    const [field] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-control" {...field} {...props} />
        </>
    )
}

export function FormikStepper({ children,...props}) {
    const childrenArray = React.Children.toArray(children)
    const[step,setStep] = useState(0)
    const[disabled,setDisabled] = useState(false)
    
    return (
        <Formik {...props} onSubmit = {async (values,helpers) => {
            if (step === 2){
                setStep(step => step-1)
                setDisabled(true)
                await props.onSubmit(values,helpers)
            }
        }}>
        {
            (props) => {
                return (
                    <Form>
                        {childrenArray[step]}
                        {
                            step === 1 ? <button type="submit" className="btn btn-dark float-right m-2"
                            disabled={step+1 === childrenArray.length ? !props.isValid || props.isSubmitting || disabled : false} onClick={() => setStep(step => step+1)} >Update</button> :
                            <button className="btn btn-danger float-right m-2" onClick={() => setStep(step => step+1)}>
                            {step ===2 ? "Update":"Next"}</button>
                        }
                        {   step >= 1 && 
                            <button className="btn btn-danger float-right m-2" onClick={() => setStep(step => step-1)}>Back</button> }
                    </Form>
                )
            }
        }
        </Formik>
    )
}