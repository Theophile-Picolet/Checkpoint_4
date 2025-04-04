export default function VisiteCard({ vin }: { vin: Vin }) {
  return (
    <section className="vin-card">
      <img src={vin.image_src} alt={vin.nom} />
      <p>{vin.appellation}</p>
      <p className="vin-note">{vin.nom}</p>
      <p>{vin.millesime}</p>
    </section>
  );
}
// id: number;
// type: string;
// appellation: string;
// nom: string;
// millesime: number;
// alcoometrie: string;
// description?: string;
// prix: number;
// accordMet?: string;
// temperatureDegustation?: number;
// elevage?: string;
