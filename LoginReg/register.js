import React, { useState, useEffect} from 'react'
import {Card,CardBody, Col, Row, Button, Form, FormGroup,Input } from 'reactstrap';
import axios from 'axios'

import { register } from "./userFunction";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './RegStyle.css';
import { withRouter } from "react-router";


const Register = (props) =>{
  const [regFields, setRegFields] = useState({})
  const [ResforReg, setResforReg] = useState({})
  const changeHandlerReg =(e) =>{
    setRegFields(({...regFields, [e.target.name]:e.target.value}))
    
    
  }
  const submitHandlerReg =(e) =>{
    e.preventDefault()
    console.log(regFields);
   axios.post('http://localhost:8000/api/userReg',{...regFields})
    .then( (data)=> 
      props.history.push('/login')
      ).catch(err =>{
        setResforReg(err.response.data)
      })
   
  }
  return(
    <div className="registerBackgroud">
      <Card className="registerForm">
        <h3 className="regHeading">Signup in Angadi</h3>
        <br />
        <Row>
          <Col md={'12'} >
           <b className={'Err-res-Reg'}>  {ResforReg.message}</b>
          </Col>
        </Row>
        <CardBody>
          <Form noValidate onSubmit={submitHandlerReg}>

            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="text"
                    name="first_name"
                    // value={regFields.first_name}
                 
                    placeholder="First Name"
                    onChange={changeHandlerReg}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="text"
                    name="last_name"
                    // value={regFields.last_name}
                 
                    placeholder="Last Name"
                    onChange={changeHandlerReg}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    // value={regFields.email}
                 
                    placeholder="Your Email Address"
                    onChange={changeHandlerReg}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                   
                    placeholder="Choose Password"
                    // value={regFields.password}
                    onChange={changeHandlerReg}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="number"
                    name="phone"
                   
                    placeholder="Mobile Number"
                    // value={regFields.phone}
                    onChange={changeHandlerReg}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <Row className="radio">
              <Col md={6}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    // checked={regFields.selectedOption === "male"}
                    onChange={changeHandlerReg}
                  />
                  &nbsp; Male
                </label>
              </Col>
              <Col md={6}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    // checked={regFields.selectedOption === "female"}
                    onChange={changeHandlerReg}
                  />
                  &nbsp; Female
                </label>
              </Col>
            </Row>
            <hr />
            <Button color="danger" className="rsignButton" type="submit">
              Register
            </Button>
            <p className="regHeading">
              Already Register?&nbsp;
              <span className="loginLink">
                <a href="/login" className="loginLink">
                  Login
                </a>
              </span>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default withRouter( Register )