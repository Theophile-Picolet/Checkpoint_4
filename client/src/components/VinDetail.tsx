import { useLoaderData } from "react-router-dom";
import "../styles/vinDetail.css";

export default function Vin() {
  const vinData = useLoaderData() as {
    vinID: Vin;
    proportionId: Proportion;
    vins: Vin[];
  };

  console.info(vinData);
  const { vinID, proportionId } = vinData;
  return (
    <div className="vin-detail">
      <div className="left">
        <img src="/bouteille.webp" alt="" />
      </div>
      <div className="right">
        <h2>{vinID.appellation}</h2>
        <h3>{vinID.nom}</h3>
        <p>{vinID.millesime} 75 cl</p>
        <p>{vinID.temperatureDegustation}</p>
        <p>{vinID.alcoometrie}</p>
        <p>{proportionId.proportion}</p>
        <p>{vinID.elevage}</p>
        <p>{vinID.description}</p>
        <p>{vinID.prix} €</p>
        <p>{vinID.accordMet}</p>
        <p>{vinID.type}</p>
      </div>
    </div>
  );
}
