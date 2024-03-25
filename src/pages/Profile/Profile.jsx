import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { fetchMyProfile, updateProfile } from "../../services/apiCalls"
import { useEffect, useState } from "react"
import { CustomButton } from "../../common/CustomButton/CustomButton"

const Profile = ({ usefullDataToken }) => {
  const [dataToShow, setDataToShow] = useState()

  const dataUser = JSON.parse(localStorage.getItem("decoded"))
  const navigate = useNavigate()

  const [write, setWrite] = useState("disabled")
  const [tokenStorage, setTokenStorage] = useState(dataUser?.token)
  const [loadedData, setLoadedData] = useState(false)

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  })

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(tokenStorage)

        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (!usefullDataToken === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        setLoadedData(true)
        console.log(fetched.data)
        setUser({
          firstName: fetched.data.firstName,
          lastName: fetched.data.lastName,
          email: fetched.data.email,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [user]) // Execute useEffect whenever the user changes

  const updateData = async () => {
    try {
      const fetched = await updateProfile(user, tokenStorage)
      console.log(fetched)
      // setUser({
      //   name: fetched.data.firstName,
      //   surname: fetched.data.lastName,
      //   email: fetched.data.email,
      // })
      console.log("from update data function")
      setWrite("disabled")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="profileDesign">
      <h1>Profile Page</h1>
      Hi!
      {user?.firstName}
      <div className="" onClick={() => navigate("/")}>
        navigate to HOME
      </div>
      <CustomButton
        className="loginButton updateData"
        title="update"
        functionEmit={updateData}
      />
    </div>
  )
}

export default Profile
