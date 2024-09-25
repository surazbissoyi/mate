import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  
  return (
    <div className='relative'>
      <Slider {...settings}>
        
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={`${image}`}
              alt={`Slide ${index}`}
              className='w-full sm:h-[500px] object-cover rounded'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10' onClick={onClick}>
      <FaChevronRight className='text-black bg-white bg-opacity-20 opacity-80 hover:bg-opacity-100 p-2 m-2 w-[40px] h-[40px] rounded-[20px] text-2xl' />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10' onClick={onClick}>
      <FaChevronLeft className='text-black bg-white bg-opacity-20 opacity-80 hover:bg-opacity-100 p-2 m-2 w-[40px] h-[40px] rounded-[20px] text-2xl' />
    </div>
  );
};

export default ImageSlider;
