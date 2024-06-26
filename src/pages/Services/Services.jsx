import { useEffect, useState } from "react"
import { getServices } from "../../services/apiCalls"
import Card from "../../common/Card/Card"
import "./Services.css"
const Services = () => {
  const [services, setServices] = useState()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await getServices()

        if (!fetched?.success) {
          //  setMsgError(fetched.message)
        }
        setServices(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (!services) {
      fetchServices()
    }
  }, [])

  return (
    <>
      {!services ? (
        <div>CARGANDO</div>
      ) : (
        <div className="serviceDesign">
          <div className="container">
            <div className="titleContainerServices">Services</div>
            <div className="cards">
              {services?.map((element) => (
                <li className="card" key={element.id}>
                  <Card element={element} />
                </li>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Services
