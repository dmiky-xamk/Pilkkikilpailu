import classes from "./Home.module.css";

export default function Home() {
  return (
    <section className={classes["section-home"]}>
      <h1 className="heading-primary">Tervetuloa pilkkimään</h1>
      <p className={classes["home-text"]}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem rerum
        blanditiis provident quidem doloremque eaque dolorum itaque, at aliquid
        minima optio nihil magnam neque aperiam necessitatibus labore! Explicabo
        corporis neque voluptates? Fuga saepe quae reiciendis temporibus
        explicabo aliquid eaque ab! Architecto omnis beatae, velit, in officia
        cumque corporis inventore aliquam ea, nihil rerum cupiditate quos
        similique! Nihil eaque quisquam rem eum vel fugit repellat illum numquam
        nostrum? Et ullam, necessitatibus ut nisi error officiis, amet dicta
        nesciunt quae soluta enim?
      </p>
    </section>
  );
}
