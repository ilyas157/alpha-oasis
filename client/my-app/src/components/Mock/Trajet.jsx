import React from 'react';

const Trajet = ({ trajet, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <>
      <h1 className="text-yellow-500 text-2xl mb-2">Trajet {index + 1}</h1>
      {trajet?.map((trajet, i) => (
          <>
          <div key={i} className="mt-5 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Départ</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Ville :</strong> {trajet.depart.ville_depart}
                  </p>
                  <p>
                    <strong>Lieu :</strong> {trajet.depart.lieu_depart}
                  </p>
                  <p>
                    <strong>Date :</strong>{' '}
                    {formatDate(trajet.depart.date_depart)}
                  </p>
                  <p>
                    <strong>Heure :</strong> {trajet.depart.heure_depart}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Arrivée</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Ville :</strong> {trajet.arrivé.ville_arrivé}
                  </p>
                  <p>
                    <strong>Lieu :</strong> {trajet.arrivé.lieu_arrivé}
                  </p>
                  <p>
                    <strong>Date :</strong>{' '}
                    {formatDate(trajet.arrivé.date_arrivé)}
                  </p>
                  <p>
                    <strong>Heure :</strong> {trajet.arrivé.heure_arrivé}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Compagnie</p>
                <p className="text-muted-foreground">
                  {trajet.info_transport.compagnie}
                </p>
              </div>
              <div>
                <p className="font-medium">Type de vol</p>
                <p className="text-muted-foreground capitalize">
                  {trajet.info_transport.type_vol}
                </p>
              </div>
              <div>
                <p className="font-medium">Durée</p>
                <p className="text-muted-foreground">
                  {trajet.info_transport.durée}h
                </p>
              </div>
              <div>
                <p className="font-medium">Bagages</p>
                <p className="text-muted-foreground">
                  {trajet.info_transport.bagages} pièces
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Trajet;
