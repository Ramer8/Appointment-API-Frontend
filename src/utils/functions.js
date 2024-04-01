export const valide = (type, value) => {
  switch (type) {
    case "name":
    case "nombre":
    case "surname":
    case "cognom":
      if (value.length < 3) {
        return "Please, the name must be at least three characters long."
      }

      return ""

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

      if (!emailRegex.test(value)) {
        return "Please, the email format must be correct."
      }

      return ""
    case "passwordBody":
    case "contraseña":
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/
      // if (!passwordRegex.test(value)) {
      //   return "El password debe tener 8 caracteres, simbolo y mayúscula"
      // }
      if (value.length < 6 || value.length > 10) {
        return "The password must be between 6 and 10 characters."
      }

      return ""
    default:
      console.log("whattttttttttt???")
  }
}
export const formatDate = (inputDate) => {
  // const inputDate = "2024-05-01T17:00:00.000Z";
  const dateObject = new Date(inputDate)

  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, "0")
  const day = String(dateObject.getDate()).padStart(2, "0")
  const hours = String(dateObject.getHours()).padStart(2, "0")
  const minutes = String(dateObject.getMinutes()).padStart(2, "0")

  const outputDate = `${year}-${month}-${day}T${hours}:${minutes}`
  return outputDate
}
