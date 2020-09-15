import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import ProviderDetailsSession from './ProviderDetailsSession';

export default class Account extends Component {
    state = {
        providerDetails: this.props.providerDetails
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps !== this.props) {
            this.setState({providerDetails:this.props.providerDetails}) 
    }}

    render() {
        return (
            <section className="resume-section">
                <div className="container">
                    <h4>Welcome {this.state.providerDetails.name}</h4>
                    <table className="table table-hover table-responsive mt-5">
                        <tbody>
                            {
                                Object.entries(this.state.providerDetails).map((obj)=>
                                    <tr key={obj[0]}>
                                        <td className="bg-light font-weight-bold">{obj[0]}</td>
                                        <td>{obj[1]}</td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td>
                                    <Link to="/provider/account/update" className="btn btn-success" >Update Account</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={this.props.onDeleteAct} >Delete Account</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}