import { useLoaderData } from "react-router-dom";
import DegustationCard from "../components/Degustation";
import "../styles/degustation.css";

export default function Degustation() {
  const { degustation } = useLoaderData() as { degustation: Degustation[] };
  const degustation1 = degustation.filter((d) => d.id === 1);
  const degustation2 = degustation.filter((d) => d.id === 2);
  const degustation3 = degustation.filter((d) => d.id === 3);
  return (
    <div className="degustation">
      <h1>LES DEGUSTATIONS DU DOMAINE DALMAZ</h1>
      <section className="section2">
        <div className="degustation-right">
          <h2>Atelier accords mets & vins</h2>
          {degustation2.map((d) => (
            <DegustationCard key={d.id} degustation={d} />
          ))}
        </div>
        <div className="degustation-left">
          <img src="/Accord-met-vin.jpg" alt="" />
        </div>
      </section>
      <section className="section1">
        <div className="degustation-left">
          <img src="/Vin-exception.jpg" alt="" />
        </div>
        <div className="degustation-right">
          <h2>Dégustation des grandes cuvées du Domaine</h2>
          {degustation1.map((d) => (
            <DegustationCard key={d.id} degustation={d} />
          ))}
        </div>
      </section>
      <section className="section3">
        <div className="degustation-right">
          <h2>Dégustation découverte des vins du Rhône</h2>
          {degustation3.map((d) => (
            <DegustationCard key={d.id} degustation={d} />
          ))}
        </div>
        <div className="degustation-left">
          <img src="/degustation.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
