import "./Card.css"
const Card = ({ element }) => {
  // background-image: url(images/back.jpg);
  const styles = {
    backgroundImage: `url(${element.image})`,
    backgroundSize: "cover",
    width: "100%",
    height: "70vh",
    borderRadius: "2em",
  }

  console.log(`background-image: url(${element.image})`)
  return (
    <div style={styles}>
      <div>
        <h3 className="card-title">{element.serviceName}</h3>
        <div className="card-content">
          <div className="spacing"></div>
          <div className="card-text">{element.description}</div>
        </div>
      </div>

      <div className="card-link-wrapper"></div>
    </div>
  )
}
export default Card
