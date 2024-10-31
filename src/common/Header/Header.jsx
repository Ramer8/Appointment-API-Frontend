import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

//RDX
import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { userData } from "../../app/slices/userSlice"

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  // Listen for screen resizing to automatically close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false) // Close the mobile menu if the window size increases
      }
    }

    window.addEventListener("resize", handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    // Agregar un event listener para escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
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
      <nav className={`navbar ${scrollY > 100 ? "scrolling" : ""}`}>
        <CustomLink
          title={
            <div className="navbar-brand">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="deeppink"
                className="bi bi-droplet-half"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                />
              </svg>
            </div>
            // Drop icon
          }
          destination="/home"
        />
        {/* If user is SuperAdmin add this class to change margin because appear managment menu and
        menu row turn oversized */}
        <ul
          className={`nav-links-mobile
            ${isMobileMenuOpen && width < 768 ? "show" : "nav-links"}
                }`}
          // className={`nav-links-mobile
          //   ${
          //     isMobileMenuOpen && width < 768
          //       ? "show"
          //       : ` nav-links ${
          //           decoded
          //             ? decoded.tokenData.roleName === "super_admin" &&
          //               "isSuperAdmin"
          //             : ""
          //         }`
          //   }`}
        >
          <li>
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
          </li>
          <li>
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
          </li>
          {decoded?.token ? (
            <div className={`${isMobileMenuOpen ? "menu to-column" : "menu"}`}>
              <li>
                <CustomLink
                  title={decoded.tokenData.firstName}
                  destination="/profile"
                  className={`${
                    location.pathname === "/profile"
                      ? "menuHighlighted"
                      : "menu"
                  }`}
                />
              </li>
              <li onClick={logOut}>
                <CustomLink title="Log-out" destination="/" />
              </li>
            </div>
          ) : (
            <div className={`${isMobileMenuOpen ? "menu to-column" : "menu"}`}>
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
          {/* onClick={toggleMobileMenu} */}
        </ul>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <div className="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div> // Close icon
          ) : (
            <div className="hamburger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </div> // Hamburger icon
          )}
        </button>
      </nav>
      <Outlet />
      <main className="content"></main>
    </>
  )
}
