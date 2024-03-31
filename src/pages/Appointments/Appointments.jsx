import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createAppointment,
  getMyAppointments,
  getServices,
} from "../../services/apiCalls"
import "./Appointments.css"
import AppointmentModal from "./AppointmentModal"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { formatDate } from "../../utils/functions"

const Appointments = () => {
  const [appointments, setAppointments] = useState()
  const [services, setServices] = useState()
  const [appointmentChanged, setAppointmentChanged] = useState(false)
  const [toggleForm, setToggleForm] = useState(false)
  const [toggleFormDelete, setToggleFormDelete] = useState(false)

  const [msgError, setMsgError] = useState("")

  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded")).token
  )
  const [newAppointment, setNewAppointment] = useState({
    appointment_date: "",
    service_id: "",
  })
  const ERROR_MSG_TIME = 5000
  //   const SUCCESS_MSG_TIME = 5000

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

  setTimeout(() => {
    setMsgError("")
  }, ERROR_MSG_TIME)

  const createMyAppointment = async (data) => {
    try {
      const fetched = await createAppointment(data, tokenStorage)
      console.log(fetched)
      //   setMsgSuccess("Profile Udated")

      //   setTimeout(() => {
      //     setMsgSuccess("")
      //   }, SUCCESS_MSG_TIME)
      setNewAppointment({ appointment_date: "", service_id: "" })
      setAppointmentChanged(!appointmentChanged) // to update appointment list
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault()
    // Read the form data
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    setNewAppointment((prevState) => ({
      ...prevState,
      service_id: Number(formJson.id),
    }))
    if (!newAppointment.appointment_date) {
      setMsgError("Please set a date & hour")
      return
    }
    createMyAppointment(newAppointment)
  }

  const inputHandler = (e) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: new Date(e.target.value)
        .toISOString()
        .replace("T", " ")
        .slice(0, 19),
    }))
    if (!newAppointment.service_id) {
      setMsgError("Please set a service")
      return
    }
  }

  return (
    <>
      {appointments && (
        <div className="appointmentDesign">
          <div className="appointmentContainer">
            <div className="title">
              <h2> Tattoo Appointment</h2>
              <CustomButton
                className={"addAppointment"}
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-calendar2-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 3.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5H2.545c-.3 0-.545.224-.545.5m6.5 5a.5.5 0 0 0-1 0V10H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V11H10a.5.5 0 0 0 0-1H8.5z" />
                  </svg>
                }
                functionEmit={() => setToggleForm(!toggleForm)}
              />
            </div>
            {toggleForm && (
              <form method="post" onSubmit={handleSubmit}>
                <label>Choose your service:</label>
                <select
                  name="id"
                  defaultValue={services.id}
                  className="selectAppointment"
                >
                  {services.map((services) => (
                    <option key={services.id} value={services.id}>
                      {services.serviceName}
                    </option>
                  ))}
                </select>
                <button type="submit" className="retrieveAppointment">
                  Create
                </button>
                <div className="dateAndError">
                  <CustomInput
                    className={`inputDesign inputDate`}
                    type={"datetime-local"}
                    min={new Date()}
                    placeholder={""}
                    name={"appointment_date"}
                    disabled={""}
                    value={
                      formatDate(
                        newAppointment.appointment_date || new Date()
                      ) || ""
                    }
                    functionChange={(e) => inputHandler(e)}
                    // onBlurFunction={(e) => checkError(e)}
                  />
                  {msgError && <div className="errorDate">{msgError}</div>}
                </div>
              </form>
            )}

            <div className="appointmentList">
              <div className="title">
                <h2>Appointment list</h2>
                <CustomButton
                  className={"addAppointment"}
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  }
                  functionEmit={() => setToggleFormDelete(!toggleFormDelete)}
                />
              </div>
              {/* {toggleFormDelete && (
                <form method="post" onSubmit={handleSubmit}>
                  <label>Choose service to delete</label>
                  <select
                    name="id"
                    defaultValue={services.id}
                    className="selectAppointment"
                  >
                    {appointments.map((myAppointment) => (
                      <option key={myAppointment.id} value={myAppointment.id}>
                        {myAppointment.service.serviceName}
                        {toggleModal && (
                          <AppointmentModal
                            myAppointment={myAppointment}
                            tokenStorage={tokenStorage}
                            setAppointmentChanged={setAppointmentChanged}
                            appointmentChanged={appointmentChanged}
                            services={services}
                          />
                        )}
                      </option>
                    ))}
                  </select>
                  <button type="submit">Submit</button>
                </form>
              )} */}
              <hr />
              {!appointments.length && "Nothing Scheduled"}
              {appointments.map((myAppointment) => (
                <div key={myAppointment.id} className="appointmentBox">
                  <div>{myAppointment.service.serviceName}</div>
                  <div>
                    {new Date(myAppointment.appointmentDate).toLocaleString()}
                  </div>

                  <AppointmentModal
                    myAppointment={myAppointment}
                    tokenStorage={tokenStorage}
                    setAppointmentChanged={setAppointmentChanged}
                    appointmentChanged={appointmentChanged}
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
