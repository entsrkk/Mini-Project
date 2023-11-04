import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // นี่คือการนำเข้า CSS ของ react-responsive-carousel

const Slide = () => {
    return (
        <div className='flex items-center justify-center mt-4 rounded-xl drop-shadow-lg'>
            <Carousel className='w-2/4 ' showArrows={false} showStatus={false} showIndicators={true} infiniteLoop={true} autoPlay={true} showThumbs={false} interval={4000} dynamicHeight={true}>
                    <div >
                        <img src="https://taodangmusic.com/modules/homesliderpro/images/resize_BannerMarketplaceWebTaodangMusicShopChatuchakBkk.jpg" alt="Slide 1" />
                    </div>
                    <div >
                        <img src="https://taodangmusic.com/modules/homesliderpro/images/resize_EnyaNovaU.jpg" alt="Slide 2" />
                    </div>
            </Carousel>
        </div>
    );
}

export default Slide;
