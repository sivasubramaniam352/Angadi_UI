import React,{useState, useEffect} from 'react'
import Nav from '../../components/navbar/index'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle,  ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faUser, faShoppingBag, faBookmark} from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router';
import axios from 'axios'
import './pp.css'
import { create } from 'react-test-renderer';

const Index=(props) => {
  
    const { match } = props;
    const {code} = match.params;
   
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState([])
    const [sizeBtns, setSizeBtns] = useState([])
    const [sizeSelected, setSizeSelected] = useState('');
    const [resBadge, setresBadge] = useState([])
      useEffect(() => {
        axios.get(`http://localhost:8000/api/mens/buy/${code}`)
        .then(product =>{
            setProduct( product.data ) 
            setImage(product.data.imgPath)
            setSizeBtns(product.data.size) 
        })
      
        .catch(err =>{
            return err
            
        })
        
    }, [])
    const toPost = () =>{
     if(sizeSelected >= 0 ){
       alert('plz select size')
     }
     else if(!localStorage.usertoken ){
       alert("plz login")
       props.history.push('/login')
     }
     else{
      const token = localStorage.usertoken;
      const decodedToken = jwt_decode(token);
       axios.post('http://localhost:8000/api/cart',{
         user:decodedToken._id,
         product: product._id,
        size:sizeSelected})
      props.history.push('/cart')
     }
    }
    const addWish =(e) =>{
   
      if(!localStorage.usertoken ){
          alert("plz login")
          props.history.push('/login')
        }
        else{
          const token = localStorage.usertoken;
          const decodedToken = jwt_decode(token);
      axios.post('http://localhost:8000/api/wishCreate',{user:decodedToken._id, product:e.target.name})
      .then(data =>{
          console.log(data);
          setresBadge(data.data)
      }).catch(err =>{
          console.log(err);
      })
  
  }
  }

   const images = () =>{
  
    return image.map((imgs) =>
       ( <Col md='6' sm='6'lg='6' key={imgs}>
         <div className={'prod-image-cont'}>
        <img src={imgs} className={'prod-images'}/>
        </div>
        </Col>
          
      ))
   }

  const sbChangeHandler = (e) =>{
    setSizeSelected(e.target.value)
  
  }

  const sizeButton = ()=>{
   return sizeBtns.map(buttons =>{   
 
      return(
        <span className={'pp-sizeButton-span'} key={buttons}>
           <Button className={'pp-sizeButton'} value={buttons} onClick={sbChangeHandler} >{buttons}</Button>
        </span>
      )
    })
  }
 
    return ( 
        <div>
          
            
           
            <div className={'image-pp-cont'}>
          <Row>
              <Col md='6' sm='12'>
                <Row>
                {images()}
               
                </Row>
              </Col>
              <Col md='6' sm='12'>
                <Container> 
                <Row className="details-pp-cont">
                  <p className={'prod-pp-title'}> {product.brand} </p>
                  <h5>{JSON.stringify(sizeSelected)}</h5>
                </Row>
                <Row>
                    <p>{product.description}</p>
                </Row>
                <Row>
    <p>Rs. {product.price -product.price * product.offer/100} <span className={'pp-prodPrice'}>Rs.{product.price}</span> <span className={'pp-prodOffer'}>Offer{product.offer}%</span>{}</p>
                </Row>
                <Row>
                  inclusive of All taxes
                </Row>
                <Row>
                  <div>{sizeButton()} </div>
                </Row>
                <Row>
                <div><p className={''}><b>Buy your usual size:</b> this item runs true to size</p></div>
                </Row>
                <Row>
                  <Col md='7'><Button color='danger' className="w-100" onClick={toPost}>Add To Bag</Button> </Col>
                  <Col md='4'><Button className="w-100" name={product._id} onClick={addWish}> WishList</Button></Col>
                </Row>
                <Container>
                <Row>
                  <p className={'prod-pp-title'}>Product details</p>
                </Row>
                <Row>
                  <Col>
                 <ListGroup>
                   <ListGroupItem>
                     Brand : {product.brand}
                   </ListGroupItem>

                 
                   <ListGroupItem>
                     Product : {product.description}
                   </ListGroupItem>

                   <ListGroupItem>
                     Sizes : {sizeBtns.map(doc => (<span>&nbsp;{doc},</span>))}
                   </ListGroupItem>
                 </ListGroup>
                 </Col>
                 <Col>
                 <ListGroupItem>
                     offer : {product.offer}%
                   </ListGroupItem>

                   <ListGroupItem>
                     Type : {product.productType}
                   </ListGroupItem>

                   
                   <ListGroupItem>
                     colour : {product.color}
                   </ListGroupItem>
                 </Col>
                </Row>

              </Container>
                </Container>
              </Col>
  
          </Row>
          </div>
        </div>
    )
}

export default  withRouter(Index)
