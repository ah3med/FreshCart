import React from 'react'
import mainslider1 from '../../assets/images/images/slider-image-1.jpeg'
import mainslider2 from '../../assets/images/images/slider-image-2.jpeg'
import mainslider3 from '../../assets/images/images/slider-image-3.jpeg'
import mainslider4 from '../../assets/images/images/grocery-banner-2.jpeg'
import mainslider5 from '../../assets/images/images/slider-2.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';




export default function MainSlider() {
    return (
        <>
            <div className='row g-0 mt-4'>
                <div className="col-md-9">
                    <OwlCarousel className='owl-theme' loop autoplay autoplayTimeout={1250} items={1} dots={false}>
                        <div className='item'>
                        <img className='w-100 big-slider' src={mainslider1} alt="" />
                        </div>
                        <div className='item'>
                        <img className='w-100 big-slider' src={mainslider4} alt="" />
                        </div>
                        <div className='item'>
                        <img className='w-100 big-slider' src={mainslider5} alt="" />
                        </div>

                    </OwlCarousel>
                    
                </div>
                <div className="col-md-3">
                    <img className='w-100 sm-slider' src={mainslider2} alt="" />
                    <img className='w-100 sm-slider' src={mainslider3} alt="" />
                </div>
            </div>

            
        </>



    )
}
