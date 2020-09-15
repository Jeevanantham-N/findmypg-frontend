import React from 'react'
import Desert from './images/Desert.jpg'

export default function Carousel() {
    return (
        <React.Fragment>
        <div className="container contenedor-slide">
            <div className="container contenedor-slide mt-3">

            <div id="carouselExampleControls" className="carousel slide " data-ride="carousel" data-interval="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={Desert} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={Desert} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={Desert} alt="Third slide"/>
                    </div>
                    <div className="carousel-item">
                    <div className="carousel-video-inner embed-responsive embed-responsive-16by9">
                        <div id="video-player" data-video-id="N3AkSS5hXMA"></div>
                    </div>
                    </div>
                </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>
        </div>
        </div>
    </React.Fragment>
   )
}