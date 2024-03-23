import { useState } from "react"
import "./Register.css"
import { registerMe } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
// import Spinner from "../../common/Spinner/Spinner"
export const Register = () => {
  const [msgError, setMsgError] = useState("")

  const [loadingFlag] = useState(false)
  const [credenciales, setCredenciales] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const ERROR_MSG_TIME = 3000

  const navigate = useNavigate()

  setTimeout(() => {
    setMsgError("")
  }, ERROR_MSG_TIME)

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const regMe = async () => {
    for (let credencial in credenciales) {
      if (credenciales[credencial] === "") {
        setMsgError("No has rellenado todos los campos")
        return
      }
    }
    const fetched = await registerMe(credenciales)

    // if (fetched.success) {
    //   // setTimeout(() => {
    //   // setLoadingFlag(true)
    //   //   navigate("/login")
    //   // }, ERROR_MSG_TIME)
    // }

    if (!fetched.success) {
      setMsgError(fetched.message)
      return
    }
    //  setCredential(credenciales)
    //Login redirected
    navigate("/login")
  }
  return (
    <div className="registerDesign">
      {!loadingFlag ? (
        <div>
          {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}

          <CustomInput
            design="inputDesign"
            type="text"
            name="firstName"
            value={credenciales.firstName || ""}
            placeholder="write your name...."
            functionChange={inputHandler}
          />
          <CustomInput
            design="inputDesign"
            type="text"
            name="lastName"
            value={credenciales.lastName || ""}
            placeholder="write your last name...."
            functionChange={inputHandler}
          />
          <CustomInput
            design="inputDesign"
            type="email"
            name="email"
            value={credenciales.email || ""}
            placeholder="write your email...."
            functionChange={inputHandler}
          />
          <CustomInput
            design="inputDesign"
            type="password"
            name="password"
            value={credenciales.password || ""}
            placeholder="write your password...."
            functionChange={inputHandler}
          />
        </div>
      ) : (
        // <Spinner />
        ""
      )}

      <div
        className="registerButton"
        onClick={
          regMe
          //   ,
          // () => {
          //   setLoadingFlag(true)
          // }
        }
      >
        {loadingFlag ? "Register succesfully" : "Register me!"}
      </div>
      {msgError && <div className="error">{msgError}</div>}
    </div>
  )
}
