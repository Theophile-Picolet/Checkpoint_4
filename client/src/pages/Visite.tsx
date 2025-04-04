import { useLoaderData } from "react-router-dom";
import VisiteCard from "../components/VisiteCard";
import "../styles/visite.css";

export default function Visite() {
  const { visite } = useLoaderData() as { visite: Visite[] };
  const visite1 = visite.filter((v) => v.id === 1);
  const visite2 = visite.filter((v) => v.id === 2);
  const visite3 = visite.filter((v) => v.id === 3);

  return (
    <div className="visite">
      <h1>LES VISITES DU DOMAINE DALMAZ</h1>
      <section className="section2">
        <div className="visite-right">
          <h2>Visite de nos Chais</h2>
          {visite2.map((v) => (
            <VisiteCard key={v.type} visite={v} />
          ))}
        </div>
        <div className="visite-left">
          <img src="/Cave2.jpg" alt="" />
        </div>
      </section>
      <section className="section1">
        <div className="visite-left">
          <img src="/Syrah.jpg" alt="" />
        </div>
        <div className="visite-right">
          <h2>Visite des vignes du Domaine</h2>
          {visite1.map((v) => (
            <VisiteCard key={v.type} visite={v} />
          ))}
        </div>
      </section>
      <section className="section3">
        <div className="visite-right">
          <h2>Visite intégrale du domaine Dalmaz</h2>
          {visite3.map((v) => (
            <VisiteCard key={v.type} visite={v} />
          ))}
        </div>
        <div className="visite-left">
          <img src="/Domaine-viticole.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
