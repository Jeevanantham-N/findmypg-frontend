import React,{useState} from 'react'
import * as yup from 'yup'
import {ErrorMessage,Formik,Form,Field} from 'formik'
import alertify from 'alertifyjs';
import {Link} from 'react-router-dom'
import Service from './Service'
import ProviderDetailsSession from './ProviderDetailsSession';

export default function Login({onChange}) {
    const [btnVal,setBtnVal] = useState("Log In")

    const initialValues = {
        login:{
            username:"",
            password:""
        }
    }

    const validationSchema = yup.object({
        login:yup.object({
            username:yup.string().required("Required..."),
            password:yup.string().required("Required...")
        })
    })

    const onSubmit = (provider) => {
        setBtnVal("Logging In")
        Service.verifyProvider(provider.login).then(res => {
            if (res.data.username) {
                ProviderDetailsSession.setProviderdetails(res.data)
                ProviderDetailsSession.setExpirationTime()
                onChange()
                window.location.replace("/")
            }          
        }).catch(() => {
            setBtnVal("Log In")
            alertify.set('notifier','position', 'top-center')
            alertify.warning("Invalid Data")
        })
    }

    return (
        <section className="resume-section">
        <div className="resume-section-content col-sm-5">
            <h4>Login</h4>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    props => {
                        return (
                            <Form>
                                <label htmlFor="role">Username:</label>
                                <Field type="text" className="form-control" name="login.username" id="login.username" placeholder="Username"autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="login.username" /></p>
                                <label htmlFor="role">Password:</label>
                                <Field type="password" className="form-control" name="login.password" id="login.password" placeholder="Password" autoComplete="off"/>
                                <p className="text-danger mb-1"><ErrorMessage name="login.password" /></p>
                                <Link to="/account/forgot" className="float-left">Forgot Password</Link><br/>
                                <Link to="/provider/account/create" className="float-left">Create Account</Link>
                                <button type="submit" disabled={!props.isValid || props.isSubmitting} className="btn btn-dark mt-4 d-flex float-right">{btnVal}</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
        </section>
    )
}