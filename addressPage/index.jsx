import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, FormGroup, Label, Input, FormText, Button ,Navbar,
  NavbarBrand,
  
  NavbarText} from 'reactstrap'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import AddressForm from './addressFom/index'
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import './add.css'
const Spacer = styled.div`
  width:100%;
  height:60px;
`;
const customStyles = {
  content: {
    width: '439px',
    height: '509px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app')

const Index = (props) => {
  if(!localStorage.usertoken){
   return window.location = '/login' 
  }
  else{
  const [address, setaddress] = useState([])
  // const [addForm, setAddForm] = useState( false )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // adresspost and reponse
  const [addressPost, setAddressPost] = useState({})
  const [resAddCreate, setRC] = useState({})
  //addressupdata 
  const [addressUp, setAddressUp] = useState({})
  const [resAddUp, setRU] = useState({})
  //editModal
  const [modal2, setmodal2] = useState(false)
  //delete address
  const [resdeladd, setresdeladd] = useState({})
  //Adress products
  const [addProducts, setAddProducts] = useState([])
  const [calc, setcalc] = useState([])
  const [offer, setOffer] = useState([])
  
  const [checkoutBtn, setcheckoutBtn] = useState(false)
  

  //owned
  const [owned, setowned] = useState({})
  const [pdsfororder, setpdsfororder] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/getadd')
      .then(doc => {
        setaddress(doc.data)
      })
      .catch(err => {
        return err
      })
  }, [resAddCreate, resAddUp, resdeladd])

  //cart api
  useEffect(() => {
    const token = localStorage.usertoken;
    const decodedToken = jwt_decode(token);
    axios.post('http://localhost:8000/api/getprodPop', { user: decodedToken._id })
      .then(doc => {
        setAddProducts(doc.data)
      
        setcalc(doc.data.product.price)
        setOffer(doc.data.product.offer)
      })
      .catch(err => {
        return err
      })
  }, [])

  //placeOrder useeffect
    // useEffect(() => {
    //  addProducts.map(ger =>{
    //   return(
    //      setpdsfororder(...pdsfororder, ger.product._id))     })
      
    // }, [])

  const clickHforCheckout =(e)=>{
    const daaata =  addProducts.map(data =>{
      return({product:data.product._id,qty:data.qty,size:data.size})
    })
  
    // setpdsfororder(...pdsfororder, daaata)
    // console.log(pdsfororder)
    let pds = [...pdsfororder]
    const token = localStorage.usertoken;
    const decodedToken = jwt_decode(token);
    setowned({"user":decodedToken._id, "products":daaata, "address":e.target.value })
    setcheckoutBtn(true)
    
  }
  const changeHandler = (e) => {
    setAddressPost(({ ...addressPost, [e.target.name]: e.target.value }))
    console.log(addressPost)

  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const clickHandler = () => {
    setModalIsOpen(true)
  }
  const submitHandler = (e) => {
    const token = localStorage.usertoken;
    const decodedToken = jwt_decode(token);
    e.preventDefault();
    axios.post('http://localhost:8000/api/addCreate', { user: decodedToken._id, ...addressPost })
      .then(data => {
        setRC(data)
        console.log(resAddCreate)
        closeModal()
      }).catch(err => {
        return err
      })

  }
  const changeHandlerEdit = (e) => {
    setAddressUp(({ ...addressUp, [e.target.name]: e.target.value }))
    console.log(addressUp)
  }
  const submitHandlerEdit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/addUp', { ...addressUp })
      .then(data => {
        setRU(data)
      })
      .catch(err => {
        return err
      })
    setmodal2(false)
  }

  const clickHandlerDel = (e) => {
    
    setresdeladd({ _id: e.target.value })
    axios.post('http://localhost:8000/api/delAdd', { _id: e.target.value })
      .then(data => {
        return data
      }).catch(err => {
        console.log(err);

      })
  }
  const products = () => {
    return addProducts.map(data => 
   { 
   return( <Card>
         
        <Row>
          <Col md={'3'} lg={'3'}>
            <img className={'w-100'} src={data.product.imgPath[0]} />
          </Col>
          <Col md={'7'} lg={'7'}>
            <b>{data.product.brand}</b>
            <p>₹{data.product.price}</p>
            <Row>
              <Col md='5' lg='5'> <p>size:{data.size}</p> </Col>
              <Col md='5' lg='5'> <p>qty:{data.qty}</p></Col>
            </Row>
            
   
          </Col>
        </Row>
      </Card>)}
    )
  }
  const clickHandlerOrder = () =>{
    console.log(owned);
    const token = localStorage.usertoken;
    const decodedToken = jwt_decode(token);
    axios.post('http://localhost:8000/api/orderCreate',{...owned})
    .then(data =>{
      console.log(data)
     
    }).catch(err=>{
      return err
    })
    axios.post('http://localhost:8000/api/deleteAllCart',{user:decodedToken._id})
    props.history.push('/orderStatus')
  }
  const adresses = () => {
    return address.map(data => (
      <div>

        <Card className={'adresses-Container'}>
         <Row>
            <Col md='2' lg='2'>
              <input name={'address'} value={data._id}type='radio' onClick={clickHforCheckout} />
            </Col>
            <Col md='8' lg='8'>
              <b>{data.name}({data.addressType})</b>
              <div className={'adressPage-addresses'}> <p>{data.address},{data.town},<br />
            {data.state},{data.pinCode}</p></div>
            </Col>
          </Row>
         
          <hr />
          <Row>
            <Col md={'4'} lg={'4'}>
              <Button className={'w-50'} value={data._id} onClick={(e) => { setmodal2(true), setAddressUp({ _id: e.target.value }) }}>
                Edit
        </Button>
            </Col>
            <Col md={'4'} lg={'4'}>
              <Button className={'w-50'} value={data._id} onClick={clickHandlerDel}>
                Remove
        </Button>
            </Col>

          </Row>
        </Card>
        <Modal isOpen={modal2}
          onRequestClose={() => setmodal2(false)}
          style={customStyles}
          contentLabel="Example Modal">
          <Row >
            <p>Edit ADDRESS</p>
          </Row>
          <Form onSubmit={submitHandlerEdit}>
            <Row>
              <p><b>Contact Details</b></p>
            </Row>
            <hr />
            <FormGroup>
              <Input name="name" title={data._id} className={'addresspage-modal-input'} onChange={changeHandlerEdit} placeholder="Name" />
            </FormGroup>
            <FormGroup>
              <Input name="phoneNumber" type="number" className={'addresspage-modal-input'} onChange={changeHandlerEdit} placeholder="phone" />
            </FormGroup>



            <Row>
              <p><b>Address</b></p>
            </Row>
            <hr />
            <FormGroup>
              <Input name="pinCode" type="number" className={'addresspage-modal-input'} onChange={changeHandlerEdit} placeholder="PinCode" />
            </FormGroup>
            <FormGroup>

              <Input name="address" className={'addresspage-modal-input'} onChange={changeHandlerEdit} placeholder="Address (houseNO,building,area )" />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>

                  <Input type="text" name="town" id="exampleEmail" onChange={changeHandlerEdit} placeholder="Town" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>

                  <Input type="text" name="state" id="examplePassword" onChange={changeHandlerEdit} placeholder="State" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
            <Col md={6}>
                <FormGroup>
                  <lable>
                  <Input type="radio" name="addressType" value="Home"id="exampleEmail" onChange={changeHandlerEdit} placeholder="Town" />Home</lable>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
      
                  <Input type="radio" name="addressType" value="Office" id="examplePassword" onChange={changeHandlerEdit} placeholder="State" />
                </FormGroup>
              </Col>
            </Row>
            <div className={'w-100'}>
              <Button color={'danger'} type={"submit"} name={"_id"} value={data._id} className={'w-100'}>Save Address</Button>
            </div>
          </Form>

        </Modal>
      </div>
    ))
  }

  const totalcalcHandler = () => {
    return addProducts.map(data => {
    
      return (data.product.price - data.product.price * data.product.offer / 100) * data.qty
    }
    ).reduce((a, b) => {
      return a + b
    }, 0)
  }
  const bagTotal = () => {
    return addProducts.map(data => {

      return (data.product.price) * data.qty
    }
    ).reduce((a, b) => {
      return a + b
    }, 0)
  }
  const bagDiscount = () => {
    return addProducts.map(data => {

      return (data.product.price * data.product.offer / 100) * data.qty
    }
    ).reduce((a, b) => {
      return a + b
    }, 0)
  }
  return (
    <div>
      <div>
      <Navbar color="light" light expand="md" className={'fixed-top'}>
        
      <NavbarBrand className='Nav-brand-container' href="/"><img src='https://image.flaticon.com/icons/svg/2152/2152488.svg' className='Brand-image-main'/></NavbarBrand>
   
        
         
          <NavbarText className={'tracking--navbar'}><b>CART</b>---------<b  className={'address-track'}>ADDRESS</b>---------<b>ORDER</b></NavbarText>
      
      </Navbar>
      
    </div>
    <Spacer/>
  
    <Spacer/>
      <Container>
                <Row>
          <Col md='7'>
          <Row>
          <b>Select Address</b>    
          </Row>
  
            {adresses()}
            <Card onClick={clickHandler} className={'addpage-addAddress-button'}>
              <p><FontAwesomeIcon icon={faPlus} /> Add New Address</p>
            </Card>
          </Col>
          <Col md='5'>
            {products()}
            <hr />
            <Card>
            <div className={'order-button'}>
              <Row>
                <Col md={'5'} lg={'5'}>bagTotal</Col>
                <Col md={'5'} lg={'5'} >₹{bagTotal()}</Col>
              </Row>

              <Row>
                <Col md={'5'} lg={'5'}>Bag Discount</Col>
                <Col md={'5'} lg={'5'} >₹{bagDiscount()}</Col>
              </Row>
              <hr />
              <Row>

                <Col md={'5'} lg={'5'}>Total</Col>
                <Col md={'5'} lg={'5'} >₹{totalcalcHandler()}</Col>
              </Row>
              <Row>
                <Col md='12'>
                  {checkoutBtn && <Button color='danger' className='w-100' onClick={clickHandlerOrder}>Check Out</Button>}
                </Col>
              </Row>
            </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalIsOpen}

        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <Row >
          <p>ADD NEW ADDRESS</p>
        </Row>
        <Form onSubmit={submitHandler}>
          <Row>
            <p><b>Contact Details</b></p>
          </Row>
          <hr />
          <FormGroup>
            <Input name="name" className={'addresspage-modal-input'} onChange={changeHandler} placeholder="Name" readonly={true} />
          </FormGroup>
          <FormGroup>
            <Input name="phoneNumber" type="number" className={'addresspage-modal-input'} onChange={changeHandler} placeholder="phone" />
          </FormGroup>



          <Row>
            <p><b>Address</b></p>
          </Row>
          <hr />
          <FormGroup>
            <Input name="pinCode" type="number" className={'addresspage-modal-input'} onChange={changeHandler} placeholder="PinCode" />
          </FormGroup>
          <FormGroup>

            <Input name="address" className={'addresspage-modal-input'} onChange={changeHandler} placeholder="Address (houseNO,building,area )" />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>

                <Input type="text" name="town" onChange={changeHandler} placeholder="Town" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>

                <Input type="text" name="state" onChange={changeHandler} placeholder="State" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
                <FormGroup>
                <lable>
                  <Input type="radio" name="addressType" value="Home"id="exampleEmail" onChange={changeHandler} placeholder="Town" />Home</lable>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
<label>
                  <Input type="radio" name="addressType" value="Office" id="examplePassword" onChange={changeHandler} placeholder="State" />Office</label>
                </FormGroup>
              </Col>
            </Row>
          <div className={'w-100'}>
            <Button color={'danger'} type={"submit"} className={'w-100'}>Save Address</Button>
          </div>
        </Form>
      </Modal>


    </div>
  )
}
}
export default Index
