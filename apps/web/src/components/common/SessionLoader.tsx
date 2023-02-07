// SessionLoader.tsx
import { useSession } from 'next-auth/react'
import { setToken } from '../../lib'

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()

  if (session.status === 'loading') {
    return <div className="loading" />
  }

  if (session.status === 'authenticated') {
    setToken(session?.data?.user?.accessToken as string)
  }

  return <>{children}</>
}

export default SessionLoader