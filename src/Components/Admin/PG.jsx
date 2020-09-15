import React,{useState,useEffect} from 'react';
import Service from './Service';
import {Link} from 'react-router-dom';

function PG() {
    const [pgs,setPG] = useState([])
    useEffect(()=>{
        Service.getPGs()
        .then((res)=> {
            setPG(res.data)
        })
        .catch(err=>console.log(err))
    },[])
     
    if (pgs.length !== 0 ) {
    return (
        <section className="resume-section">
            <div class="list-group">
                {
                    pgs.map(pg => 
                        <Link to={`/provider/pg/${pg.id}`} 
                        class="list-group-item list-group-item-action flex-column align-items-start"
                        key={pg.id}>
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1 font-weight-bold text-capitalize text-center">{pg.address}</h5>
                            </div>
                            <p class="mb-1 text-capitalize">{pg.about}</p>
                            <span class="badge badge-primary badge-pill">Roomsleft {pg.roomsleft}</span>
                        </Link>
                    )
                }
            </div>
        </section>
        ) 
    } else {
        return (
        <section className="resume-section">
            <h4 className="font-weight-bold text-black-50">loading <LoadingSVG /></h4>
        </section>
        )
    }
}

function LoadingSVG() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
    )
}

export default PG;