import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Service from './Service';
import $ from 'jquery';
import ProviderDetailsSession from './ProviderDetailsSession';

export default class Navbar extends Component {
    isclassDisabled = () => this.state.isLogged ? "nav-link js-scroll-trigger" :"nav-link js-scroll-trigger btn btn-link disabled"
    state = {
        isLogged : this.props.isLogged,
        uploadDisabled : true,
        profile : this.props.profile
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.isLogged !== this.props.isLogged){
            this.setState({isLogged: this.props.isLogged})
        } if (prevProps.profile !== this.props.profile){
            this.setState({profile: this.props.profile})
        } 
    }
    passfile = () => {
        const file = $("#file")[0].files[0]
        this.props.onUpdateProfile(file)
    }
    profileHandleChange = () => {
        if (this.state.profile === null){
            this.setState({profile:ProviderDetailsSession.getproviderProfile()})
        }
        else{
            this.setState({profile:null})
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                    {
                        this.state.isLogged ? 
                        <>
                        <span className="navbar-brand js-scroll-trigger">
                        <span className="d-none d-lg-block">
                            <h5 className="d-block d-lg-none text-white-50">{ProviderDetailsSession.getUsername()}</h5></span>
                            { this.state.profile === null ? 
                                <span className="d-none d-lg-block">
                                    <input type="file" className="btn-block btn-dark" id="file" onChange={() => this.setState({uploadDisabled:false})} accept=".jpg, .jpeg, .png"/> 
                                    <button type="submit" className="btn btn-dark btn-block" disabled={this.state.uploadDisabled} onClick={this.passfile}>upload</button>
                                </span> 
                            : <span className="d-none d-lg-block" onDoubleClick={this.profileHandleChange} ><img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={this.state.profile} alt=""/></span>
                            }
                        </span>
                        </>
                        :<span className="navbar-brand js-scroll-trigger"><h5 className="text-white-50">findmyPG</h5></span>
                    }
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className={this.isclassDisabled()} to="/provider/pg">PG</NavLink></li>
                            <li className="nav-item"><NavLink className={this.isclassDisabled()} to="/pg/create">Create Pg</NavLink></li>
                            <li className="nav-item"><NavLink className={this.isclassDisabled()} to="/provider/account">Account</NavLink></li>
                            <li className="nav-item"><NavLink className={this.isclassDisabled()} to="/about">About</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link js-scroll-trigger"
                            to={this.state.isLogged ? "/provider/account/logout" : "/provider/account/login"} onClick = {this.state.isLogged ? this.props.providerLogout : () => {}}>{this.state.isLogged ? "logout" : "login"}</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}