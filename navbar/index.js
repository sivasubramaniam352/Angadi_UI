import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Modal from 'react-modal'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row, 
  Col
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import jwt_decode from 'jwt-decode'

import { Button, Form, FormGroup, Label, Input, FormText, Badge } from 'reactstrap';
import './navStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faUser, faShoppingBag, faBookmark} from '@fortawesome/free-solid-svg-icons'
import OverlayMen from './Modals/modalMen';
import OverlayWomen from './Modals/modalWomen'
import OverlayKids from './Modals/ModalKids'
import OverlayHL from './Modals/modalHl'
import OverlayDisc from './Modals/modalDisc'
import { withRouter } from 'react-router';
import OverlayUsers from './Modals/modalUser'

const customStyles = {
  overlay: {
    background: 'rgba(0,0,0,.3)',
    
  },
  content: {
    width: '90%',
    height: '40%',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'linear-gradient(90deg, rgba(167,167,182,1) 0%, rgba(244,244,244,1) 49%, rgba(212,211,211,1) 100%)'
  }
};

const Example = (props) => {

 const[userDrop, setuserDrop] = useState(false)
//  const [products, setProducts] = useState([])
// const [prodsWish, setprodsWish] = useState([])
// const [BagBadge, setBagBadge] = useState(true)
// const [WishBadge, setWishBadge] = useState(true)
// const [resForBag, setresForBag] = useState([])
const [modalMen, setmodalMen] = useState(false)
const [modalWomen, setmodalWomen] = useState(false)
const [modalKids, setmodalKids] = useState(false)
const [modalHL, setmodalHL] = useState(false)
const [modalDiscover, setmodalDiscover] = useState(false)

const show = () =>{
   setuserDrop(true)
 }

const hide =() => {
  setuserDrop(false)
}

const menTrigger=()=>{
  setmodalDiscover(false);
  setmodalHL(false);
  setmodalKids(false);
  setmodalWomen(false);
  setmodalMen(true)
}
const womenTrigger=()=>{
  setmodalDiscover(false);
  setmodalHL(false);
  setmodalKids(false);
  setmodalMen(false);
  setmodalWomen(true);
}
const kidsTrigger=()=>{
  setmodalDiscover(false);
  setmodalHL(false);
  setmodalMen(false);
  setmodalWomen(false);
  setmodalKids(true);
}
const hlTrigger=()=>{
  setmodalDiscover(false);
  setmodalMen(false);
  setmodalWomen(false);
  setmodalKids(false);
  setmodalHL(true);
}
const discTrigger=()=>{
  setmodalMen(false);
  setmodalWomen(false);
  setmodalKids(false);
  setmodalHL(false);
  setmodalDiscover(true);
}

// const prodsBadge = props.value

// useEffect(() => {
//   setresForBag(prodsBadge)
//   console.log(prodsBadge);
//   const token = localStorage.usertoken;
//   const decodedToken = jwt_decode(token);
//   axios.post('http://localhost:8000/api/getprodPop', {user:decodedToken._id})
//   .then(doc => {
//       setProducts(doc.data)
//       if(doc.data.length == 0){
//         setBagBadge(false)
//       }
//       else{
//         setBagBadge(true)
//       }
//   })
//   .catch(err => {
//       return err
//   })
// }, [resForBag])
// useEffect(() =>{
//   axios.post('http://localhost:8000/api/wishGet', {user:decodedToken._id})
//   .then(doc => {
//       setprodsWish(doc.data)
//       if(doc.data.length == 0){
//         setWishBadge(false)
//       }
//       else{
//         setWishBadge(true)
//       }
      
//   })
//   .catch(err => {
//       return err
//   })
// },[])
  return (
    
    <div>
      
      <Navbar  dark expand="md" className='fixed-top bg-red navBar-main-div '>
      
        <NavbarBrand className='Nav-brand-container' href="/"><img src='https://image.flaticon.com/icons/svg/2152/2152488.svg' className='Brand-image-main'/></NavbarBrand>
       
          <Nav className="mr-auto" navbar>
         
          <NavItem  >
            <NavLink className='men' onMouseOver={menTrigger} >Men</NavLink>
            </NavItem>
           
            <NavItem  >
              <NavLink className='women'onMouseOver={womenTrigger}  >Women</NavLink>
            </NavItem>
            <NavItem >
              <NavLink className='kids' onMouseOver={kidsTrigger} >Kids</NavLink>
            </NavItem>
            <NavItem >
              <NavLink className='kids'onMouseOver={hlTrigger} >Home&Living</NavLink>
            </NavItem>
            <NavItem >
              <NavLink className='kids' onMouseOver={discTrigger} >Discover</NavLink>
            </NavItem>

            <Form inline className='search_bar'>
      
      <Button variant="outline-success" className='search-sprite' ><FontAwesomeIcon icon={faSearch} /></Button>
      <Input type="text"  placeholder="Search" className="searchInput mr-sm-1" />
    </Form>
          </Nav>
         
          
          
          <div className= 'App-iconUser-main App-hover' onMouseOver = {show} >
           <Row><FontAwesomeIcon className='action-icons-main1' icon={faUser} /></Row>
           <Row className='Action-text-main'> User</Row>
           </div>
         <div className= 'App-iconWL-main App-hover'>
           <Row><FontAwesomeIcon className='action-icons-main2' icon={faBookmark} onClick={()=>{props.history.push('/wishList')}}/>
 {/* {WishBadge && <Badge className={'WishBadge-navbar'}  color={'danger'}>{prodsWish.length}</Badge>} */}
           </Row>
           <Row className='Action-text-main'> WishList</Row>
           </div> 
         <div className= 'App-iconBag-main App-hover'>
           <Row><FontAwesomeIcon className='action-icons-main3'icon={faShoppingBag} onClick={()=>{props.history.push('/cart')}}/> 
           {/* {BagBadge && <Badge className={'BagBadge-navbar'}  color={'danger'}>  {products.length}</Badge>} */}
           </Row>
           <Row className='Action-text-main'>Bag </Row>
           </div>
          
      </Navbar> 
    {userDrop && <div className=' user-Drop-Main' onMouseLeave ={hide} ><OverlayUsers  /></div>}
    
    <Modal isOpen={modalMen}
          onRequestClose={() => setmodalMen(false)}
          style={customStyles}
          contentLabel="Example Modal">
             <OverlayMen/>
             
          </Modal>
          <Modal isOpen={modalWomen}
          onRequestClose={() => setmodalWomen(false)}
          style={customStyles}
          contentLabel="Example Modal">
    <OverlayWomen/>
    </Modal>
    <Modal isOpen={modalKids}
          onRequestClose={() => setmodalKids(false)}
          style={customStyles}
          contentLabel="Example Modal">
    <OverlayKids/>
    </Modal>
    <Modal isOpen={modalHL}
          onRequestClose={() => setmodalHL(false)}
          style={customStyles}
          contentLabel="Example Modal">
    <OverlayHL/>
    </Modal>
    <Modal isOpen={modalDiscover}
          onRequestClose={() => setmodalDiscover(false)}
          style={customStyles}
          contentLabel="Example Modal">
    <OverlayDisc/>
    </Modal>
    
    </div>
 
  );
}

export default withRouter(Example);

