import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DomDataType } from '../../Pages/SearchPage';
import gray from '../../styles/icon/gray.png';

const groundDetailCarousel: React.FC<{ stadiums: DomDataType['stadiums'] }> = ({
  stadiums,
}) => {
  return (
    <Wrap>
      {stadiums[0].images.length > 0 && stadiums[0].images[0].image && (
        <Slider
          dots={true}
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          customPaging={(idx) => (
            <PagingImg>
              <img src={stadiums[0].images[idx].image} />
            </PagingImg>
          )}
        >
          {stadiums[0].images.map((img) => (
            <ImageItems key={img.id}>
              <Img src={img.image} />
            </ImageItems>
          ))}
        </Slider>
      )}
    </Wrap>
  );
};

export default groundDetailCarousel;

const Wrap = styled.div`
  padding-bottom: 70px;
  overflow: hidden;

  .slick-dots {
    bottom: -8.5rem;
    text-align: start;
  }

  .slick-dots li {
    width: 12rem;
    height: 7rem;
    margin: 0 0.4rem;
  }
  .slick-dots li.slick-active {
    filter: brightness(0.5);
  }
`;

const ImageItems = styled.div`
  width: 98.5rem;
  height: 55rem;
`;

const Img = styled.img`
  width: 98.5rem;
  height: 55rem;
`;

const PagingImg = styled.div`
  display: block;
  width: 12rem;
  height: 7rem;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;
