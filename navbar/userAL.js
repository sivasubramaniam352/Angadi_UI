import React, { Component } from 'react'

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col
  } from 'reactstrap';
  import jwt_decode from 'jwt-decode'
import { push } from 'connected-react-router';
export class Example extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
            name:''
        }
    }

    componentDidMount() {
      
        let token = localStorage.usertoken;
    const decodedToken = jwt_decode(token);

    this.setState({
        first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
      
    })

    }
    logoutHandler(){
        localStorage.removeItem('usertoken');
    
    }
    render() {
        return (
            <div>
                <Card >
                    <CardBody>
                        <CardTitle>
                            Hello {this.state.first_name + this.state.last_name}!<br/>
                            <Button href="/OrderStatus">your Orders</Button>
                        </CardTitle>

                        <Row>
                            <Col md='6'>
                            <Button onClick = {this.logoutHandler}>Log Out</Button>
                            </Col>
                            <Col md='6'>
                            <Button href = 'ShowProfile'>Profile</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Example
