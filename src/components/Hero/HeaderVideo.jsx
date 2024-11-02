import { useEffect, useState } from "react"
import "./HeaderVideo.css"

const Header = ({ scrollToPosition }) => {
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <div>
      <header className={`header-video ${scrollY > 200 ? "scrolling" : ""}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video-header"
          poster="/tattoopic.jpg"
        >
          <source src="/tattoohero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay-header"></div>
        <div className="header-content-video">
          {/* <p>Dr.</p> */}
          <div className="content-video-title">
            <div className="title-video">Tattoo</div>
            <div>Shop</div>
          </div>
        </div>
        <div className="header-button">
          <button className="menu-button" onClick={scrollToPosition}>
            Pedir Turno
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header
