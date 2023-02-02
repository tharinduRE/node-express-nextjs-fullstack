import { Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <span className="text-sm">
        Signed in as <b>{session?.user?.email}</b>
        <Button onClick={() => signOut({callbackUrl:'/'})}>Sign out</Button>
      </span>
    )
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}