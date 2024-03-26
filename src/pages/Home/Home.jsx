import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../services/apiCalls"
import "./Home.css"
import { CustomLink } from "../../common/CustomLink/CustomLink"

export const Home = ({ usefullDataToken, msgError }) => {
  const [dataToShow, setDataToShow] = useState()

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(usefullDataToken?.token)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (!usefullDataToken === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        const data = await fetched
        setDataToShow(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [usefullDataToken]) // Execute useEffect whenever the token changes

  return (
    <div className="homeDesign">
      <div>{msgError}</div>
      <h1> HOME </h1>
      <h2>{dataToShow && `Welcome ${dataToShow?.firstName}`}</h2>
      <CustomLink
        title="View Services "
        destination="/services"
        className="services"
        // className={`${
        //   location.pathname === "/register" ? "menuHighlighted" : "menu"
        // }`}
      />
    </div>
  )
}
