import { useAuth } from '../context/AuthContext'

function ProfilePage() {
  const { user } = useAuth()

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default ProfilePage
