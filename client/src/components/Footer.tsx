import "../styles/footer.css";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-left">
          <p>CHÂTEAU DALMAZ</p>
          <p>F69420 AMPUIS</p>
          <p>Téléphone : +33(0)1.02.03.04.05</p>
        </div>
        <div className="footer-center">
          <p>Le Domaine</p>
          <p>Les Vignobles</p>
          <p>Les Vins</p>
        </div>
        <div className="footer-right">
          <p>Médias</p>
          <p>Actualités</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Mentions légales</p>
        <p className="footer-note">
          L'abus d'alcool est dangereux pour la santé, à consommer avec
          modération, mais ne pas en boire non plus n'est pas bon signe !
        </p>
      </div>
    </div>
  );
}
