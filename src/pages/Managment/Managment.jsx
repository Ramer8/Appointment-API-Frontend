import { useEffect, useState } from "react"
import "./Managment.css"
import { useNavigate } from "react-router-dom"
import { deleteMoreThanOneUsers, fetchAllUsers } from "../../services/apiCalls"
import { CustomButton } from "../../common/CustomButton/CustomButton"
const Managment = () => {
  const [loadedData, setLoadedData] = useState(false)
  const [users, setUsers] = useState()
  const [usersToDelete, setUsersToDelete] = useState({})
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )
  const [checkButton, setCheckButton] = useState(false)
  const navigate = useNavigate()
  let arrayToDelete = []
  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchAllUsers(tokenStorage)

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
  }, [loadedData])
  const handleCheck = (e, id) => {
    setCheckButton(!checkButton)
    console.log(e.target.value)
    console.log(id)
    console.log(checkButton)

    const isInArray = arrayToDelete.includes(id)
    if (isInArray) {
      const index = arrayToDelete.indexOf(id)
      arrayToDelete.splice(index, 1)
      console.log("clear user not delete")
    } else {
      arrayToDelete.push(id)
    }
    setCheckButton(false)
    console.log(arrayToDelete)

    // setUsersToDelete({ usersId: arrayToDelete })
    console.log(usersToDelete)
  }

  const deleteUsers = async () => {
    const usersToRemove = { usersId: arrayToDelete }
    console.log(usersToRemove)
    try {
      const fetched = await deleteMoreThanOneUsers(usersToRemove, tokenStorage)
      console.log(fetched)
      if (!fetched?.success) {
        console.log(fetched.message)
        //  setMsgError(fetched.message)
        if (!tokenStorage === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
    } catch (error) {
      console.log(error)
    }
    console.log(arrayToDelete)
    arrayToDelete = [""]
    setLoadedData(false)
    // setUsersToDelete("")
  }

  return (
    <div className="managmentDesign">
      <div className="userContainer">
        {!users?.length && "No users loaded"}
        {users && (
          <div className="table">
            <div className="preHeader">
              <div className="leftSide">
                User list
                {/* {arrayToDelete.length == !0 && `Selected ${arrayToDelete.length}`} */}
              </div>
              <CustomButton
                className={"deleteUsers"}
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
                functionEmit={() => deleteUsers()}
              />
            </div>
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
                      <input
                        id="s1"
                        type="checkbox"
                        className="switch"
                        value={checkButton.state}
                        onChange={(e) => handleCheck(e, user.id)}
                      />
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
