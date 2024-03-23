export const loginMe = async (credenciales) => {
  // console.log(import.meta.env.VITE_API_URL)
  //    http://localhost:4500/api

  // `${import.meta.env.VITE_API_URL}users/profile`,

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      options
    )
    //   `http://localhost:4500/api/auth/login`,
    //   options
    // )

    const data = await response.json()
    console.log("DATA FROM LOGIN", data)

    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}

export const registerMe = async (credenciales) => {
  console.log(credenciales)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  }

  try {
    const response = await fetch(
      //   `http://localhost:4500/api/auth/register`,
      //   options
      // )
      `${import.meta.env.VITE_API_URL}/auth/register`,
      options
    )

    const data = await response.json()
    console.log(data)
    if (!data.success) {
      console.log(data.message)
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}
export const fetchMyProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      //   "http://localhost:4500/api/users/profile",
      //   options
      // )
      `${import.meta.env.VITE_API_URL}/users/profile`,
      options
    )
    // `${import.meta.env.VITE_API_URL}users/profile`,

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}
