import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import Carousel from '../components/galerie/Carousel';
function Galerie() {
  const [bgColor, setBgColor] = useState('#1d1f2f');
  const [cards, setCards] = useState([
    
  ]);

  useEffect(() => {
    async function getGalerie() {
      try {
        const res = await fetch('http://localhost:5000/api/destinations');
        if (!res.ok) throw new Error('Failed to fetch slides');
        const data = await res.json();

        const new_data = data.map((d) => ({
          title: d.title,
          src: d.src
        }));

        setCards(new_data);
      } catch (error) {
        console.log(error);
      }
    }
    getGalerie();
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Navbar />
      <h1 className="pt-[140px] md:pt-[150px] text-center text-6xl text-white mt-5">
        Admirez ce qui vous attend
      </h1>
      <section className="flex justify-center pt-[40px] lg:w-[700px] mx-auto h-100 sm:h-200 transition-all duration-700">
        <div className=" relative overflow-hidden w-3xl ">
          <Carousel slides={cards} setBgColor={setBgColor} />
        </div>
      </section>

      <NeoFooter color={bgColor} />
    </div>
  );
}
export default Galerie;
//
