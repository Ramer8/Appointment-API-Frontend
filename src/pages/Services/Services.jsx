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
    <>
      {!services ? (
        <div>CARGANDO</div>
      ) : (
        services?.map((element) => (
          <div className="serviceDesign" key={element.id}>
            <Card element={element} />
          </div>
        ))
      )}
    </>
  )
}

export default Services
