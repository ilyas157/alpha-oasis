import { MapPin, Phone, Mail, Plane, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const NeoFooter = ({ color }) => {
  return (
    <footer
      className="bg-primary text-black "
      style={{
        backgroundColor: color,
        boxShadow: `0 0 60px 10px ${color}`,
        color: `${color ? 'white' : ''}`,
      }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Alpha Oasis</h3>
            <p
              className="text-sm text-black/80"
              style={{
                color: `${color ? 'white' : ''}`,
              }}
            >
              Votre agence de voyages de confiance depuis plus de 15 ans.
              Spécialisée dans l'Omra, le Hajj et les circuits découverte.
            </p>
            <div
              className="space-y-2 text-sm text-black/80"
              style={{
                color: `${color ? 'white' : ''}`,
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun-Ven: 9h-18h | Sam: 9h-13h</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                <span>Licence agence: 123/2024</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul
              className="space-y-2 text-sm text-black/80"
              style={{
                color: `${color ? 'white' : ''}`,
              }}
            >
              {[
                'Omra & Hajj',
                'Hébergements',
                'Circuits Maroc',
                'Voyages Organisés',
                'Voyages sur mesure',
              ].map((item, index) => {
                if (index === 0) {
                  return (
                    <li key={item}>
                      <Link
                        to={'/omra_hajj'}
                        className="hover:underline hover:text-black"
                        style={{
                          color: `${color ? 'white' : ''}`,
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                } else if (index === 1) {
                  return (
                    <li key={item}>
                      <Link
                        to={'/hebergement'}
                        className="hover:underline hover:text-black"
                        style={{
                          color: `${color ? 'white' : ''}`,
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item}>
                    <Link
                      to={'/voyage'}
                      className="hover:underline hover:text-black"
                      style={{
                        color: `${color ? 'white' : ''}`,
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul
              className="space-y-2 text-sm text-black/80"
              style={{
                color: `${color ? 'white' : ''}`,
              }}
            >
              {[
                'Arabie Saoudite',
                'Turquie',
                'Égypte',
                'Agadir',
                'Marrakech',
              ].map((item, index) => {
                if (index === 0) {
                  return (
                    <li key={index}>
                      <Link
                        to={'/omra_hajj'}
                        className="hover:underline hover:text-black"
                        style={{
                          color: `${color ? 'white' : ''}`,
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <Link
                      to={`/voyage?destination=${item}`}
                      className="hover:underline hover:text-black"
                      style={{
                        color: `${color ? 'white' : ''}`,
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div
              className="space-y-3 text-sm text-black/80"
              style={{
                color: `${color ? 'white' : ''}`,
              }}
            >
              <div className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 mt-1" />
                <p>
                  123 Avenue Mohammed V
                  <br />
                  Casablanca 20000, Maroc
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-5 h-5" />
                <a
                  href="tel:+212522000000"
                  className="hover:underline hover:text-black"
                >
                  +212 5 22 00 00 00
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:contact@alphaoasis.ma"
                  className="hover:underline hover:text-black"
                >
                  contact@alphaoasis.ma
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4">
              <p
                className="text-sm font-medium mb-2 text-black/80"
                style={{
                  color: `${color ? 'white' : ''}`,
                }}
              >
                Suivez-nous
              </p>
              <div className="flex gap-2">
                {/* Facebook */}
                <a
                  className="pr-5"
                  href={'https://www.facebook.com/Alphaoisis'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: `${color ? 'white' : ''}`,
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  className="pr-5"
                  href={'https://www.instagram.com/alpha_oasis/?hl=fr'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: `${color ? 'white' : ''}`,
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  className="pr-5"
                  href={'https://www.youtube.com/@alphaoasis7814'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: `${color ? 'white' : ''}`,
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10A2 2 0 0 1 3.9 5.6a49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div
        className="bg-primary text-black/60 text-sm py-4 border-t border-black/20"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 60px 10px ${color}`,
          color: `${color ? 'white' : ''}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2024 Alpha Oasis. Tous droits réservés.</p>
          <div className="flex gap-4">
            {[
              'Conditions générales',
              'Politique de confidentialité',
              'Mentions légales',
            ].map((item) => (
              <Link
                to="/conditions-generales-de-vente"
                className="hover:underline hover:text-black"
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NeoFooter;
