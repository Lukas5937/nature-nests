import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { LoginContext } from "../../../context/LoginContext"
import { signUpUser } from "../../../util/http"

import { type SignUpUser, type FetchError } from "../../../util/http"
import { type LoginResponse } from "../../../context/LoginContext"

export default function useSignUpUser() {
  const loginContext = useContext(LoginContext)

  if (!loginContext) {
    throw new Error("LoginContext is not available.")
  }
  const { login, changeServerError } = loginContext

  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    FetchError,
    SignUpUser
  >({
    mutationFn: signUpUser,
    onSuccess: (userData) => {
      login(userData)
      navigate("/")
    },
    onError: (error: FetchError) => {
      changeServerError(error.message)
      console.error(error.message)
    },
  })

  return { mutate, isPending, isError, error }
}
