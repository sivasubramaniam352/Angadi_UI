import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card,CardBody, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Button ,Navbar,
    NavbarBrand,
    
    NavbarText} from 'reactstrap'
    import Modal from 'react-modal'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import './order.css'
const Spacer = styled.div`
  width:100%;
  height:60px;
`;

  function OrderDetails() {
      return (
          <div>
              <ListGroup>
                  <ListGroupItem>
                      Placed No
                  </ListGroupItem>
              </ListGroup>
          </div>
      )
  }
  export default OrderDetails