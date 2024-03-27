import { useNavigate } from "react-router-dom"
import { CustomButton } from "../CustomButton/CustomButton"
import "./Card.css"
const Card = ({ element }) => {
  const navigate = useNavigate()
  const logIn = () => {
    navigate("/login")
  }
  // background-image: url(images/back.jpg);
  const styles = {
    backgroundImage: `url(${element.image})`,
    backgroundSize: "cover",
    width: "100%",
    height: "70vh",
    borderRadius: "2em",
    // opacity: "70%",
  }

  console.log(`background-image: url(${element.image})`)
  return (
    <div style={styles}>
      <div>
        <h3 className="card-title">{element.serviceName}</h3>
        <div className="card-content">
          <div className="spacing"></div>
          <p>{element.description}</p>
        </div>
      </div>

      <div className="card-link-wrapper">
        {/* <a href="" className="card-link">
          Get Service
        </a> */}
        <CustomButton
          className={"cardButton"}
          title={"Get Service"}
          functionEmit={logIn}
        />
      </div>
    </div>
  )
}
{
  /* <Card element={element} /> */
}
export default Card

//
//   <div>
//   <div className="main">
//     <h2 className="data">{element.serviceName}</h2>
//     <div className="data">
//   {/* <a className="button button-white-outline" href="/es/signup/">
//     Get Service
//   </a> */}
//       <CustomButton
//         className={"cardButton"}
//         title={"Get Service"}
//         functionEmit={logIn}
//       />
//     </div>
//     <p className="row">Description:</p>
//     <ul className="row .info">
//       <li>{element.description}</li>
//     </ul>
//   </div>
//   </div>
