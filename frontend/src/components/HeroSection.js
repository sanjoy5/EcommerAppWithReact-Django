import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const HeroSection = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="ban2.jpg"
                    alt="First slide"

                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="ban3.jpg"
                    alt="Second slide"

                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="ban1.png"
                    alt="Third slide"

                />

            </Carousel.Item>
        </Carousel>
    )
}

export default HeroSection