import React from 'react';
import { Row, Col, Card, Jumbotron } from 'reactstrap';
import GalCard from './cards/index'
import './galStyle.css'
class Gallery extends React.Component{
   constructor(props) {
        super(props)   
       this.state = {
            images:[]
       }
   }
   componentDidMount(){
    fetch('http://localhost:8000/api/gallery/images')
    .then(res => res.json())
  .then(images => this.setState({images}, () => console.log('Customers fetched...', images)))
}

datatopost(){
    
}

gallery() {
    return this.state.images.map(data => {
        return (
           
           <Col key={data._id} md='3' sm='12' xl='3' className={'column-gallery-img'}>  
           <a href={'/filter'}>
             <GalCard  src={data.url} className = {'card-main-gallery'}/>
             </a>
            </Col>
           
)
            
    });
   
}

    render(){
        return(
            <Jumbotron className={'jumbo-Gall-base'}>
                <Row>
                    {this.gallery()}
                </Row>
            </Jumbotron>
        );
    }
}

export default Gallery;