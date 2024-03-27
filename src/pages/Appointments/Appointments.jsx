import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createAppointment,
  getMyAppointments,
  getServices,
} from "../../services/apiCalls"
import "./Appointments.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

const Appointments = () => {
  const [appointments, setAppointments] = useState()
  const [services, setServices] = useState()

  const [data, setData] = useState()
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded")).token
  )

  const [newAppointment, setNewAppointment] = useState({
    appointment_date: "",
    service_id: "",
  })
  //"2024-04-15 12:00:00"

  const navigate = useNavigate()

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/")
    }
  }, [tokenStorage])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await getMyAppointments(tokenStorage)
        console.log(fetched)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          throw new Error("Failed to fetch appointments data")
        }
        setAppointments(fetched.appointment)
        console.log(fetched.appointment)
      } catch (error) {
        console.error(error)
      }
    }
    fetching()

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

    fetchServices()
  }, [])

  const createMyAppointment = async (date) => {
    try {
      const fetched = await createAppointment(data, tokenStorage)
      console.log(fetched)
      // setMsgSuccess("Profile Udated")

      // setTimeout(() => {
      //   setMsgSuccess("")
      // }, SUCCESS_MSG_TIME)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {appointments && (
        <div className="appointmentDesign">
          <div className="appointmentContainer">
            <h1>Appointments</h1>
            <div> + new / delete </div>
            <CustomButton
              className={"createAppointment"}
              title={" + add New"}
              functionEmit={createMyAppointment(newAppointment)}
            />
            {/* <select
              className="select"
              value={newAppointment.service_id}
              onChange={(e) => () => console.log(e.target.value)}
              //  setData(e.target.value)}
            ></select>
            <option value="">Select</option>
            {services.map((services) => (
              <option key={services.id} value={services.id} className="option">
                {services.serviceName}
              </option>
            ))} */}

            {/* <input placeholder="Select Date">Select </input> */}
            {/* //associate icons with each services// */}
            <div className="appointmentList">
              <h2>Appointment List</h2>
              {appointments.map((element) => (
                <div key={element.id} className="appointmentBox">
                  <div>{element.service.serviceName}</div>
                  <div>
                    {new Date(element.appointmentDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Appointments
