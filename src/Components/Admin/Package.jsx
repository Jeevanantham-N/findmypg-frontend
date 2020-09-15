import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import Account from './Account'
import Carousel from './Carousel'
import Login from './Login'
import Navbar from './Navbar'
import Register from './Register'
import Detailsupdate  from './Detailsupdate'
import ProviderDetailsSession from './ProviderDetailsSession'
import Service from './Service'
import CreatePG from './CreatePG'
import PG from './PG'
import PGdetails from './PGdetails';
import PGdetailsUpdate from './PGdetailsUpdate';

export default class Package extends Component {
    state = {
        isLogged : ProviderDetailsSession.getjwtToken() ? true:false,
        providerDetails : null,
        profile : null
    }
    handleChange = () => {
        this.setState({
            isLogged:true,
            providerDetails:ProviderDetailsSession.getproviderDetails(),
            profile:ProviderDetailsSession.getproviderProfile()
        })
    }
    componentWillMount(){
        if (ProviderDetailsSession.getjwtToken()){
            const providerDetails = ProviderDetailsSession.getproviderDetails();
            const profile = ProviderDetailsSession.getproviderProfile()
            if (profile === null) {
                this.setState({profile})
            } else {
                this.setState({profile:`data:image/png;base64,${profile}`})
            }
            this.setState({isLogged:true,providerDetails})
        }
    }
    providerLogout = () => {
        ProviderDetailsSession.removeProviderdetails()
        this.setState({isLogged:false},()=> window.location.replace("/"))
    }
    handleDeleteAct = () => {
        Service.deleteProvider().then(()=> {
            this.providerLogout()
        })
    }
    handleUpdateProfile = (file) => {
        const formData = new FormData() 
        formData.append("file",file)
        Service.updateProfile(formData)
        .then((res) =>{
            ProviderDetailsSession.setNewProviderProfile(res.data.profile)
            this.setState({profile:`data:image/png;base64,${res.data.profile}`})
        })
        .catch((res)=>console.log(res))
    }

    render() {
        return (
            <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact strict>
                        <Navbar 
                        isLogged={this.state.isLogged} 
                        profile = {this.state.profile} 
                        providerLogout = {this.providerLogout} 
                        onUpdateProfile={this.handleUpdateProfile}/>
                        {
                            !this.state.isLogged && <React.Fragment>
                                <Carousel />
                                <Login onChange = {this.handleChange}/>
                            </React.Fragment>
                        }
                    </Route>
                    <Route path="/">
                        <Navbar 
                        isLogged = {this.state.isLogged} 
                        profile = {this.state.profile} 
                        providerLogout = {this.providerLogout}
                        onUpdateProfile={this.handleUpdateProfile}/>
                            <Route path="/provider/account/create" exact>
                                <div className="container">
                                    <Register/>
                                </div>
                            </Route>
                            <Route path="/provider/account" exact>
                                {
                                    this.state.isLogged ?<div className="container">
                                                            <Account providerDetails = {this.state.providerDetails} onDeleteAct = {this.handleDeleteAct}/>
                                                        </div> : <Redirect to="/provider/account/login"/>
                                }
                            </Route>
                            <Route path="/provider/account/update" exact >
                                {
                                    this.state.isLogged ?<div className="container">
                                                            <Detailsupdate details = {this.state.providerDetails}/>
                                                        </div> : <Redirect to="/provider/account/login"/>
                                }                                
                            </Route>
                            <Route path="/pg/create" exact >
                                {
                                    this.state.isLogged ?<div className="container">
                                                            <CreatePG/>
                                                        </div> : <Redirect to="/provider/account/login"/>
                                }                                
                            </Route>
                            <Route path="/provider/pg" exact >
                                {
                                    this.state.isLogged ?<div className="container">
                                                            <PG />
                                                        </div> : <Redirect to="/provider/account/login"/>
                                }                                
                            </Route>
                            <Route path="/provider/pg/:id/" strict render={(props)=> (
                                this.state.isLogged ?<div className="container">
                                    <PGdetails id={props.match.params.id}/>
                                </div> : <Redirect to="/provider/account/login"/>
                            )} />
                            <Route path="/provider/pg/:id" exact strict render={(props)=> (
                                this.state.isLogged ?<div className="container">
                                    <PGdetailsUpdate id={props.match.params.id}/>
                                </div> : <Redirect to="/provider/account/login"/>
                            )} />
                            <Route path="/provider/account/login" exact >
                                {
                                    this.state.isLogged ?
                                    <Redirect to="/"/>
                                    :<div className="container-fluid p-0">
                                        <Login onChange = {this.handleChange}/>
                                    </div>
                                }                                
                            </Route>
                            <Route path="/about" exact >
                                <Carousel />
                            </Route>
                    </Route>
                </Switch>
            </BrowserRouter>
            </> 
        )
    }
}