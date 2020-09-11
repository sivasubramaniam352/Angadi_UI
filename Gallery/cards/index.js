import React from 'react'
import PropTypes from 'prop-types'
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const Index = (props) => {
    return (
        <div>
            <Card className={'index-gallery-back-card'}>
                <CardBody className={'index-gallery-back'}>
                <img src={props.src} className = {props.className}/>
                </CardBody>
            </Card>
        </div>
    )
}


export default Index

