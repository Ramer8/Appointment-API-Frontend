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
import { formatDate } from "../../utils/functions"

const AppointmentModal = ({
  myAppointment,
  tokenStorage,
  setAppointmentChanged,
  appointmentChanged,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [serviceToUpdate, setServiceToUpdate] = useState({
    appointmentDate: "",
    appointment_id: "",
  })

  Modal.setAppElement("#root")

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const fetching = async () => {
    try {
      const fetched = await getMyAppointments(tokenStorage)
      if (!fetched?.success) {
        //  setMsgError(fetched.message)
        throw new Error("Failed to fetch appointments data")
      }
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
      closeModal()
      fetching()
      setAppointmentChanged(!appointmentChanged)
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
  const inputHandler = (e) => {
    console.log(myAppointment.id)

    //   setServiceToUpdate((prevState) => ({
    //     ...prevState,
    //     appointment_id: myAppointment.id,
    //     appointmentDate: myAppointment.appointmentDate,
    //   }))

    setServiceToUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      appointment_id: myAppointment.id,
    }))
    console.log(serviceToUpdate)
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
        <h2>{myAppointment.service.serviceName}</h2>
        <hr />
        <div className="modalBox">
          <div>{myAppointment.service.description}</div>

          <div>{new Date(myAppointment.appointmentDate).toLocaleString()}</div>
        </div>
        <hr />

        <div className="buttons">
          <CustomInput
            className={`inputDesign inputDate`}
            type={"datetime-local"}
            min={new Date()}
            placeholder={""}
            name={"appointmentDate"}
            disabled={""}
            value={formatDate(myAppointment.appointmentDate) || ""}
            functionChange={(e) => inputHandler(e)}
            //   onBlurFunction={(e) => checkError(e)}
          />
          <CustomButton
            className={"editAppointment"}
            title={"submit"}
            functionEmit={() => editAppointment(serviceToUpdate)}
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
