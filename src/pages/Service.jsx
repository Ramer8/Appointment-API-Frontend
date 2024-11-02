import { useEffect, useState } from "react"
// import Card from "../common/Card/Card"
import "./Service.css"
import { getServices } from "../services/apiCalls"
const Service = () => {
  const [services, setServices] = useState()
  const [hoveredId, setHoveredId] = useState(null)

  // Función que se ejecuta al pasar el mouse sobre el elemento

  const handleMouseEnter = (id) => {
    setHoveredId(id) // Guarda el id en el estado
    // console.log("ID del elemento con hover:", id)
  }
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await getServices()

        if (!fetched?.success) {
          //  setMsgError(fetched.message)
        }
        // setLoadedData(true)
        console.log(fetched.data)
        setServices(fetched.data)

        // setServices({
        //   serviceName: fetched.data.serviceName,
        //   description: fetched.data.description,
        //   id: fetched.data.id,
        // })
      } catch (error) {
        console.error(error)
      }
    }
    if (!services) {
      fetchServices()
    }
  }, [])
  return (
    <div className="service-design">
      <div className="content-service">
        <div className="box-service">
          <div className="top-service">
            <div className="title-paragraph">Our Services</div>
            <div className="service-paragraph">
              Vitae turpis massa sed elementum. Et odio pellentesque diam
              volutpat commodo. Ut lectus arcu bibendum at varius vel pharetra
              vel turpis. Aenean sed adipiscing diam donec adipiscing tristique
              risus nec feugiat. Massa vitae tortor condimentum lacinia. Nunc
              faucibus a pellentesque sit amet porttitor eget.
            </div>
          </div>
          <div className="images-service">
            {services?.map((element) => {
              if (element.id === hoveredId) {
                return (
                  <img
                    key={element.id}
                    src={element.image}
                    className="right-side-img"
                  ></img>
                )
              }
              return null // Retorna null si no hay coincidencia
            })}
            {/* <img
          className="left-side-img"
          src={"./img/Rectangle_4.jpg"}
          alt="img"
        ></img> */}
          </div>
        </div>

        <div className="grid-service">
          {services?.map((element) => (
            <div
              className="card-service"
              onMouseEnter={() => handleMouseEnter(element.id)} // Evento onMouseEnter
              key={element.id}
              //   onMouseLeave={() => setHoveredId(null)} // Limpia el id cuando el mouse sale
            >
              <div className="icon-service-content">
                <img
                  className="card-icon"
                  src={`./${element.id}.png`}
                  width="27px"
                  height="27px"
                ></img>
              </div>
              <div className="text-card-content">
                <div className="title-service-name">{element.serviceName}</div>
                <div className="description-service">{element.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Service
