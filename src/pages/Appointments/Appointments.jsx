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
            <div className="titleContainer">
              <div> Tattoo Appointment</div>
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
              <div className="appointmentNewBox">
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="formAppointmentNew"
                >
                  <label>Choose your service:</label>
                  <div className="rowAppointmentNew">
                    <select
                      name="id"
                      defaultValue={services.id}
                      className="selectAppointmentList"
                    >
                      {services.map((services) => (
                        <option key={services.id} value={services.id}>
                          {services.serviceName}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="addAppointment">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                      </svg>
                    </button>
                  </div>
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
              </div>
            )}
            <div className="appointmentList">
              <div className="titleList">Appointment list</div>
              <hr />
              {!appointments.length && "Nothing Scheduled"}
              {appointments.map((myAppointment) => (
                <div key={myAppointment.id} className="appointmentBox">
                  <div className="rowBox">
                    <div className="leftSideBox">
                      <div className="avatarService">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-flower1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                        </svg>
                      </div>
                      <div className="leftTextBox">
                        <div className="serviceName">
                          {myAppointment.service.serviceName}
                        </div>
                        <div className="date">
                          {new Date(
                            myAppointment.appointmentDate
                          ).toDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="rightSideBox">
                      <AppointmentModal
                        myAppointment={myAppointment}
                        tokenStorage={tokenStorage}
                        setAppointmentChanged={setAppointmentChanged}
                        appointmentChanged={appointmentChanged}
                      />
                    </div>
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
