import React from 'react';

const FAQ = () => {
  return (
    <>
      <div className=" bg-white max-w-7xl mx-auto  p-5 h-fit flex flex-col justify-center items-center shadow-sm rounded-3xl mt-5">
        <h1 className="m-5 text-5xl">Foire aux questions</h1>
        <div className="join join-vertical">
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className=" text-center collapse-title font-semibold">
              Quels types de voyages proposez-vous ?
            </div>
            <div className="text-center collapse-content text-sm">
              Nous proposons une large gamme de voyages : séjours tout compris,
              circuits culturels, excursions à la journée, Omra et Hajj, ainsi
              que des réservations d’hôtels et de vols au meilleur prix.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="text-center collapse-title font-semibold">
              Comment puis-je réserver un voyage ?
            </div>
            <div className="text-center collapse-content text-sm">
              Vous pouvez réserver en ligne via notre site web, nous contacter
              par téléphone ou passer directement à notre agence. Nous sommes là
              pour vous accompagner à chaque étape.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="text-center collapse-title font-semibold">
              Puis-je payer en plusieurs fois ?
            </div>
            <div className=" text-center collapse-content text-sm">
              Oui, nous proposons des facilités de paiement selon le type de
              voyage. Contactez-nous pour connaître les conditions et modalités.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item b">
            <input type="radio" name="my-accordion-4" />
            <div className="text-center collapse-title font-semibold">
              Les voyages sont-ils remboursables ?
            </div>
            <div className="text-center  collapse-content text-sm">
              Les conditions de remboursement varient selon le fournisseur et le
              type de réservation. Nous vous conseillons de lire nos Conditions
              Générales de Vente ou de nous contacter directement pour plus de
              précisions.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" />
            <div className="text-center collapse-title font-semibold">
              Quels documents sont nécessaires pour voyager ?
            </div>
            <div className="text-center collapse-content text-sm">
              Pour les voyages à l’étranger, un passeport valide est requis.
              Pour l’Omra ou le Hajj, des documents supplémentaires sont
              nécessaires (visa, carnet de vaccination, etc.). Nous vous
              assistons dans toutes les démarches.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
