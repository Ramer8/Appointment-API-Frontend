import { useState } from "react"
import "./Home.css"
import { CustomLink } from "../../common/CustomLink/CustomLink"
import Appointments from "../Appointments/Appointments"

export const Home = () => {
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )

  return (
    <div className="homeDesign">
      {tokenStorage && <Appointments />}

      <CustomLink
        title="View Services "
        destination="/services"
        className="services"
      />
    </div>
  )
}
