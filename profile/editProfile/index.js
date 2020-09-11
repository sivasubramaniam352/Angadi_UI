import React,{useState, useEffect} from 'react';
import { Col, Row,  Form, FormGroup, Label, Input  } from 'reactstrap';
import { updateProfile } from '../../LoginReg/userFunction'
import jwt_decode from 'jwt-decode'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
 import './editProfileForm.css'
 import { withRouter } from "react-router";
import axios from 'axios';

 const EditProfile = (props) =>{
   const [email, setemail] = useState({})
   const [fielsforEdit, setfielsforEdit] = useState({})
  const [resforEP, setresforEP] = useState({})
  useEffect(() => {
    if(localStorage.usertoken){
      let token = localStorage.usertoken;
    const decoded = jwt_decode(token);
      setemail(decoded.email)
    }
    else{
      props.history.push('/login')
    }
    
  
  }, [])

  const changeHandlerEditP =(e) =>{
    setfielsforEdit(({...fielsforEdit, [e.target.name]:e.target.value}))
  }
  const submitHandler =(e) =>{
    e.preventDefault()
  axios.post('http://localhost:8000/api/userUp',{email:email, ...fielsforEdit })
    .then(data =>{
      console.log(data)
      localStorage.removeItem('usertoken');
      localStorage.setItem('usertoken', data.data)
      props.history.push('/ShowProfile')
    })
    .catch(err =>{
      console.log(err.response.data);
      setresforEP(err.response.data)
    })
  }
  return(
    <div className='profile-edit-container'>
      
      <Card>
          <CardBody>
          <CardTitle>Edit Profile </CardTitle>
          <hr/>
          <Row>
            <Col md='12' lg='12'>
           <b className={'Err-res-Reg'}> {resforEP.message}</b>
            </Col>
          </Row>
          <Form onSubmit = {submitHandler}> 
          <Row form>
  <Col md={6}>
    <FormGroup >
      <Label for="exampleEmail">Email</Label>
      <Input type="email" name="email"  value={email} placeholder="with a placeholder" disabled />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="examplePassword">Password</Label>
      <Input type="password" name="password" onChange={changeHandlerEditP} placeholder="password placeholder" />
    </FormGroup>
  </Col>
       </Row>
        
          <CardTitle>General Information </CardTitle>
          <hr/>
        
      <FormGroup>
        <Label for="exampleAddress">First Name</Label>
        <Input type="text" name="first_name"  placeholder="First Name" onChange={changeHandlerEditP}/>
      </FormGroup>

      <FormGroup>
        <Label for="exampleAddress">Last Name</Label>
        <Input type="text" name="last_name"  placeholder="Last Name"onChange={changeHandlerEditP}/>
      </FormGroup>
         
          <FormGroup>
  <Label for="exampleAddress">Date Of Birth</Label>
  <Input type="text" name="DOB"  placeholder="dd/mm/yyyy"onChange={changeHandlerEditP}/>
</FormGroup>
<FormGroup>
  <Label for="exampleAddress">Mobile NO</Label>
  <Input type="number" name="phone"  placeholder="Mobile"onChange={changeHandlerEditP}/>
</FormGroup>
<FormGroup>
  <Label for="exampleAddress">Location</Label>
  <Input type="text" name="location"  placeholder="location"onChange={changeHandlerEditP}/>
</FormGroup>
<Row className="radio" form>
              <Col md={6}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    // checked={regFields.selectedOption === "male"}
                    onChange={changeHandlerEditP}
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
                    onChange={changeHandlerEditP}
                  />
                  &nbsp; Female
                </label>
              </Col>
            </Row>
<Row>
  <Col><Button href = '/ShowProfile'>Cancel</Button></Col>
  <Col><Button color='danger' type='submit'>Submit</Button></Col>
</Row>
</Form>
</CardBody>
      </Card>
      </div>
  );
 }
export default withRouter(EditProfile);