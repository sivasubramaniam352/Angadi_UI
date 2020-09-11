import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Row,Col
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserAl from '../userAL'
import '../navStyle.css'
const Example = (props) => {
const login = () => {
  window.location='/login';
}
if(localStorage.usertoken=='' || localStorage.usertoken == undefined){
 
  return (
    <div >
      <Card >
       
        <CardBody>
          <CardTitle>Welcome</CardTitle>
          <CardSubtitle>Plz Login</CardSubtitle>
         
        
         <Row>
           <Col>

           <Link to='/login' ><Button className='w-100'>Login</Button></Link>
           
           </Col>
           
           <Col>
          
           <Link to='/register'><Button className='w-100'>Register</Button></Link>
           
           </Col>
         </Row>
          
        </CardBody>
      </Card>
    </div>
  )
}
else if(typeof localStorage.usertoken === 'string'){
  return (
    <div>
      <UserAl/>

    </div>
  )
}
else{
  
}
};

export default Example;
