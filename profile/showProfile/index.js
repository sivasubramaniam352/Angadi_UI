import React, { Component } from 'react';
import { Table } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import { withRouter } from "react-router";
import {
  Card, CardBody,
  CardTitle, Button
} from 'reactstrap';
//  import { getProfile } from './userFunction';
import './profile.css'
class ShowProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      location: '',
      DOB: '',
      gender: ''
    }
  }
  componentDidMount() {
    if(localStorage.usertoken){
    let token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    console.log(decoded);
    

    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email:decoded.email,
      phone:decoded.phone,
      gender:decoded.gender,
      DOB:decoded.DOB,
      location:decoded.location
    })
  }else{
    this.props.history.push('/login')
  }

  }
  render() {
    return (
      <div className='profile_show_container'>
        <Card>
          <CardBody>
            <CardTitle>Profile Details</CardTitle>
            <hr />
            <Table  >
              <tbody>
                <tr className='border-hide'>

                  <td>Email</td>
                  <td>{this.state.email}</td>

                </tr>
                <tr>

                  <td>First Name</td>
                  <td>{this.state.first_name}</td>

                </tr>
                <tr>

                  <td>Last Name</td>
                  <td>{this.state.last_name}</td>

                </tr>
                <tr>

                  <td>Gender</td>
                  <td>{this.state.gender}</td>

                </tr>
                <tr>

                  <td>Date Of Birth</td>
                  <td>{this.state.DOB}</td>

                </tr>
                <tr>

                  <td>Mobile</td>
                  <td>{this.state.phone}</td>

                </tr>
                <tr>

                  <td>Location</td>
                  <td>{this.state.location}</td>

                </tr>
              </tbody>
            </Table>

            <Button color='danger' href = '/EditProfile' >EDIT</Button>
          </CardBody>

        </Card>
      </div>
    )
  }
}

export default withRouter(ShowProfile);


