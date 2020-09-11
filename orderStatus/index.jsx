import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card,CardBody, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Button ,Navbar,
    NavbarBrand,
    
    NavbarText} from 'reactstrap'
    import Modal from 'react-modal'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,  faEnvelope } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import OrderDetails from './orderDetails'
import './order.css'
const Spacer = styled.div`
  width:100%;
  height:60px;
`;

const customStyles = {
    content: {
      width: '20%',
      height: '20%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };
function index(props) {
    const [products, setproducts] = useState([])
    const [ResForRemProds, setResForRemProds] = useState({})
    const [OrderDetails, setOrderDetails] = useState(false)
    const [User, setUser] = useState({})
    const [modal, setmodal] = useState(false)
    const [fieldstoUP, setfieldstoUP] = useState({})
const [resforcancel, setresforcancel] = useState()
const [OrderDet, setOrderDet] = useState(false)
    useEffect(() => {

    if(!localStorage.usertoken){
        props.history.push('/login')
    }
    else{
        const token = localStorage.usertoken;
        const decodedToken = jwt_decode(token);
        setUser(decodedToken)
  
        axios.post('http://localhost:8000/api/orderGet', { user: decodedToken })
            .then(data => {
                setproducts(data.data)
                console.log(data.data)
            })}
    }, [ResForRemProds,resforcancel])
    const removeHandler= (e) =>{
        axios.post('http://localhost:8000/api/orderDel',{_id:e.target.name, products:{_id:e.target.value}})
        .then(data =>{
            setResForRemProds(data)
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    const cancelHandler =(e) =>{
        console.log('working');
    console.log(e.target.value);
    console.log(e.target.name);
    
        axios.post('http://localhost:8000/api/orderUp',{...fieldstoUP})
        .then(data =>{
            setresforcancel((data.data))
            setmodal(false)
        })
        .catch(err =>{
            console.log(err);
            
        })
    }
    const cancelset =(e) =>{
        setfieldstoUP(({_id:e.target.value, prod_id:e.target.name ,orderStatus:'Canceled'}))
        setmodal(true)
    } 
    const productslist = () => {
        return products.map(data => {
            return (
                
               
                <Row>
                     {OrderDet && <div>
                        {
                                 <div className={'orderDetail-cont'}>
                                <Container>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <Row>
                                        <p>Placed On: {(new Date(data.date)).toDateString()}<br/>
                                        orderNumber: {data.orderNumber}<br/>
                                        
                                        </p>
                                        </Row>
                                        <Row>
                                            <Col>
                                            PriceDetails:
                                            </Col>
                                            <Col>
                                            <Row>
                                                <Col md='3'>
                                                    MRP:
                                                </Col>
                        <Col md='6'>{data.products.map(data =>{return(data.product.price)*data.qty}).reduce((a, b) =>{
        return a+b
    }, 0)}</Col>
                                                </Row>
                                                <Row>
                                                <Col md='3'>offer:</Col>
                                                <Col md='6'>{ data.products.map( data =>{
        
        return (data.product.price * data.product.offer /100)* data.qty
    }
    ).reduce((a, b) =>{
        return a+b
    }, 0)}</Col>
                                                </Row>
                                                <Row>
                                                <Col md='3'><b>Total:</b></Col>
                             <Col md='6'><b>₹{data.products.map(data=>{ return (data.product.price -data.product.price * data.product.offer/100 )* data.qty}).reduce((a, b) =>{
        return a+b
    }, 0)}</b></Col>
                                                </Row>
                                
                                            </Col>
                                           
                                        </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row><p>
                                                    Updates Send To:<br/>
                                                    <FontAwesomeIcon icon={faPhone}/> {data.address.phoneNumber}<br/>
                                                    <FontAwesomeIcon icon={faEnvelope}/> {User.email}
                                                    </p>
                                                    </Row>

                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <p>
                                                Shipping Address:<br/>
                                                <b>{data.address.name}</b><br/>
                                                {data.address.address}-{data.address.pinCode}

                                                </p>
                                                </Row>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                       <p> Payment Type:<br/>
                                                       <b>Cash On Delivery</b>
                                                        </p>
                                                        </Row>
                                                </ListGroupItem>
                                            
                                    </ListGroup>
                                    
                                </Container>
                                </div>
                             
                         }
                    
                </div>

                }
                    <Row className={'ordNOandSO'}>
                        <Col md='7'>Order No: {data.orderNumber} </Col>
                       
                    
                    </Row>
                    {data.products.map(product => {
                        return (<div>
                            <Card>
                                <Row>
                                    <Col md='3' >
                                        <CardBody>
                                        <img src={product.product.imgPath[0]} className={'w-100'} />
                                        </CardBody>
                                    </Col>
                                    <CardBody>
                                    <Col md='9' lg='9' className={'details-order'}><b>{product.product.brand}</b>
                                    <p className={'details-order'}>{product.product.description} <br/>qty:{product.qty} size:{product.size}<br/>₹{(product.product.price - product.product.price *product.product.offer/100)*product.qty} </p>
                                    <Row>
                                        <Col md='12'>
                        <p><span className={product.orderStatus === 'Ordered'? 'orderedColor' : 'CanceledColor'}>{product.orderStatus}</span><b>({(new Date(data.date)).toDateString()})</b></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='7'>
                                        </Col>
                                        <Col md='5'>
                                          { product.orderStatus === 'Ordered'? <Button value={data._id} name={product._id}  onClick={cancelset}>cancel</Button>:<Button name={data._id} value={product._id} onClick={removeHandler} >remove</Button>}
                                        </Col>
                                    </Row>
                                    </Col></CardBody>
                                </Row>
                               
                            </Card>
                             <Modal isOpen={modal}
                             onRequestClose={() => setmodal(false)}
                             style={customStyles}
                             contentLabel="Example Modal">
                                 <b>Confirm Cancel</b>
                                 <Row>
                                     <Col md='6' lg='6'>
                                         <Button className={'w-100'}  onClick={cancelHandler}>Yes</Button>
                                     </Col>
                                     <Col md='6' lg='6' >
                                         <Button className={'w-100'} onClick={()=>setmodal(false)}>No</Button></Col>
                   
                                 </Row>
                   
                             </Modal>
                             </div>
                        )
                    })}
                   
                </Row>


            )
        })
        
    }
    return (
        <div>
                <div>
      <Navbar color="light" light expand="md" className={'fixed-top'}>
        
      <NavbarBrand className='Nav-brand-container' href="/"><img src='https://image.flaticon.com/icons/svg/2152/2152488.svg' className='Brand-image-main'/></NavbarBrand>
   
        
         
          <NavbarText className={'tracking--navbar'}><b >CART</b>---------<b >ADDRESS</b>---------<b  className={'address-track'}>ORDER</b></NavbarText>
      
      </Navbar>
      
    </div>
    <Spacer/>
  
    <Spacer/>
            <Container>
                <Row >
                    <Col md='12' lg='12'>
                        <b>Account</b>
                        <p>{User.email} </p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Row>
                        <Col md='3'>
                        <ListGroup>
      <ListGroupItem ><b onClick={()=> setOrderDet(false)}>Order Lists</b></ListGroupItem>
      <ListGroupItem><b  onClick={()=> setOrderDet(true)}>Order Details</b></ListGroupItem>
     
    </ListGroup>
                        </Col>
                        <Col md='7'>
                            <Container>
                                {productslist()}
                            </Container>
                        </Col>
                    </Row>


                </Row>
            </Container>
        </div>
    )
}

export default index

