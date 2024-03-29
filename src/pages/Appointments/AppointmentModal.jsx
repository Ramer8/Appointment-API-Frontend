import { useState } from "react"
import Modal from "react-modal"
import "./Modal.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { deleteAppointment, getMyAppointments } from "../../services/apiCalls"
const AppointmentModal = ({
  element,
  tokenStorage,
  setAppointmentChanged,
  appointmentChanged,
}) => {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

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
      console.log(fetched)
      if (!fetched?.success) {
        //  setMsgError(fetched.message)
        throw new Error("Failed to fetch appointments data")
      }
      //   setAppointments(fetched.appointment)
      console.log(fetched.appointment)
    } catch (error) {
      console.error(error)
    }
  }
  const editAppointment = async (id) => {
    console.log(id)
  }
  const deleteMyAppointment = async (id) => {
    try {
      const fetched = await deleteAppointment(id, tokenStorage)
      console.log(fetched)
      if (!fetched?.success) {
        //  setMsgError(fetched.message)
        if (!tokenStorage === undefined) {
          throw new Error("Failed to fetch profile data")
        }
      }
      closeModal()
      fetching()
      setAppointmentChanged(!appointmentChanged)
    } catch (error) {
      console.log(error)
    }
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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          {element.service.serviceName}
        </h2>
        <div className="modalBox">
          <div>{element.service.description}</div>
          <div>{new Date(element.appointmentDate).toLocaleString()}</div>
        </div>
        <CustomButton
          className={"editAppointment"}
          title={"edit"}
          functionEmit={() => editAppointment(element.id)}
        />
        <CustomButton
          className={"deleteAppointment"}
          title={"delete"}
          functionEmit={() => deleteMyAppointment(element.id)}
        />
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  )
}

export default AppointmentModal
