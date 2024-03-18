import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const YourComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 5, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {/* Immagine 1 */}
        <div>
          <img src="static/frittatina.jpg" alt="Image 1" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 2 */}
        <div>
          <img src="static/gelatocioccolato.jpg" alt="Image 2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 3 */}
        <div>
          <img src="static/guac.jpg" alt="Image 3" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>
         {/* Immagine 1 */}
         <div>
          <img src="static/ossobucho.jpg" alt="Image 1" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 2 */}
        <div>
          <img src="static/porcini.jpg" alt="Image 2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 3 */}
        <div>
          <img src="static/ribs.jpg" alt="Image 3" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>
         {/* Immagine 1 */}
         <div>
          <img src="static/ramen.jpg" alt="Image 1" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 2 */}
        <div>
          <img src="static/salamino.jpg" alt="Image 2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 3 */}
        <div>
          <img src="static/wings.jpg" alt="Image 3" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>
          {/* Immagine 1 */}
          <div>
          <img src="static/sashimimix.jpg" alt="Image 1" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 2 */}
        <div>
          <img src="static/parmigiana.jpg" alt="Image 2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>

        {/* Immagine 3 */}
        <div>
          <img src="static/pita.jpg" alt="Image 3" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>


        {/* Altre immagini possono essere aggiunte allo stesso modo */}
      </Slider>
    </div>
  );
};

export default YourComponent;
