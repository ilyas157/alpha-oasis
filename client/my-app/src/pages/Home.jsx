import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import Hero from '../components/Mock/HomePage/Hero';
import FAQ from '../components/home/FAQ';
import Testimonials from '../components/home/Testimonials';
import Whyus from '../components/home/Whyus';
import TypeCarousel from '../components/home/TypeCarousel';
function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function getDestinations() {
      try {
        const res = await fetch('http://localhost:5000/api/destinations');
        if (!res.ok) throw new Error('Failed to fetch destinations');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.log(error);
      }
    }
    getDestinations();
  }, []);

  // Filter for each type
  const voyages = destinations.filter((d) => d.type === 'voyage').slice(0, 8);
  const omras = destinations.filter((d) => d.type === 'omra_hajj').slice(0, 8);
  const hotels = destinations.filter((d) => d.type === 'hotel').slice(0, 8);
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f3f0ed80]">
        <Navbar />

        <Hero />
        <main className='mt-20 lg:mt-0'>
          <section className="mt-40 mb-10 max-w-7xl mx-auto">
            <TypeCarousel title="Voyages organisés" items={voyages} />
            <TypeCarousel title="Omra & Hajj" items={omras} />
            <TypeCarousel title="Hebergement" items={hotels} />
          </section>
          <Whyus />
        </main>
        <Testimonials />
        <FAQ />
        <NeoFooter />
      </div>
    </>
  );
}
export default Home;
