import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export type FetchError = {
  message: string
  code: number
  info?: unknown
}

export type Coordinates = {
  lat: number
  lng: number
}

export type Cabin = {
  _id: string
  name: string
  address: string
  country: string
  description: string
  price: number
  coordinates: Coordinates
  id: string
  occupancy: string[]
}

export async function fetchCabins({ signal }: { signal?: AbortSignal }) {
  const url = "http://localhost:4000/api/v1/cabins/"

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while fetching the cabins.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const { cabins }: { cabins: Cabin[] } = await response.json()

  return cabins
}

export async function fetchCabin({
  signal,
  cabinId,
}: {
  signal?: AbortSignal
  cabinId: string | undefined
}) {
  if (!cabinId) {
    throw new Error("Cabin ID is required.")
  }

  const url = `http://localhost:4000/api/v1/cabins/${cabinId}`

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while fetching the cabin data.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const { cabin }: { cabin: Cabin } = await response.json()

  return cabin
}

export type SignUpUser = {
  email: string
  password: string
  passwordConfirmation: string
}

export async function loginUser(userData: LoginUser) {
  const response = await fetch(`http://localhost:4000/api/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while creating user login.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }
  const responseData = await response.json()
  return responseData
}

export async function createNewUser(userData: SignUpUser) {
  const response = await fetch(`http://localhost:4000/api/v1/users/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while creating a new account.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const responseData = await response.json()

  return responseData
}

export type LoginUser = {
  email: string
  password: string
}
