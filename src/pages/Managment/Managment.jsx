import { useEffect, useState } from "react"
import "./Managment.css"
import { useNavigate } from "react-router-dom"
import { fetchAllUsers } from "../../services/apiCalls"
const Managment = () => {
  const [loadedData, setLoadedData] = useState(false)
  const [users, setUsers] = useState()
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded")).token
  )
  const navigate = useNavigate()

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchAllUsers(tokenStorage)
        console.log(fetched)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            console.log("token expired")
            setTokenStorage("")
            localStorage.removeItem("decoded")
            navigate("/login")
          }
          if (!tokenStorage === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        setLoadedData(true)
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [])

  return (
    <div className="managmentDesign">
      Hello Super Admin
      <div className="userContainer">
        <div className="user"></div>
      </div>
    </div>
  )
}

export default Managment
