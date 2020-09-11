import React, { useState } from 'react'
import {Card,CardBody, Col, Row, Button, Form, FormGroup,Input } from 'reactstrap';
import axios from 'axios'
import { withRouter } from "react-router";
import { object } from 'prop-types';

const Login =(props) =>{
  const [logFields, setLogFields] = useState({})
  const [ResforLog, setResforLog] = useState({})
  const changeHandlerLog =(e) =>{
    setLogFields(({...logFields, [e.target.name]:e.target.value}))
    
    
  }
  const submitHandlerLog =(e) =>{
    e.preventDefault()
    
   axios.post('http://localhost:8000/api/userLog',{...logFields})
    .then( data => {
      console.log(data);
      
          if  (typeof data.data === 'object') {
            console.log(data.data);
            
            localStorage.setItem('usertoken', data.data.token)
            setResforLog('')
            props.history.push('/')
   } else {
    setResforLog(('Email Or password is wrong'))
   }
   
    
  }).catch(err =>{
        console.log(err);
        
        setResforLog((err.response.data))
      })
   
  }
  return (
    <div className="registerBackgroud">
      <Card className="registerForm">
        <h3 className="regHeading">Login With Angadi</h3>
        <br />
        <Row>
          <Col md='12'>
  <b className={'Err-res-Reg'}>{ResforLog.message}</b>
          </Col>
        </Row>
        <CardBody>
          <Form noValidate onSubmit={submitHandlerLog}>
          
            <Row form>
              <Col >
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    
                    id="exampleEmail"
                    placeholder="Your Email Address"
                    onChange={changeHandlerLog}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col >
                <FormGroup>
                  <Input   type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Choose Password"
                  
                     onChange={changeHandlerLog}
                  />
                </FormGroup>
              </Col>
            </Row>
           
            
            
            <hr />
            <Button color="danger" className="rsignButton" type="submit">
              LOG IN
            </Button>
            <p className="regHeading">
              New To Angadi?&nbsp;
              <span className="loginLink">
                <a href="/register" className="loginLink">
                  Register
                </a>
              </span>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
} 
export default withRouter(Login)