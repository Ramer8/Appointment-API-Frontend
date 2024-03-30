import { useState } from "react"
import Modal from "react-modal"
import "./Modal.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import {
  deleteAppointment,
  getMyAppointments,
  updateMyAppointment,
} from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
const AppointmentModal = ({
  myAppointment,
  tokenStorage,
  setAppointmentChanged,
  appointmentChanged,
  services,
}) => {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isShowingInput, setIsShowingInput] = useState(false)
  const [serviceToUpdate, setServiceToUpdate] = useState({
    appointmentDate: "",
    appointment_id: "",
  })
  //     {
  //     appointmentDate: "",
  //     id: "",
  //   })

  //   console.log(services)
  //   console.log(
  //     " my appointments are",
  //     myAppointment.appointmentDate
  //     //   myAppointment.service.serviceName
  //   )
  Modal.setAppElement("#root")

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue"
  }

  function closeModal() {
    setIsOpen(false)
  }

  const fetching = async () => {
    try {
      const fetched = await getMyAppointments(tokenStorage)
      //   console.log(fetched)
      if (!fetched?.success) {
        //  setMsgError(fetched.message)
        throw new Error("Failed to fetch appointments data")
      }
      //   setAppointments(fetched.appointment)
      //   console.log(fetched.appointment)
    } catch (error) {
      console.error(error)
    }
  }
  const editAppointment = async (data) => {
    try {
      const fetched = await updateMyAppointment(data, tokenStorage)

      console.log(fetched)
      //     setMsgSuccess("Appointment Udated")

      //   setTimeout(() => {
      //     setMsgSuccess("")
      //   }, SUCCESS_MSG_TIME)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMyAppointment = async (id) => {
    try {
      const fetched = await deleteAppointment(id, tokenStorage)
      //   console.log(fetched)
      if (!fetched?.success) {
        //  setMsgError(fetched.message)
        if (!tokenStorage === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      closeModal()
      fetching()
      setAppointmentChanged(!appointmentChanged) // to update appointment list
    } catch (error) {
      console.log(error)
    }
  }
  // const inputHandler = (e) => {
  //   setServiceToUpdate((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault()
    // Read the form data
    const form = e.target
    const formData = new FormData(form)
    //

    // You can pass formData as a fetch body directly:
    // fetch("/some-api", { method: form.method, body: formData })
    // You can generate a URL out of it, as the browser does by default:
    // console.log(new URLSearchParams(formData).toString())
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries())

    console.log(formJson.id) // (!) This doesn't include multiple select values
    console.log(Number(formJson.id))
    // Or you can get an array of name-value pairs.
    // console.log([...formData.entries()])

    setServiceToUpdate((prevState) => ({
      ...prevState,
      appointment_id: Number(formJson.id),
      appointmentDate: myAppointment.appointmentDate,
    }))

    // setServiceToUpdate({
    //   appointmentDate: myAppointment.appointmentDate,
    //   appointment_id: Number(formJson.id),
    // })
    console.log("the service to update is", serviceToUpdate)
    editAppointment(serviceToUpdate)
  }
  return (
    <div>
      <CustomButton
        className={"retrieveAppointment"}
        title={"edit/delete"}
        functionEmit={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <CustomButton
          className={"closeModalButton"}
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          }
          functionEmit={closeModal}
        />
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          {myAppointment.service.serviceName} {myAppointment.id}
        </h2>
        <hr />
        <div className="modalBox">
          <div>{myAppointment.service.description}</div>

          <div>{new Date(myAppointment.appointmentDate).toLocaleString()}</div>
        </div>
        <hr />

        <form method="post" onSubmit={handleSubmit}>
          <label>Choose your service to update:</label>
          <select
            name="id"
            defaultValue={myAppointment.service.id}
            className="selectAppointment"
          >
            {services.map((appointmentToUpdate) => (
              <option
                key={appointmentToUpdate.id}
                value={appointmentToUpdate.id}
              >
                {appointmentToUpdate.serviceName}
              </option>
            ))}
          </select>

          {/* <label>
            Choose your new date:
            <select
              name="selectedVegetables"
              multiple={true}
              defaultValue={["corn", "tomato"]}
            >
              <option value="cucumber">Cucumber</option>
              <option value="corn">Corn</option>
              <option value="tomato">Tomato</option>
            </select>
          </label> */}
          <hr />
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>

        {/* <CustomInput
          className={
            "input"
            // `inputDesign ${
            //   userError.emailError !== "" ? "inputDesignError" : ""
            // }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
          }
          type={"text"}
          placeholder={""}
          name={"service"}
          disabled={isShowingInput}
          value={"" || ""}
          functionChange={(e) => inputHandler(e)}
          //   onBlurFunction={(e) => checkError(e)}
        /> */}
        <div className="buttons">
          <CustomButton
            className={"editAppointment"}
            title={"edit"}
            functionEmit={() => editAppointment(myAppointment.id)}
          />
          <CustomButton
            className={"deleteAppointment"}
            title={"delete"}
            functionEmit={() => deleteMyAppointment(myAppointment.id)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AppointmentModal
