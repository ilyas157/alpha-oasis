import { useNavigate, Link } from 'react-router-dom';

const Whyus = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto">
      <h1 className="text-5xl font-semibold m-15 text-center">Services</h1>
      <p className='mb-15 text-xl max-w-3xl mx-auto text-center '>
        Alpha Oasis vous accompagne à chaque étape de votre voyage pour une
        expérience sans souci et des souvenirs inoubliables
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="bg-white p-10 w-full shadow-2xl rounded-4xl   max-w-md flex flex-col gap-10 items-center hover:animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-calendar-days-icon lucide-calendar-days"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>

          <h1 className="text-center font-bold text-xl ">
            Une organisation de A à Z
          </h1>
          <p className="text-center text-lg">
            Chez Alpha Oasis, nous prenons en charge tous les aspects de votre
            voyage : vols, hébergement, transferts, activités... Vous n’avez
            plus qu’à faire vos valises.
          </p>
        </div>

        <div className="p-10 w-full shadow-2xl rounded-4xl bg-white  max-w-md flex flex-col gap-10 items-center hover:animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="blue"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-headset-icon lucide-headset"
          >
            <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
            <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
          </svg>

          <h1 className="text-center font-bold text-xl ">
            Un service client à l’écoute
          </h1>
          <p className="text-center text-lg">
            Notre équipe est disponible, réactive et passionnée par le voyage.
            Chaque demande est traitée avec attention et professionnalisme.
          </p>
        </div>

        <div className="p-10 w-full shadow-2xl rounded-4xl bg-white max-w-md flex flex-col gap-10 items-center hover:animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-hand-coins-icon lucide-hand-coins"
          >
            <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
            <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
            <path d="m2 16 6 6" />
            <circle cx="16" cy="9" r="2.9" />
            <circle cx="6" cy="5" r="3" />
          </svg>

          <h1 className="font-bold text-xl ">
            Transparence et bon rapport qualité-prix
          </h1>
          <p className="text-center text-lg">
            Aucune mauvaise surprise. Nos prix sont clairs, et nous cherchons
            toujours le meilleur compromis entre qualité et coût.
          </p>
        </div>
        <div className="p-10 w-full shadow-2xl rounded-4xl bg-white  max-w-md flex flex-col gap-10 items-center hover:animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFCC00"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plane-icon lucide-plane"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
          <h1 className="text-center font-bold text-xl ">
            Un réseau de partenaires fiables
          </h1>
          <p className="text-center text-lg">
            Hôtels de qualité, compagnies aériennes renommées, guides locaux
            expérimentés… Nous travaillons avec des acteurs de confiance pour
            garantir votre satisfaction.
          </p>
        </div>
        <div className="p-10 w-full shadow-2xl rounded-4xl bg-white max-w-md flex flex-col gap-10 items-center hover:animate-pulse">
          <svg
            className="hidden sm:block"
            width="80"
            height="80"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M21.0791 12.519C21.0744 12.7044 21.0013 12.8884 20.8599 13.0299L14.8639 19.0301C14.5711 19.3231 14.0962 19.3233 13.8032 19.0305C13.5103 18.7377 13.5101 18.2629 13.8029 17.9699L18.5233 13.2461L4.32813 13.2461C3.91391 13.2461 3.57813 12.9103 3.57812 12.4961C3.57812 12.0819 3.91391 11.7461 4.32812 11.7461L18.5158 11.7461L13.8029 7.03016C13.5101 6.73718 13.5102 6.2623 13.8032 5.9695C14.0962 5.6767 14.5711 5.67685 14.8639 5.96984L20.813 11.9228C20.976 12.0603 21.0795 12.2661 21.0795 12.4961C21.0795 12.5038 21.0794 12.5114 21.0791 12.519Z"
              fill="#000000"
            />
          </svg>
          <h1 className="font-bold text-4xl text-center ">
            On vous en a parlé… maintenant, admirez !
          </h1>
          <svg
            className="block sm:hidden"
            width="80"
            height="80"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(90 0 0)"
          >
            <path
              d="M21.0791 12.519C21.0744 12.7044 21.0013 12.8884 20.8599 13.0299L14.8639 19.0301C14.5711 19.3231 14.0962 19.3233 13.8032 19.0305C13.5103 18.7377 13.5101 18.2629 13.8029 17.9699L18.5233 13.2461L4.32813 13.2461C3.91391 13.2461 3.57813 12.9103 3.57812 12.4961C3.57812 12.0819 3.91391 11.7461 4.32812 11.7461L18.5158 11.7461L13.8029 7.03016C13.5101 6.73718 13.5102 6.2623 13.8032 5.9695C14.0962 5.6767 14.5711 5.67685 14.8639 5.96984L20.813 11.9228C20.976 12.0603 21.0795 12.2661 21.0795 12.4961C21.0795 12.5038 21.0794 12.5114 21.0791 12.519Z"
              fill="#000000"
            />
          </svg>
        </div>
        <div className="relative group p-10 w-full shadow-2xl rounded-4xl bg-base-200  max-w-md aspect-square overflow-hidden hover:animate-pulse">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
            <img
              src="/src/assets/images/morocco/carlos-ibanez-644X6zmy1Hk-unsplash.jpg"
              alt="Image 1"
              className="object-cover w-full h-full"
            />
            <img
              src="/src/assets/images/egypt/marco-d-abramo-exdBBVGdGZg-unsplash.jpg"
              alt="Image 2"
              className="object-cover w-full h-full"
            />
            <img
              src="/src/assets/images/azerbijan/orkhan-farmanli-EFsRNIkzEbo-unsplash.jpg"
              alt="Image 3"
              className="object-cover w-full h-full"
            />
            <img
              src="/src/assets/images/turkey/stefan-kostoski-vv5qijsMPys-unsplash.jpg"
              alt="Image 4"
              className="object-cover w-full h-full"
            />
          </div>
          <Link
            to="/galerie"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 text-white text-5xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
