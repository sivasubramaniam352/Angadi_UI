import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./banner.css"
const Example = (props) => {
  return (
<Container className='foot-style footer-main-Bg' fluid={true}>
    
    <Row>
      <Col xs='3'>
          <img className='Brand-Image-Footer'src='https://image.flaticon.com/icons/svg/2152/2152488.svg'/>
      </Col>
      <Col>
        <ul >
          <li className='heading-footer'>Online Shopping</li>
        <div className='list-items'>  <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
          <li>Home & Living</li>
          <li>Gift Cards</li></div>
        </ul>
      
      </Col>
      <Col>
      <ul >
          <li className='heading-footer'>Usefull Links </li>
          <div className='list-items'>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>White Hat</li>
            <li>Privacy Policy</li>
          </div>
        </ul>
      </Col>
      <Col xs="4">
      <ul >
          <li className='heading-footer'>Experience This App</li>
         
            <Row className='Link-Images-Container'>
              <Col><img className='Link-images'src='https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png'/> </Col>
              <Col><img className='Link-images' src='https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png'/> </Col>
            </Row>
         

        </ul>
        <ul>
          <li className='heading-footer'>Keep In Touch</li>

        </ul>
        <div className='touch-icon-container'>
        <Row>
          <Col><img className='touch-icon' src="https://image.flaticon.com/icons/svg/1051/1051258.svg"/></Col>
          <Col><img className='touch-icon'src='https://image.flaticon.com/icons/svg/1051/1051262.svg'/></Col>
          <Col><img className='touch-icon'src='https://image.flaticon.com/icons/svg/1051/1051280.svg'/></Col>
          <Col><img className='touch-icon'src='https://image.flaticon.com/icons/svg/1051/1051248.svg'/></Col>

        </Row>
        </div>
      </Col>
    </Row>
   
    

      </Container>
  
  );
}

export default Example;