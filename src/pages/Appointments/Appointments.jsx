import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyAppointments } from "../../services/apiCalls"

const Appointments = () => {
  const [appointments, setAppointments] = useState()
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded")).token
  )
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
  }, [])

  return (
    <>
      {appointments && (
        <div className="appointmentsDesign">
          <div className="appointmentContainer">
            <div>Appointments</div>
            <div>Icon ... to + new or delete app</div>

            {/* <input placeholder="Select Date">Select </input> */}
            {/* //associate icons with each services// */}
            <div className="appointmentList">
              {appointments.map((element) => (
                <div key={element.id}>
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
