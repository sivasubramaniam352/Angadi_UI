import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, ButtonGroup, Button } from 'reactstrap';
import axios from 'axios'
import './wish.css'
import { withRouter } from 'react-router';
import jwt_decode from 'jwt-decode'

function Index(props) {
    
    const [products, setproducts] = useState([])
    const [resforremprod, setresforremprod] = useState({})
    useEffect(() => {
        if(!localStorage.usertoken){
           props.history.push('/login')}
           else{
        const token = localStorage.usertoken;
        const decodedToken = jwt_decode(token);
        axios.post('http://localhost:8000/api/wishGet',{user:decodedToken._id})
        .then(data =>{
            setproducts(data.data)
            console.log(data);
            
        }).catch(err =>{
            console.log(err);
            
        })}
    }, [resforremprod])
    const removeProd =(e) =>{
        console.log(e.target.name);
        
        axios.post('http://localhost:8000/api/wishDelete',{_id:e.target.name})
        .then(data =>{
            setresforremprod(data)
        }).catch(err =>{
            console.log(err);
            
        })

    }
const productsWish = () =>{
    return products.map(data =>(
        <Col md='3'>
            <Card >
                <a href ={`/mens/buy/${data.product.code}`}>
                <CardImg  src={data.product.imgPath[0]} className={'w-100'}  />
                </a>
                <Button name={data._id} onClick={removeProd}>Remove</Button>
            </Card>
        </Col>
    ))
}
if(products.length > 0){
    return (
        
     <Container>
         <Row>
             {productsWish()}
         </Row>
     </Container>
    )
}
else{
    return(
    <Container className={'cart-empty-cont'} fluid>
        <Container fluid>
            <Card >
                <Row>
                    
                </Row>
                <p>! Nothing Listed</p> 
            </Card>
        </Container>
    </Container>
    )
}
}



export default withRouter(Index)
