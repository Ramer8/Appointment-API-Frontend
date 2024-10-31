import { useEffect, useState } from "react"
// import Card from "../common/Card/Card"
import "./Service.css"
import { getServices } from "../services/apiCalls"
const Service = () => {
  const [services, setServices] = useState()

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
          <div className="title-paragraph">Our Services</div>
          <div className="service-paragraph">
            Vitae turpis massa sed elementum. Et odio pellentesque diam volutpat
            commodo. Ut lectus arcu bibendum at varius vel pharetra vel turpis.
          </div>
        </div>
        <div className="grid-service">
          {services?.map((element) => (
            <div className="card-service" key={element.id}>
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
              {/* <Card element={element} /> */}
            </div>
          ))}
        </div>
      </div>
      <div className="images-service">
        <img
          className="left-side-img"
          src={"./img/Rectangle_4.jpg"}
          alt="img"
        ></img>
      </div>
    </div>
  )
}

export default Service
