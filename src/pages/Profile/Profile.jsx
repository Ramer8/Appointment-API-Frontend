import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { fetchMyProfile } from "../../services/apiCalls"
import { useEffect, useState } from "react"

const Profile = ({ usefullDataToken }) => {
  const [dataToShow, setDataToShow] = useState()

  const dataUser = JSON.parse(localStorage.getItem("decoded"))
  const navigate = useNavigate()

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(dataUser.token)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (!usefullDataToken === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        const data = await fetched
        console.log(data.data)
        setDataToShow(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [dataUser.token, usefullDataToken]) // Execute useEffect whenever the token changes
  return (
    <div className="profileDesign">
      <h1>Profile Page</h1>
      Hi!
      {dataToShow?.firstName}
      <div onClick={() => navigate("/")}>navigate to HOME</div>
    </div>
  )
}

export default Profile
