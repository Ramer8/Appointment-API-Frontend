import "./Card.css"
const Card = ({ element }) => {
  // background-image: url(images/back.jpg);
  const styles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),url(${element.image})`,
    backgroundSize: "cover",
    width: "75vw",
    height: "95vh",
    borderRadius: "2em",
  }

  // console.log(`background-image: url(${element.image})`)
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
