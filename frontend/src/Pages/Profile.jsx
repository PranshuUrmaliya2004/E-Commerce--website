import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { ShopContext } from "../Context/ShopContext"

const Profile = () => {
  const { backendUrl, navigate, token } = useContext(ShopContext)
  const [profile, setProfile] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true })
      return
    }

    let active = true
    const loadProfile = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/profile`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (response.data.success && active) setProfile(response.data.user)
        else if (active) toast.error(response.data.message || "Could not load profile")
      } catch (error) {
        if (active) toast.error(error.response?.data?.message || "Could not load profile")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProfile()
    return () => { active = false }
  }, [backendUrl, navigate, token])

  const saveProfile = async (event) => {
    event.preventDefault()
    const name = profile.name.trim()
    if (!name) {
      toast.error("Name is required")
      return
    }

    setSaving(true)
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/profile`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        setProfile(response.data.user)
        toast.success("Profile updated")
      } else {
        toast.error(response.data.message || "Could not update profile")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-[55vh] border-t pt-10 sm:pt-16">
      <div className="mx-auto w-full max-w-xl">
        <p className="prata-regular text-2xl">My profile</p>
        <p className="mt-2 text-sm text-gray-500">Manage your account details.</p>
        {loading ? (
          <p className="mt-8 text-sm text-gray-500" role="status">Loading profile...</p>
        ) : (
          <form onSubmit={saveProfile} className="mt-8 space-y-5">
            <label className="block text-sm text-gray-700">
              Name
              <input autoComplete="name" required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="mt-2 w-full border border-gray-300 px-3 py-3 text-base text-gray-900 outline-none focus:border-black" />
            </label>
            <label className="block text-sm text-gray-700">
              Email
              <input readOnly value={profile.email} className="mt-2 w-full border border-gray-200 bg-gray-50 px-3 py-3 text-base text-gray-500" />
            </label>
            <button type="submit" disabled={saving} className="w-full bg-black px-6 py-3 text-sm text-white disabled:cursor-wait disabled:opacity-60 sm:w-auto">
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default Profile
