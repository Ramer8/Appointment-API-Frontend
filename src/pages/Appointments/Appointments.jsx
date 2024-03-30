import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createAppointment,
  getMyAppointments,
  getServices,
} from "../../services/apiCalls"
import "./Appointments.css"
import AppointmentModal from "./AppointmentModal"

const Appointments = () => {
  const [appointments, setAppointments] = useState()
  const [services, setServices] = useState()
  const [appointmentChanged, setAppointmentChanged] = useState(false)

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

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED")
            console.log("token expired")
          setTokenStorage("")
          localStorage.removeItem("decoded")
          navigate("/login")

          //  setMsgError(fetched.message)
          throw new Error("Failed to fetch appointments data")
        }
        setAppointments(fetched.appointment)
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
  }, [appointmentChanged])

  //   const createMyAppointment = async (date) => {
  //     try {
  //       const fetched = await createAppointment(data, tokenStorage)
  //       console.log(fetched)
  //       // setMsgSuccess("Profile Udated")

  //       // setTimeout(() => {
  //       //   setMsgSuccess("")
  //       // }, SUCCESS_MSG_TIME)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  return (
    <>
      {appointments && (
        <div className="appointmentDesign">
          <div className="appointmentContainer">
            <h1>Appointments</h1>
            <div> + new / delete </div>
            {/* <CustomButton
              className={"createAppointment"}
              title={" + add New"}
              functionEmit={createMyAppointment(newAppointment)}
            /> */}
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
              <hr />
              {appointments.map((myAppointment) => (
                <div key={myAppointment.id} className="appointmentBox">
                  <div>{myAppointment.service.serviceName}</div>
                  <div>
                    {new Date(
                      myAppointment.appointmentDate
                    ).toLocaleDateString()}
                  </div>
                  <AppointmentModal
                    myAppointment={myAppointment}
                    tokenStorage={tokenStorage}
                    setAppointmentChanged={setAppointmentChanged}
                    appointmentChanged={appointmentChanged}
                    services={services}
                  />
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
