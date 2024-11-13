import { useState, useRef } from "react"
import "./Home.css"
import Appointments from "../Appointments/Appointments"
import HeaderVideo from "../../components/Hero/HeaderVideo"
import Service from "../Service"
import Footer from "../../components/Footer/Footer"
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton"

export const Home = () => {
  // eslint-disable-next-line
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )
  // Scroll to menu component
  const appointmentRef = useRef(null)

  const scrollToAppointment = () => {
    appointmentRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <HeaderVideo scrollToAppointment={scrollToAppointment} />
      <div className="homeDesign">
        <Service />
        <div ref={appointmentRef}></div>
        {tokenStorage && <Appointments />}
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
