// ScrollToTopButton.js
import { useState, useEffect } from "react"
import "./ScrollToTopButton.css"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show the button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div>
      {isVisible && (
        <button className="scroll-top-design" onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-arrow-up-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
