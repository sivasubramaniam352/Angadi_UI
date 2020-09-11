import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, ButtonGroup, Button } from 'reactstrap';
import axios from 'axios'
import './filter.css'
import { withRouter } from 'react-router';
import jwt_decode from 'jwt-decode'
const Filter = (props) => {


    const [data, setData] = useState([])
    // color
    const [color, setRadio] = useState(["red","yellow", "green", "blue", "black", "white"])
    const [colorToSend, setcolorToSend] = useState([])
    //type
    const [type, setType] = useState(['T-shirt', 'SweatShirts','shirts'])
    const [typeToSend, setTypeToSend] = useState([])

    //gender
    const [Gender, setGender] = useState(['mens','women'])
    const [preReq, setPreReq] = useState({})


    
    const [size, setSize] = useState({
        measurements: [
            { size: 'S', isChecked: false },
            { size: 'XL', isChecked: false },
            { size: 'XXL', isChecked: false }
        ]
        , numSizes: [{ price: [1000, 2000], name: "1000 to 2000" }, { price: [3000, 4000], name: '3000 to 4000' }]

    })


    // useEffect(()=>{
    //     axios.post("http://localhost:8000/api/product")
    //     .then(res =>{

    //         return res.data
    //     })
    //     .then(doc => {
    //         setPreReq(doc)
    //    } )
    // },[])

    useEffect(() => {
       
        if (colorToSend.length <= 0) {
        axios.post("http://localhost:8000/api/product", { ...preReq})
            .then(response => {
                return response.data
            })
            .then(doc => {
                setData(doc)
                console.log(doc);
                
            })
            .catch(err =>{
                console.log(err);
            })
        }
        else if(colorToSend.length > 0){
            axios.post("http://localhost:8000/api/product", { ...preReq, color:colorToSend})
            .then(response => {
                return response.data
            })
            .then(doc => {
                setData(doc)
                console.log(doc);
                
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }, [preReq, colorToSend])

    // useEffect(() => {
        
    //     axios.get('http://localhost:8000/api/getproduct')
    //         .then(data => {
    //             return data.data
    //         })
    //         .then(doc => {
    //             setRadio(doc)
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
           
    // }, [])
    const addWish =(e) =>{
       
        if(!localStorage.usertoken){
            alert("plz login")
            props.history.push('/login')
          }
          else{
            const token = localStorage.usertoken;
            const decodedToken = jwt_decode(token);
        axios.post('http://localhost:8000/api/wishCreate',{user:decodedToken._id, product:e.target.name})
        .then(data =>{
            console.log(data);
           
        }).catch(err =>{
            console.log(err);
        })
    
    }
    }

    //colorSet
    const onCheckboxBtnClick = (selected) => {
        const index = colorToSend.indexOf(selected);
        if (index < 0) {
            colorToSend.push(selected);
        } else {
            colorToSend.splice(index, 1);
        }
        setcolorToSend([...colorToSend]);
      
       
        console.log(colorToSend);
        
      }
    //typeset
    const onCheckboxBtnTypeClick = (selected) => {
        const index = typeToSend.indexOf(selected);
        if (index < 0) {
            typeToSend.push(selected);
        } else {
            typeToSend.splice(index, 1);
        }
        setcolorToSend([...typeToSend]);
      
       
        console.log(typeToSend);
        
      }

    const productGal = () => {
        return data.map(data => {
            return (

                <Col md='3'>
                    <Card className={'product-cont'}>
                    <a href={`/mens/buy/${data.code}`}>
                        <CardImg src={data.imgPath[0]} />
                        </a>
                        <div className={'buy-cont'}>
                      
                            <Row>
                                {/* <Col md='6'>
                                   
                                        <Button color='danger' className='buy-button'>Bag</Button>
                                </Col> */}
                                <Col md='12'>
                                    <Button className='cart-button' name={data._id} onClick={addWish} > Wishlist</Button>
                                </Col>
                            </Row>
                        </div>

                        <CardTitle>{data.brand}</CardTitle>

                        <CardSubtitle className={'card-description'}>{data.description}</CardSubtitle>
                        <div className={'priceCont'}>
                            <CardSubtitle className={'card-price'}>price:₹<span className={'price-inner'}>{data.price}</span></CardSubtitle></div>

                    </Card>

                </Col>

            )
        })

    }

    const radchangeHandler = (e) => {
        setPreReq({ ...preReq, [e.target.name]: e.target.value })
    }

    const checkchangeHandler = (e) => {
        setPreReq({ ...preReq, color: colorToSend })
    }

    const sizeHandler = (e) => {
        setPreReq({ ...preReq, [e.target.name]: e.target.value })
    }
    const genderCheck =() =>{
        return Gender.map(data =>(
            <div key={data}>
            <label>
                <input type='radio' value={data} name={'for'} onChange={radchangeHandler} />&nbsp;{data}
            </label></div>
        )

        )
    }
    const prodCheck = () => {
        return type.map(data => (
            <div key={data}>
                <label>
                    <input type='radio' value={data} name={'productType'} onChange={radchangeHandler} />&nbsp;{data}
                </label></div>
        ))
    }
    const colorcheck = () => {
        return color.map(value => (

            <div key={value}>
                <label>
                    <input

                        type='checkbox' value={value} name={'color'} onClick={()=>onCheckboxBtnClick(value)} />&nbsp;{value}
                </label>

            </div>
        )
        )
    }

    const sizeCheck = () => {
        return size.measurements.map(data => (
            <div key={data.size}>
                <input type={'radio'} value={data.size} name={'size'} onChange={sizeHandler} /> &nbsp;{data.size}
            </div>
        ))
    }   
    const priceCheck = () => {
        return size.numSizes.map(data => (
            <div key={data.name}>
                <input type={'radio'} name={'price'} value={data.price} onChange={() => { setPreReq({ ...preReq, price: { '$gte': data.price[0], '$lte': data.price[1] } }) }} /> &nbsp;{data.name}
            </div>
        ))
    }
    const allradio =() =>{
        window.location.reload();
    }

    //     if(preReq === {productType:'T-shirt'} || preReq === {productType:'sweatshirts'}){
    //    return  sizeCheck = () =>{
    //         return size.measurements.map(data =>(
    //             <div>
    //                 <input type = {'checkbox'} name = {'size'} /> &nbsp;{data.size}
    //             </div>
    //         ))
    //     }}
    //     else if (preReq === {productType:'sneakers'} || preReq == {productType:'phants'}){
    //         return size.numSizes.map(data =>(
    //         <div>
    //              <input type = {'checkbox'} name = {'size'} /> &nbsp;{data.size}
    //         </div>    
    //         ) )    
    //     }
    //     else{

    //     }
    return (
        <div>
            <Container >
                <Row>
                    <Col md='2' lg='2'>
                        <ListGroup>
                            {/* <ListGroupItem>

                                <b>Categories</b>
                                <label>
                                    <input
                                        type={"checkbox"}
                                        name="productType"
                                        
                                    
                                        onChange={ (e) => {
                                            setSneakcheck(!sneakcheck ) 
                                            
                                            `${sneakcheck === true ? `${setPreReq({})}`:
                                              `${setPreReq({[e.target.name]:"sneakers"})}`} ` }}
                                    />
                                    &nbsp;Sneakers
                  </label>
                   <h5>Checkbox Buttons</h5>
                   
                  
    

                                        </ListGroupItem>*/}
                            {/* <ListGroupItem> 

                                <b>Colours</b>
                                <label>
                                    <input
                                        type={"checkbox"}
                                        name="color"
                                        value="yellow"
                                        
                                        onChange={e => {
                                            setTshirtcheck(!tshirtcheck)
                                            `${tshirtcheck == true ? `${setPreReq({})}`: `${setPreReq({...preReq, [e.target.name]:"yellow"})}` } `
                                        }}
                                    />

                                    
                                    &nbsp;Yellow
</label>
<label>
                                    <input
                                        type={"checkbox"}
                                        name="color"
                                        value="Black"

                                        onChange={e => { setPreReq({...preReq, [e.target.name]: e.target.value }) }}
                                    />
                                    &nbsp;Black
</label>
<label>
                                    <input
                                        type={"checkbox"}
                                        name="color"
                                        value="blue"
                                        checked = {preReq.color === "blue" }
                                            
                                        onChange={e => { setPreReq({ [e.target.name]: e.target.value }) }}
                                    />
                                    &nbsp;Blue
</label>
<label>
                                    <input
                                        type={"checkbox"}
                                        name="color"
                                        // value="White"
                                        onChange={e => { setPreReq({...preReq, [e.target.name]: e.target.value }) }}
                                    />
                                    &nbsp;White
</label>


                            </ListGroupItem> */}
                            <ListGroupItem>
                                <label>
                                <input type='radio' onChange={allradio} /> All</label>
                                
                            </ListGroupItem>
                            <ListGroupItem>
                                {genderCheck()}
                            </ListGroupItem>
                            <ListGroupItem>
                                {prodCheck()}
                            </ListGroupItem>
                            <ListGroupItem>
                                {colorcheck()}
                            </ListGroupItem>

                            <ListGroupItem>
                                {sizeCheck()}
                            </ListGroupItem>
                            <ListGroupItem>
                                {priceCheck()}
                            </ListGroupItem>

                        </ListGroup>
                    </Col>
                    <Col>
                        <Row>
                            {productGal()}

                        </Row>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default withRouter(Filter)