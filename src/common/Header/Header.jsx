import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

//RDX
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { userData } from "../../app/slices/userSlice"

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const rdxUser = useSelector(userData)
  // const dispatch = useDispatch()

  useEffect(() => {
    console.log(rdxUser, " credenciales pasaporte")
  }, [rdxUser])

  let decoded = JSON.parse(localStorage.getItem("decoded"))

  const logOut = () => {
    localStorage.removeItem("decoded")
    decoded = ""
    navigate("/login")
  }

  return (
    <>
      <div className="headerDesign">
        {decoded
          ? decoded.tokenData.roleName === "super_admin" && (
              <div>
                <CustomLink
                  title="Managment"
                  destination="/managment"
                  className={`${
                    location.pathname === "/managment"
                      ? "menuHighlighted"
                      : "menu"
                  }`}
                />
              </div>
            )
          : ""}

        <CustomLink
          title={`${
            location.pathname === "/"
              ? "Home"
              : location.pathname === "/services"
              ? "Services"
              : "Home"
          }`}
          destination="/"
          className={`${
            location.pathname === "/" || location.pathname === "/services"
              ? "menuHighlighted"
              : "menu"
          }`}
        />
        {decoded?.token ? (
          <div className="menu">
            <CustomLink
              title={decoded.tokenData.firstName}
              destination="/profile"
              className={`${
                location.pathname === "/profile" ? "menuHighlighted" : "menu"
              }`}
            />
            <div onClick={logOut}>
              <CustomLink title="Log-out" destination="/" />
            </div>
          </div>
        ) : (
          <div className="menu">
            <CustomLink
              title="Login"
              destination="/login"
              className={`${
                location.pathname === "/login" ? "menuHighlighted" : "menu"
              }`}
            />
            <CustomLink
              title="Register"
              destination="/register"
              className={`${
                location.pathname === "/register" ? "menuHighlighted" : "menu"
              }`}
            />
          </div>
        )}
      </div>
      <main className="content">
        <Outlet />
      </main>
    </>
  )
}
