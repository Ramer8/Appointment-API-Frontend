import { useState } from "react"
import Modal from "react-modal"
import "./Modal.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { ToastContainer, toast } from "react-toastify"

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
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
      setTimeout(() => {
        closeModal()
        fetching()
        setAppointmentChanged(!appointmentChanged) // to update appointment list
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMyAppointment = async (id) => {
    try {
      const fetched = await deleteAppointment(id, tokenStorage)
      console.log(fetched)
      if (!fetched?.success) {
        if (!tokenStorage === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      if (fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })
      }
      setTimeout(() => {
        closeModal()
        fetching()
        setAppointmentChanged(!appointmentChanged) // to update appointment list
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
  const inputHandler = (e) => {
    console.log(myAppointment.id)

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
        title={
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </div>
        }
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
        <div className="dateInput">
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
        </div>
        <div className="buttons">
          <CustomButton
            className={"submitAppointment"}
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
            }
            functionEmit={() => editAppointment(serviceToUpdate)}
          />
          <CustomButton
            className={"deleteAppointment"}
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            }
            functionEmit={() => deleteMyAppointment(myAppointment.id)}
          />
        </div>
        <ToastContainer />
      </Modal>
    </div>
  )
}

export default AppointmentModal
