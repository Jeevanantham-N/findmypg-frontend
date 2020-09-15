import React,{useState,useEffect} from 'react';
import './PGimages.css'
import Service from './Service';
import {Link} from 'react-router-dom';

const PGdetails = ({id}) => {
    const [pg,setPG] = useState([])
    const decrypt = "data:image/png;base64,"
    useEffect(()=>{
        Service.getPG(id)
        .then((res)=> {
            console.log(res.data);
            setPG(res.data)
        })
        .catch(err=>{
            if (err.response){
                if (err.response.data.message){
                    setPG(null)
                }
            }
        })
    },[])

    if(pg === null){
        return (
            <section className="resume-section">
                <h4 className="font-weight-bold text-black-50">Not FOund <NotfoundSVG /></h4>
            </section>
        )
    } else if(pg.length === 0) {
        return (
            <section className="resume-section">
                <h4 className="font-weight-bold text-black-50">loading <LoadingSVG/></h4>
            </section>
        )
    }
    else{
        return(
            <section className="resume-section">
                <div className="container">
                    <div className="row">
                        <div id="carouselExampleIndicators" className="carousel slide m-1" data-ride="carousel">
                            <div className="carousel-inner h-auto">
                                {
                                    pg.pgImages.map((file,index) => 
                                        {
                                            return index === 0 ? 
                                                <div className="carousel-item active" key={index}>
                                                    <img src={`${decrypt}${file.profile}`} className="d-block w-100" alt=".."/>
                                                </div> :
                                                <div className="carousel-item" key={index}>
                                                    <img src={`${decrypt}${file.profile}`} className="d-block w-100" alt=".."/>
                                                </div>
                                        }
                                    )
                                }
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <Link to={`/provider/pg/${id}`} className="badge badge-danger float-right">Delete</Link>
                    <Link to={`/provider/pg/${id}`} className="badge badge-dark float-right">Update</Link>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h6 className="">{pg.address}</h6>
                            <p className="lead">{pg.about}</p>
                            <span className="badge badge-primary badge-pill">Roomsleft {pg.roomsleft}</span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function NotfoundSVG() {
    return(
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-clipboard-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 1.5H3a2 10 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zm-.354 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z"/>
        </svg>
    )
}

function LoadingSVG() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
    )
}
export default PGdetails;