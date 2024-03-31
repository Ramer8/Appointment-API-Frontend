import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"
export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const decoded = JSON.parse(localStorage.getItem("decoded"))
  const logOut = () => {
    localStorage.removeItem("decoded")
    navigate("/login")
  }

  return (
    <>
      <div className="headerDesign">
        {decoded.tokenData.roleName === "super_admin" && (
          <div>
            <CustomLink
              title="Managment"
              destination="/managment"
              className={`${
                location.pathname === "/managment" ? "menuHighlighted" : "menu"
              }`}
            />
          </div>
        )}
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
      <main
      // className="md:w-3/4 p-10 md:h-screen overflow-scroll"
      >
        <Outlet />
      </main>
    </>
  )
}
