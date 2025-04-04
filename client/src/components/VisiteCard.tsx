export default function VisiteCard({ visite }: { visite: Visite }) {
  return (
    <section className="visite-card">
      <p>{visite.description}</p>
      <p>{visite.prix} €/pers</p>
    </section>
  );
}
