import { useState, useEffect } from 'react';
import Avis from './Avis';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    async function getOpinians() {
      try {
        const res = await fetch('http://localhost:5000/api/testimonials');
        if (!res.ok) throw new Error('Error fetching testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOpinians();
  }, []);
  return (
    <div className='max-w-7xl xl:mx-auto '>
      <h1 className="text-5xl font-semibold m-15 text-center ">Témoignages</h1>
      <div className="w-full carousel carousel-start gap-5 rounded-4xl">
        {testimonials.map((opinion, index) => {
          return (
            
            <Avis
              key={index}
                src={opinion.src}
                user={opinion.user}
                time={opinion.time}
                titre={opinion.titre}
                stars={opinion.stars}
                avis={opinion.avis}
              />
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
