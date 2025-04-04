import { useLoaderData } from "react-router-dom";
import VinCard from "../components/VinCard";
import "../styles/vin.css";
import "../styles/cave.css";

export default function Visite() {
  const { vin } = useLoaderData() as { vin: Vin[] }; // Assurez-vous que le type correspond
  const vinRouge = vin.filter((v) => v.type === "Rouge");
  const vinBlanc = vin.filter((v) => v.type === "Blanc");
  console.info(vinRouge);
  console.info(vinBlanc);
  return (
    <div className="cave">
      <img src="/Cave.jpg" alt="" />
      <h1>LA CAVE DU DOMAINE DALMAZ</h1>
      <h2>Les cépages Rouges</h2>
      <section className="vin-section">
        {vinRouge.map((v) => (
          <VinCard key={v.id} vin={v} />
        ))}
      </section>
      <h2>Les cépages Blancs</h2>
      <section className="vin-section">
        {vinBlanc.map((v) => (
          <VinCard key={v.id} vin={v} />
        ))}
      </section>
    </div>
  );
}
