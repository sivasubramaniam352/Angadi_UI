import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, ButtonGroup, Button ,Navbar,
    NavbarBrand,
    
    NavbarText} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingBag, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import './cart.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import styled from 'styled-components';

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

const index = (props) => {
    
    const [products, setProducts] = useState([])
    const [productPost, setproductPost] = useState({})
    const [removeCartProd , setremoveCartProd] = useState({})
    const [confirm, setConfirm] = useState()
    const [modal, setmodal] = useState(false)
    const [calc, setcalc] = useState([])
    const [q, setQ] = useState({ qty:'1'})
    const [quantity, setQuantity] = useState({})
    const [resDelCP, setResDelCP] = useState({})
    useEffect(() => {
        if(!localStorage.usertoken){
            props.history.push('/login')
        }else{
        const token = localStorage.usertoken;
const decodedToken = jwt_decode(token);
        axios.post('http://localhost:8000/api/getprodPop', { user:decodedToken._id })
            .then(doc => {
                setProducts(doc.data)
                setcalc(doc.data.product.price)
            })
            .catch(err => {
                return err
            })}
    }, [productPost, resDelCP, quantity])

    useEffect(() => {
        axios.post('http://localhost:8000/api/cartqtyup', { ...q})
        .then(doc =>{
            setQuantity(doc)
        })
        .catch(err =>{
            return err
        })
    }, [productPost, q])
//    const confirmToDel =() =>{
//        if(removeCartProd > 0){
//       return (<div>
//           <div>confirm to delte </div>
//           <Row>
//               <Col md= '6'> <Button value= {true} onClick = {(e) =>{setConfirm(e.target.value)  }}>confirm</Button></Col>
//               <Col md= '6'> <Button value= {false} onClick = {(e) =>{setConfirm(e.target.value)  }}>cancel</Button></Col>
//           </Row>
//           </div>
//       )}
//     }
  const  pricepercentCalc =(prods) =>{
     return   (prods.product.price -prods.product.price * prods.product.offer/100)* prods.qty;
        
    }
    const deleteBtnHandler =(e) =>{
        setremoveCartProd({_id:e.target.value})  
        setmodal(true)
    }
    // const sizehandler =(e , prods) =>{
      
    //     alert((prods.product.price -prods.product.price * prods.product.offer/100)* e.target.value)

     
    // } 
    const deleteHandler=() =>{
        axios.post("http://localhost:8000/api/deleteCartprod",{...removeCartProd})
        .then(data=>{
            setResDelCP(data)
            setmodal(false)
        })
        .catch(err =>{
            console.log(err)
        })
    }
   const setQty = (e) =>{

       setQ({qty:e.target.value ,_id:e.target.name})
  
   }
    const cartProducts = () =>{
         return products.map(prods =>(
            <div>
                        <Card className={'cart-product-row'}>   
                       
                        <CardBody> 
                            <Row>                   
                         <Col md='3'>

                            <img src={prods.product.imgPath[0]} className={'w-75'}/>
                        </Col>
                        <Col md='7'>
                            <Row>
                                <Col md='9'>
         <b className={'text-in-cart'}>{prods.product.brand}</b>
                                </Col>

                                <Col md='3'>
           <p className={'text-in-cart'}> ₹{pricepercentCalc(prods)}</p>
           
                                </Col>
                            </Row>
                            <Row>
                            <Col md='9'>
         <p className={'text-in-cart'}>{prods.product.description}</p>
                        </Col>
                            </Row>
                            <div>
                            <label>
        qty:
          <select onChange = {setQty} name = {prods._id}>
            <option value= {1} >1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>
 
                                
                            </div>
                            <Row>
                                <Col md='8'>
                                <p className={'text-in-cart'}>sold by:{prods.product.seller}</p>
                                </Col>

                                <Col md='4'>
         <p className={'text-in-cart'}><b className={'product-cart-discount'}>₹{prods.product.price}</b> {prods.product.offer}% OFF</p>                             
            </Col>
                            </Row>
                          
            {/* { confirmToDel()} */}
                        </Col>
                        </Row> 
                        <hr/>
                        <Row>
                                <Col md='4'>
             
            <Button value={prods._id} className={'removeBtn-cartPage'} onClick ={deleteBtnHandler}>Remove</Button>
            
                                </Col>
                            </Row>
                        </CardBody>
                        </Card>
                        <Modal isOpen={modal}
          onRequestClose={() => setmodal(false)}
          style={customStyles}
          contentLabel="Example Modal">
              <b>Confirm Delete</b>
              <Row>
                  <Col md='6' lg='6'>
                      <Button className={'w-100'} onClick={deleteHandler}>Yes</Button>
                  </Col>
                  <Col md='6' lg='6' >
                      <Button className={'w-100'}>No</Button></Col>

              </Row>

          </Modal>
                    </div>
       )  )
    }
const totalcalcHandler =() =>{
  return  products.map( data =>{
      
      return (data.product.price -data.product.price * data.product.offer/100 )* data.qty
  }
  ).reduce((a, b) =>{
      return a+b
  }, 0)
}
const bagTotal =() =>{
    return  products.map( data =>{
        
        return (data.product.price)* data.qty
    }
    ).reduce((a, b) =>{
        return a+b
    }, 0)
  }
  const bagDiscount =() =>{
    return  products.map( data =>{
        
        return (data.product.price * data.product.offer /100)* data.qty
    }
    ).reduce((a, b) =>{
        return a+b
    }, 0)
  }
  const placeOrder =() =>{
      props.history.push('/address')
  }
  if(products.length >= 1 ){
    return (
        <div>
            <div>
      <Navbar color="light" light expand="md" className={'fixed-top'}>
        
      <NavbarBrand className='Nav-brand-container' href="/"><img src='https://image.flaticon.com/icons/svg/2152/2152488.svg' className='Brand-image-main'/></NavbarBrand>
   
        
         
          <NavbarText className={'tracking--navbar'}><b  className={'address-track'}>CART</b>---------<b >ADDRESS</b>---------<b>ORDER</b></NavbarText>
      
      </Navbar>
      
    </div>
    <Spacer/>
  
    <Spacer/>
            <Container >

                <Row>

  
                    <Col md='7' lg='7' className={'leftSide-cont-cart'}>
                     <Card className={'cart-product-row'}>
                        <Row>
                            <Col md ='9'>My shopping bag ({products.length} items)</Col>
                            <Col md='3'> <p>Total: ₹{totalcalcHandler()}</p></Col>
                        
                        </Row>
                        </Card>
                        {cartProducts()}
                       
                    </Col>

                    <Col md='3' lg='3'>
                    <Card>
                        <Container className={'product-calc-cont'}>
                            
                        
                        <Row Style={'margin-bottom:20px'}>
                            <Col md ='7'>Apply Coupon :</Col>
                            <Col md='5'> 
                            <Button outline color={'danger'} className={'coupon-btn-cart w-100'}>Apply</Button>
                        </Col>
                        
                        </Row>
                        <hr/>
                        <Row>
                            <Col md ='10'>
                            <b>PRICE DETAILS</b>
                            </Col>
                            </Row>    
                    <Row>
                            <Col md ='8'>bag Total :</Col>
                            <Col md='4'> <p> ₹{bagTotal()}</p></Col>
                        
                        </Row>
                        <Row>
                            <Col md ='8'>Coupon Discount :</Col>
                            <Col md='4'> <p> Apply</p></Col>
                        
                        </Row>
                        <Row>
                            <Col md ='8'>Delivery Charge :</Col>
                            <Col md='4'> <p> Free</p></Col>
                        
                        </Row>
                        <Row>
                            <Col md ='8'>bag Discount :</Col>
                            <Col md='4'> <p className={'bag-discount-cart'}> - ₹{bagDiscount()}</p></Col>
                        
                        </Row>
                        <hr/>
                        <Row>
                            <Col md ='8'>Total :</Col>
                            <Col md='4'> <p> ₹{totalcalcHandler()}</p></Col>
                        
                        </Row>
                        <Row Style={'margin-bottom:20px'}> 
                            <Col md='12'>
                            <Button color='danger' className='w-100' onClick={placeOrder}>Place Order</Button>
                            </Col>
                        </Row>
                       
                        </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )}
    else{
        return(
        <Container className={'cart-empty-cont'} fluid>
            <Container fluid>
                <Card >
                    <Row>
                        
                    </Row>
                    <p>! your Bag is Too light</p> 
                </Card>
            </Container>
        </Container>
        )
    }
}


export default index

