import React, { useState } from 'react';
import * as yup from 'yup'
import {ErrorMessage,Formik,Form,Field, useField} from 'formik'
import alertify from 'alertifyjs';
import Service from './Service'

function PGdetailsUpdate({id}) {
    const [files,setFiles] = useState([])
    const [btnVal,setBtnVal] = useState("Update")
    let pgId = null
    const initialValues = {
        pgInfo:{
            id:id,
            address:"",
            roomscount:"",
            roomsleft:"",
            about : ""
        }
    }
    const validationSchema = yup.object({
        pgInfo:yup.object({
            address:yup.string().required("Required..."),
            about:yup.string().required("Required..."),
            roomscount:yup.number().required("Required..."),
            roomsleft:yup.number().required("Required...").max(yup.ref('roomscount'),'Invalid')
        })
    })
    const handleSetfile = (event) => {
        const eventFiles = event.target.files
        setFiles(eventFiles)
    }
    const onSubmit= (values) => {
        setBtnVal("Updating...")
        Service.updatePG(values.pgInfo,id).then((res) => {
            pgId = res.data.id
        }).catch(() => {
            setBtnVal("Update")
            alertify.set('notifier','position', 'top-center')
            alertify.warning("Invalid Details")
        }).then(() => {
            if (files !== null){
                const formData = new FormData()
                for (let index = 0; index < files.length; index++) {
                    formData.append("files",files[index])
                }
                Service.addPGimages(formData,pgId).then(()=> {
                    alertify.set('notifier','position', 'top-center')
                    alertify.message("Created")
                    window.location.replace("/")
                }).catch(err => console.log(err))
            }
        })
    }
                                                                        
    return (
        <section className="resume-section">
        <div className="resume-section-content col-sm-5">
            <h4>Create PG</h4>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    props => {
                        return (
                            <Form autoComplete="off">
                                <MyTextArea label="Address" name="pgInfo.address" rows="6" placeholder="Address? city? state?"/>
                                <p className="text-danger mb-1"><ErrorMessage name="pgInfo.address" /></p>
                                <label htmlFor="role">Roomscount:</label>
                                <Field type="number" className="form-control" name="pgInfo.roomscount" id="pgInfo.roomscount" placeholder="Roomscount"/>
                                <p className="text-danger mb-1"><ErrorMessage name="pgInfo.roomscount" /></p>
                                <label htmlFor="role">Roomsleft:</label>
                                <Field type="number" className="form-control" name="pgInfo.roomsleft" id="pgInfo.roomsleft" placeholder="Roomsleft"/>
                                <p className="text-danger mb-1"><ErrorMessage name="pgInfo.roomsleft" /></p>
                                <MyTextArea label="About PG" name="pgInfo.about" rows="6" placeholder="About PG? Features?"/>
                                <p className="text-danger mb-1"><ErrorMessage name="pgInfo.about" /></p>
                                <label htmlFor="role">PG Images:</label>
                                <input type="file" className="form-control btn btn-dark" id="file" accept=".jpg, .jpeg, .png" 
                                onChange={handleSetfile} required multiple/>
                                <button type="submit" disabled={!props.isValid || props.isSubmitting} className="btn btn-dark mt-4 d-flex float-right">{btnVal}</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
        </section>
    );
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

export default PGdetailsUpdate;