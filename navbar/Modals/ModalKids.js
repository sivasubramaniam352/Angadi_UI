import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, ButtonGroup, Button } from 'reactstrap';
import  '../navStyle.css'
function ModalKids(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col md='3' lg='3'>
            <ul className={'modal-list'}>
              <li className={'modal-nav-headKids'}>Topwears</li>
              <li>T-shirt</li>
              <li>shirts</li>
              <li>kurtas</li>
              <li>coats&Blazers</li>
            </ul>
          </Col>
          <Col md='3' lg='3'>
            <ul className={'modal-list'}>
          <li className={'modal-nav-headKids'}>BottomWares</li>
              <li>jeans</li>
              <li>trousers</li>
              <li>3/4ths</li>
              <li>Phants</li>
              </ul>
          </Col>
          <Col md='3' lg='3'>
<ul className={'modal-list'}>
  <li className={'modal-nav-headKids'}>Footwear</li>
  <li>Casual Shoes</li>
  <li>Sports Shoes</li>
  <li>Formal Shoes</li>
  <li>Sneakers</li>
  <li>Sandals & Floaters</li>
  <li>Flip Flops</li>
  <li>Socks</li>
</ul>
          </Col>
          <Col md='3' lg='3'>
            <ul className={'modal-list'}>
              <li className={'modal-nav-headKids'}>Fashion Accessories</li>
              <li>Wallets</li>
              <li>Belts</li>
              <li>Perfumes & Body Mists</li>
              <li>Trimmers</li>
              <li>Deodorants</li>
              <li>Phone Cases</li>
              <li>Helmets</li>
            </ul>
          </Col>
        </Row>
        
        <Row>
          <Col md='3' lg='3'></Col>
          <Col md='3' lg='3'></Col>
          <Col md='3' lg='3'></Col>
          <Col md='3' lg='3'></Col>
        </Row>
      </Container>

    </div>
  )
}



export default ModalKids

