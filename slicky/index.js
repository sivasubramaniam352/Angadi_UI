import React from 'react';
import styled   from "styled-components";
import Slider from "react-slick";
// import Images from './Imgs';
import Imgs from './imgsrc';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 const Scont = styled.div`
    width:100%;
    height:400px;
 `;
 const Imgcont = styled.img`
    width:100%;
    height:400px;
 `;
 
export default class SlideView extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = { 
            picsrc: []
         }
       
   
    }

    componentDidMount(){
        fetch('http://localhost:8000/api/images')
        .then(res => res.json())
      .then(picsrc => this.setState({picsrc}, () => console.log('Customers fetched...', picsrc)))
        // .then(imagsrc => {
        //     let images = imagsrc.picsrc.map((data) => {
        //         <div Key={data.id}>  
        //          <Imgcont src={data.url}/>
        //         </div>
        //     })
        //        })
    }

    sliders() {
        return this.state.picsrc.map(data => {
            return (
               <div key={data._id}>  
                 <Imgcont  src={data.url}/>
                </div>
)
        });
    }

            // state = {
            //     images :[
            //         {img : 'https://bit.ly/2sfSGZs'},
            //         {img : 'https://bit.ly/2ESMI3k'},
            //         {img : 'https://bit.ly/364rjjq'},
            //     ]
            // }
               
            
    
    
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        
          };
        return(
            <Scont>
              <Slider {...settings}>
          
                {this.sliders()}
                </Slider>
               
            </Scont>
        );
    }
}