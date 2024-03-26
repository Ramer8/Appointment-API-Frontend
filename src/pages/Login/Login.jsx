import { useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { valide } from "../../utils/functions"
import { CustomButton } from "../../common/CustomButton/CustomButton"
// import { CustomButton } from "../../common/CustomButton/CustomButton"

export const Login = () => {
  const [msgError, setMsgError] = useState("")

  const [credenciales, setCredenciales] = useState({
    email: "",
    passwordBody: "",
  })

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordBodyError: "",
  })

  const ERROR_MSG_TIME = 9000

  const navigate = useNavigate()

  setTimeout(() => {
    setMsgError("")
  }, ERROR_MSG_TIME)

  const checkError = (e) => {
    const error = valide(e.target.name, e.target.value)

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const logMe = async () => {
    for (let element in credenciales) {
      if (credenciales[element] === "") {
        setMsgError("All fields are required")
        return
      }
    }

    const fetched = await loginMe(credenciales)

    if (!fetched.success) {
      setMsgError(fetched.message)

      return
    }

    const decoded = {
      tokenData: decodeToken(fetched.token),
      token: fetched.token,
    }

    //ahora si funciona esta forma de guardar en localStorage
    localStorage.setItem("decoded", JSON.stringify(decoded))

    // let a = JSON.parse(localStorage.getItem("decoded"))
    // console.log(a)

    //ahora si funciona esta forma de guardar en sessionStorage
    // sessionStorage.setItem("decoded", JSON.stringify(decoded))
    // let d = JSON.parse(sessionStorage.getItem("decoded"))

    // setUsefullDataToken({
    //   tokenData: decodeToken(fetched.token),
    //   token: fetched.token,
    // })

    //Home redirected
    navigate("/profile")
  }

  return (
    <div>
      <div className="loginDesign">
        {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}

        <CustomInput
          className={`inputDesign ${
            credencialesError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type="email"
          name="email"
          disabled={""}
          value={credenciales.email || ""}
          placeholder="email"
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />

        <CustomInput
          className={`inputDesign ${
            credencialesError.passwordBodyError !== "" ? "inputDesignError" : ""
          }`}
          type="password"
          name="passwordBody"
          disabled={""}
          value={credenciales.passwordBody || ""}
          placeholder="password"
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />

        <CustomButton
          className={"loginButton"}
          title={"Login"}
          functionEmit={logMe}
        />

        <div className="footer">
          {credencialesError.emailError && (
            <div className="error">{credencialesError.emailError}</div>
          )}
          {credencialesError.passwordBodyError && (
            <div className="error">{credencialesError.passwordBodyError}</div>
          )}
          {msgError && <div className="error">{msgError}</div>}
        </div>
      </div>
    </div>
  )
}
