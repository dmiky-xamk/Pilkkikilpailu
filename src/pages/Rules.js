import classes from "./Rules.module.css";

export default function Rules() {
  return (
    <section className={classes["section-rules"]}>
      <h1 className="heading-primary">Pilkkikilpailun säännöt</h1>
      <ul className={classes["rules-list"]}>
        <li>Osanottomaksu aikuisilta 5€, nuorilta ei peritä maksua</li>
        <li>Kilpailukaloiksi hyväksytään kaikki lain sallimat kalat.</li>
        <li>
          Saaliiksi saatu kala tulee säilyttää puhtaassa kuivassa astiassa tai
          pussissa, eikä mukaan saa lisätä hiekkaa, vettä tai muuta ainetta
          kilpailusta poissulkemisen uhalla.
        </li>
        <li>Kisoissa käytössä vapaat paikat.</li>
        <li>
          Kisapaikassa rauhoitus kisaviikon perjantaista kilpailun alkuun.
        </li>
        <li>Syöttäminen kielletty ennen kilpailua ja kilpailun aikana.</li>
        <li>Kilpailuissa 30 minuutin paluusiirtymä.</li>
        <li>Kahlatessa maksimisyvyys polveen saakka.</li>
        <li>Etäisyys kanssakilpailijaan vähintään 5-metriä.</li>
        <li>
          Onginta lopetettava välittömästi kilpailu-ajan päättyessä, kuitenkin
          jos ajan päättyessä on kala kiinni sen saa vielä nostaa ylös.
        </li>
      </ul>
    </section>
  );
}
