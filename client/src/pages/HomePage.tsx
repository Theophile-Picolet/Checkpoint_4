import "../styles/homePage.css";
import "../styles/vinCard.css";
import { useLoaderData } from "react-router-dom";
import VinCard from "../components/VinCard";
export default function HomePage() {
  const { vin } = useLoaderData() as { vin: Vin[] };
  const vinPremium = vin.filter((v) => v.prix > 40);
  const vinPremimRouge = vinPremium.filter((v) => v.type === "Rouge");
  return (
    <div className="homepage">
      <div className="landscape">
        <img src="/Domaine-viticole.jpg" alt="" />
        <img src="/Vigne.jpg" alt="" />
        <img src="/vigne-landscape.jpg" alt="" />
      </div>

      <h2>LA MAISON DALMAZ</h2>
      <p>
        La Maison Dalmaz “Au-delà de l’aspect culturel et patrimonial, toutes
        les attentions mises en œuvre au cours de la vie du vin sont destinées à
        apporter un plaisir intense et parfois inattendu. Un grand vin
        s’apprécie dans des moments forts de partage et de convivialité et s’il
        devient un vecteur d’émotions, ce vin de la Maison Dalmaz trouve alors
        tout son sens.”
      </p>
      <h2>LES VINS DE LA MAISON DALMAZ</h2>
      <div className="cuvee">
        {vinPremimRouge.map((v) => (
          <section key={v.id}>
            <VinCard vin={v} />
          </section>
        ))}
      </div>
      <p className="homepage-last">
        La Maison Dalmaz est une maison fondée en 1773 par la famille Dalmaz,
        qui a pour but de mettre en avant les terroirs et le savoir-faire des
        vignerons de la Vallée du Rhône. Nous avons à cœur de vous faire
        découvrir nos cuvées, élaborées avec soin et passion.
      </p>
    </div>
  );
}
