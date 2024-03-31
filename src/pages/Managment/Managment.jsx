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
        console.log(fetched.data)
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
        setUsers(fetched.data)
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
      <div className="userContainer">
        User list
        <hr />
        {!users?.length && "No users loaded"}
        {users && (
          <div className="table">
            <div className="header">
              <div>ID</div>
              <div>First Name</div>
              <div>Last Name</div>
              <div>Email</div>
            </div>
            <div className="body-container">
              <div className="body">
                {users?.map((user) => (
                  <div key={user.id} className="row">
                    <div>{user.id}</div>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>{user.email}</div>
                    <div>
                      <input id="s1" type="checkbox" className="switch" />
                      {/* <label htmlFor="s1"></label> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Managment
