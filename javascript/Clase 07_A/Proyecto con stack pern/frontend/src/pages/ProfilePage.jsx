import { useAuth } from '../context/AuthContext'

function ProfilePage() {
  const { user } = useAuth()

  return <pre className="whitespace-pre-wrap break-all">{JSON.stringify(user, null, 2)}</pre>
}

export default ProfilePage
