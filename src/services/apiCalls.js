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
      `${import.meta.env.VITE_API_URL}/auth/register`,
      options
    )

    const data = await response.json()
    console.log(data)
    if (!data.success) {
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
      `${import.meta.env.VITE_API_URL}/users/profile`,
      options
    )
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    return error
  }
}

export const updateProfile = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/profile`,
      options
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}

export const getServices = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/services`,
      options
    )

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    return error
  }
}

export const getMyAppointments = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointments`,
      options
    )

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    return error
  }
}

export const createAppointment = async (data, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointments`,
      options
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}

export const deleteAppointment = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointments/${id}`,
      options
    )

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}

export const updateMyAppointment = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointments`,
      options
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    return error
  }
}

export const fetchAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users`,
      options
    )
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    return error
  }
}

export const deleteMoreThanOneUsers = async (array, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(array),
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users`,
      options
    )

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    return error
  }
}
