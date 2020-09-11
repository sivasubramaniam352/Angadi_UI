import React from 'react';
import styled   from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slickcont = styled.div`
    width:1100px;
    align-self: center;
`;
const Imgcont = styled.div`
    width:40%;
    `;
 const Imgs = styled.img`

 max-width: 80%
 `;
    

export default class SimpleSlider extends React.Component {
    render() {
      var settings = {
      
        infinite: true,
        speed: 350,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:4000,
        
      };
      return (
          <Slickcont>
              <Slider {...settings}>
          <Imgcont>
            <Imgs src = 'https://bit.ly/378ncmz'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://bit.ly/2PWUsaT'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://bit.ly/2MtPXT0'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://bit.ly/2tJCfom'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://bit.ly/2MtPXT0'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://bit.ly/2PWUsaT'/>
          </Imgcont>

          <Imgcont>
          <Imgs src = 'https://assets.myntassets.com/w_245,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/6/12/fc18570d-5170-4c27-91f0-b10924e989201528778863097-17731eb0-063b-4e48-926c-c2771a19fc241527676512681-deal1.jpG'/>
          </Imgcont>
          <Imgcont>
          <Imgs src = 'https://assets.myntassets.com/w_245,c_limit,fl_progressive,dpr_2.0/assets/images/banners/2018/6/12/fc18570d-5170-4c27-91f0-b10924e989201528778863097-17731eb0-063b-4e48-926c-c2771a19fc241527676512681-deal1.jpG'/>
          </Imgcont>
        </Slider>

          </Slickcont>
        
      );
    }
  }