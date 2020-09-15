import React, { useState, useEffect } from 'react';
import './PGimages.css'
import Service from './Service';

function PGs() {
    const [current,setCurrent] = useState(1)
    const [pgs,setPG] = useState([])
    const [id,setId] = useState(null)
    const handlecurrentChange = (val,id,e) => {
        console.log(e)
        console.log(id);
        setId(id)
        setCurrent(val)
    }
    useEffect(()=>{
        Service.getPGs()
        .then((res)=> {
            console.log(res.data)
            setPG(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    return (
        <section className="resume-section">
        <div className="card">
            <RenderCurrent current={current} pgs={pgs} oncurrentChange = {handlecurrentChange} id={id}/>
        </div>
        </section>
    );
}
function PGdetails({pg}) {
    return (
        <div className="card">
            <div className="card-header font-weight-bold text-capitalize">
                {pg.address}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                <p className="text-capitalize">{pg.about}</p>
                <footer className="blockquote-footer text-capitalize">roomsleft {pg.roomsleft}</footer>
                </blockquote>
            </div>
        </div>
    )
}
function NavList({current,oncurrentChange,pg}) {
    const className = "btn btn-light"
    return (
        <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
                <button className={current===1? "btn btn-dark":className} id={pg.id} onClick={oncurrentChange.bind(this,1,pg.id)}>Details</button>
            </li>
            <li className="nav-item">
                <button className={current===2? "btn btn-dark":className} id={pg.id} onClick={oncurrentChange.bind(this,2,pg.id)}>images</button>
            </li>
            <li className="nav-item">
                <button className={current===4? "btn btn-dark":className} id={pg.id} onClick={oncurrentChange.bind(this,4,pg.id)}>
                    <UpdateBtnsvg />
                </button>
            </li>
            <li className="nav-item">
                <button className={current===5? "btn btn-dark":className} id={pg.id} onClick={oncurrentChange.bind(this,5,pg.id)}>
                    <DeleteBtnsvg />
                </button>
            </li>
        </ul>
    )
}
function RenderCurrent({current,pgs,oncurrentChange,id}) {
    if (current===1){
        return(
            pgs.map( pg => 
                <React.Fragment  key={pg.id}>
                    <div className="card-header">
                        <NavList oncurrentChange = {oncurrentChange} current={current} pg={pg}/>
                    </div>
                    <PGdetails pg={pg}/>
                </React.Fragment>
            )
        )
    }
    else if (current === 2){
        const decodekey = "data:image/png;base64," 
        return(
            pgs.map( pg => 
                <React.Fragment key={pg.id}>
                    <div className="card-header">
                        <NavList oncurrentChange = {oncurrentChange} current={current} pg={pg}/>
                    </div>
                   {
                    pg[id] === id ? 
                        pg.pgImages.map(file =>
                            <div className="row">
                                <div className="column">
                                    <img src={`${decodekey} ${file.profile}`} alt=""/>
                                </div>
                            </div>
                        ) 
                    : <PGdetails pg={pg}/>
                    }
                </React.Fragment>
            )
        )
    }
}

function UpdateBtnsvg (){
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
    )
}

function DeleteBtnsvg (){
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bucket" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0h8.945a4.5 4.5 0 0 0-8.945 0zm9.892 1H2.581l1.286 8.574A.5.5 0 0 0 4.36 15h7.278a.5.5 0 0 0 .494-.426L13.42 6z"/>
        </svg>
    )
}

function Example() {
    return (
        [...Array(5)].map((e,i) => 
            <React.Fragment key={i}>
                <div id={`accord${i}`} role="tablist" aria-multiselectable="true">
                    <div class="card">
                        <div class="card-header" role="tab" id="section1HeaderId">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" data-parent={`#accord${i}`} href={`#section1${i}`} aria-expanded="true" aria-controls="section1ContentId">
                          Section 1
                        </a>
                            </h5>
                        </div>
                        <div id={`#section1${i}`} class="collapse in" role="tabpanel" aria-labelledby="section1HeaderId">
                            <div class="card-body">
                                Section 1 content
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" role="tab" id="section2HeaderId">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" data-parent={`#accord${i}`} href={`#section2${i}`} aria-expanded="true" aria-controls="section2ContentId">
                          Section 2
                        </a>
                            </h5>
                        </div>
                        <div id={`#section2${i}`} class="collapse in" role="tabpanel" aria-labelledby="section2HeaderId">
                            <div class="card-body">
                                Section 2 content
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        
    )
}
export default Example;