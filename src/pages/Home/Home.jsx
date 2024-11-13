import { useState } from "react"
import "./Home.css"
import Appointments from "../Appointments/Appointments"
import HeaderVideo from "../../components/Hero/HeaderVideo"
import Service from "../Service"
import Footer from "../../components/Footer/Footer"

export const Home = () => {
  // eslint-disable-next-line
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )

  return (
    <>
      <HeaderVideo />
      <div className="homeDesign">
        <Service />

        {tokenStorage && <Appointments />}
      </div>
      <Footer />
    </>
  )
}
