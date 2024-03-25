import { useNavigate } from "react-router-dom"
import { CustomButton } from "../CustomButton/CustomButton"
import "./Card.css"
const Card = ({ element }) => {
  const navigate = useNavigate()
  const logIn = () => {
    navigate("/login")
  }

  return (
    <div>
      <div className="main">
        <h2 className="data">{element.serviceName}</h2>
        <div className="data">
          {/* <a className="button button-white-outline" href="/es/signup/">
            Get Service
          </a> */}
          <CustomButton
            className={"cardButton"}
            title={"Get Service"}
            functionEmit={logIn}
          />
        </div>
        <p className="row">Description:</p>
        <ul className="row .info">
          <li>{element.description}</li>
        </ul>
      </div>
    </div>
  )
}

export default Card
