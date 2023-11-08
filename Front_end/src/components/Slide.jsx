import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // นี่คือการนำเข้า CSS ของ react-responsive-carousel

const Slide = () => {
    return (
        <div className='flex items-center justify-center mt-6 rounded-xl drop-shadow-lg '>
            <Carousel className='lg:w-[55rem] 2xl:w-[68rem]' showArrows={false} showStatus={false} showIndicators={true} infiniteLoop={true} autoPlay={true} showThumbs={false} interval={4500} dynamicHeight={true}>
                    <div >
                        <img src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" 
                        className='object-cover h-[30rem]'/>
                    </div>
                    <div >
                        <img src="https://images.unsplash.com/photo-1647265194908-6815badcc397?auto=format&fit=crop&q=80&w=2138&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" 
                        className='object-cover h-[30rem]'/>
                    </div>
                    <div >
                        <img src="https://images.unsplash.com/photo-1635891297534-43d7c329f643?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" 
                        className='object-cover h-[30rem]'/>
                    </div>
                    <div >
                        <img src="https://images.unsplash.com/photo-1595512994123-d7735bbbcaab?auto=format&fit=crop&q=80&w=2099&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 4" 
                        className='object-cover h-[30rem]'/>
                    </div>
            </Carousel>
        </div>
    );
}

export default Slide;
