import React from 'react';
import NeoFooter from '../components/NeoFooter';
import Navbar from '../components/Navbar';
const ConditionVente = () => {
  return (
    <>
      <Navbar />
      <section className="pt-[140px] max-w-5xl mx-auto px-6 py-10 text-gray-800 space-y-8 leading-relaxed">
        <h1 className="text-3xl font-bold text-center text-emerald-700">
          Conditions Générales de Vente
        </h1>

        <p>
          Seuls sont concernés par les présentes conditions de vente, les
          produits commercialisés sur notre site : <strong>Alpha Oasis</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          1. Objet et portée des conditions de vente
        </h2>
        <p>
          L'agence de voyages agit en tant qu'intermédiaire agréé auprès des
          compagnies aériennes et des prestataires terrestres. Elle ne peut
          traiter que les réclamations relevant de sa responsabilité directe.
          Alpha Oasis ne saurait être tenue responsable des visas, accidents,
          blessures, pertes, vols, ou changements indépendants de sa volonté.
        </p>
        <p>
          Nos conditions générales de vente se réfèrent aux décrets 94-490 du 15
          juin 1994 et à la loi 92-645 du 31 juillet 1992, adaptés aux
          dispositions légales marocaines sur la vente de voyages ou séjours.
        </p>
        <p>
          Toute inscription à un voyage via le site{' '}
          <strong>AlphaOasis.ma</strong> implique l'acceptation pleine et
          entière des présentes conditions. En cas de contradiction avec un
          contrat spécifique, ce dernier prévaut.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          2. Réservation et confirmation
        </h2>
        <p>
          Le client garantit l'exactitude des informations fournies lors de la
          réservation.
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Sélection du ou des produits</li>
          <li>Saisie des informations nécessaires à la réservation</li>
          <li>Choix du moyen de paiement</li>
          <li>Validation de la commande (contrat électronique)</li>
        </ol>
        <p>
          La confirmation du voyage est définitive après paiement intégral et
          validation des disponibilités.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          3. Moyens de paiement
        </h2>
        <p>
          En agence, Alpha Oasis accepte : chèques de banque, cartes bancaires,
          espèces et virements bancaires.
        </p>
        <p>
          <strong>Coordonnées bancaires :</strong>
          <br />
          Agence : 30 Rue Bnou Zarara, Maarif, Casablanca
          <br />
          RIB : 022.780.0000.84.002.77.56993.74
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">4. Prix</h2>
        <p>
          Les prix sont indiqués en dirhams marocains (MAD), TTC, et sont
          valables au moment de la commande, sous réserve de disponibilité. Tout
          changement de taux de TVA est automatiquement répercuté sur les prix.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          5. Promotions
        </h2>
        <p>
          Les réductions ne sont pas rétroactives ni cumulables. Deux personnes
          ayant réservé le même séjour à des tarifs différents ne peuvent
          prétendre à une régularisation.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          6. Responsabilité
        </h2>
        <p>
          Alpha Oasis ne peut être tenue responsable en cas de force majeure,
          d'événements extérieurs, ou d'erreur imputable au client. Elle ne
          garantit pas les prestations réservées en dehors du contrat ou sur
          place par le client.
        </p>
        <p>
          Les retards, changements d'aéroport ou d'itinéraire liés aux
          compagnies ne donnent droit à aucune indemnisation.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          7. Confidentialité des données
        </h2>
        <p>
          Les données collectées sont nécessaires au traitement de la commande,
          sécurisées et confidentielles. Le client dispose d'un droit d’accès,
          de modification et de suppression.
        </p>
        <p>
          Vous pouvez refuser de recevoir des communications commerciales en le
          signalant à notre équipe.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          8. Preuve des transactions
        </h2>
        <p>
          Les enregistrements numériques des transactions sur notre plateforme
          constituent la preuve des engagements contractés entre Alpha Oasis et
          ses clients.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-600">
          9. Voyage à la carte
        </h2>
        <p>
          Les prix des voyages à la carte ou deals peuvent être modifiés à tout
          moment, même après réservation. Ces changements dépendent de la
          disponibilité et des conditions des prestataires.
        </p>
      </section>
      <NeoFooter/>
    </>
  );
};
export default ConditionVente;
