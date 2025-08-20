import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import VoyageFilterBar from '../components/destination/Filters/VoyageFilterBar';
import VoyageCard from '../components/Mock/VoyageCard';
import Pagination from '../components/destination/Pagination';
import useFilteredData from '../hooks/useFilteredData';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { parse } from 'qs';
import HotelMobileFilters from '../components/destination/Filters/HotelMobileFilters';
import Trier from '../components/Mock/Trier';
import SkeletonCard from '../components/Mock/SkeletonCard';
const img =
  'https://images.unsplash.com/photo-1600289730889-17f9ad4c38f0?q=80&';

const VoyageOrganisé = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState([]);
  const data = useFilteredData('voyage', "voyage_organisé",page, sort, setLoading);
  const [tags, setTags] = useState([]);
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const initialFilters = useMemo(() => {
    const parsed = parse('?' + searchParams.toString(), {
      ignoreQueryPrefix: true,
      comma: true,
    });

    const converted = { ...parsed };

    if (parsed.note !== undefined) {
      converted.note = Number(parsed.note);
    }

    if (parsed.BreakfastIncluded !== undefined) {
      converted.BreakfastIncluded = Number(parsed.BreakfastIncluded);
    }

    if (parsed.services) {
      converted.services = Array.isArray(parsed.services)
        ? parsed.services
        : parsed.services.split(',');
    }
    if (parsed.rooms?.prix !== undefined) {
      converted.rooms = {
        ...parsed.rooms,
        prix: Number(parsed.rooms.prix),
      };
    }

    return converted;
  }, [searchParams.toString()]);
  return (
    <>
      <Navbar />
      <main className="pt-[140px] bg-[#f3f0ed80]">
        {modal && (
          <div className="modal modal-open">
            <div className="modal-box rounded-3xl">
              <p className="text-lg">Veuillez choisir un filtre</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setModal(false)}>
                  Fermer
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setModal(false)} />
          </div>
        )}

        <h1 className="text-5xl  text-center lg:pl-90 mb-12">Voyage organisé</h1>
        {/*    
       <div className="flex  w-full gap-5 justify-center mb-5 "> */}
        <div className="flex  justify-between  max-w-[1500px] mx-auto mb-5">
          <div className="flex items-center gap-5 flex-wrap xl:ml-102">
            {tags.map((tag, k) => (
              <span
                key={k}
                className="bg-gray-200 px-7 py-2 rounded-full text-md cursor-default h-fit"
              >
                {tag}
              </span>
            ))}
          </div>
          <Trier sort={sort} setSort={setSort} setPage={setPage} />
        </div>

        <section className="flex max-w-[1500px] mx-auto mb-5">
          <VoyageFilterBar
            initialFilters={initialFilters}
            changePage={setPage}
            changeTags={setTags}
            changeModal={setModal}
          />
          <div className="flex flex-grow flex-col justify-center ">
            <div className="flex flex-grow  lg:self-auto self-center lg:justify-start justify-center gap-10 w-fit h-fit flex-wrap">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : data?.voyages?.length > 0 ? (
                data.voyages.map((voyage, index) => (
                  <VoyageCard
                    key={index}
                    prix={voyage.info_generale.prix_basique}
                    img={img}
                    nb_places={voyage.info_generale.nb_places}
                    destination={voyage.info_generale.destination}
                    description={voyage.info_generale.description}
                    // note={voyage.note}
                    durée={voyage.info_generale.durée}
                    villes={voyage.info_generale.villes}
                    pays={voyage.info_generale.pays}
                    id = {voyage.id}

                  />
                ))
              ) : (
                <div className="lg:absolute lg:top-1/2 lg:left-1/2">
                  <p className="text-gray-500 text-3xl p-5">
                    Aucun voyage n'est trouvé
                  </p>
                </div>
              )}
            </div>
            <Pagination
              currentPage={page}
              numOfPages={Math.ceil(data.totale / 3)}
              changePage={(e) => {
                setPage(Number(e.target.value));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </section>
        <button
          className="fixed z-30 bottom-6 right-6 bg-yellow-500 text-white p-4 rounded-full shadow-lg lg:hidden flex items-center justify-center"
          onClick={() => setDrawerOpen(true)}
          aria-label="Ouvrir les filtres"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        >
          {/* Funnel/slider svg*/}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h18M6 12h12M10 19h4"
            />
          </svg>
        </button>
        {drawerOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setDrawerOpen(false)}
            ></div>
            {/* Fullscreen Drawer */}
            <div className="fixed inset-0 bg-white h-screen w-full shadow-xl flex flex-col  z-50 overflow-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Filtres</h2>
                <button
                  className="text-2xl text-gray-500 hover:text-red-500"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fermer"
                >
                  <svg
                    width="44px"
                    height="44px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M6 6L18 18"
                        stroke="#000000"
                        stroke-linecap="round"
                      ></path>{' '}
                      <path
                        d="M18 6L6.00001 18"
                        stroke="#000000"
                        stroke-linecap="round"
                      ></path>{' '}
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex flex-col h-full p-0">
                <HotelMobileFilters
                  initialFilters={initialFilters}
                  changePage={setPage}
                  changeTags={setTags}
                  changeModal={setModal}
                  changeDrawerOpen={setDrawerOpen}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      <NeoFooter />
    </>
  );
};

export default VoyageOrganisé;
