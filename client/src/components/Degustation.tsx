export default function DegustationCard({
  degustation,
}: { degustation: Degustation }) {
  return (
    <section className="visite-card">
      <p>{degustation.description}</p>
      <p>{degustation.prix} €/pers</p>
    </section>
  );
}
