import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const HeroSection = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="https://i.ibb.co/rtWhDgN/ban2.jpg"
                    alt="First slide"

                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="https://i.ibb.co/wBJVLWQ/ban3.jpg"
                    alt="Second slide"

                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 ban_img"
                    src="https://i.ibb.co/7XS6LFL/ban1.png"
                    alt="Third slide"

                />

            </Carousel.Item>
        </Carousel>
    )
}

export default HeroSection