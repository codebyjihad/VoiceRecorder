'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
  _id: string
  name: string
  email: string
}

export default function UsersPage() {
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'http://localhost:5000/api/users'
      )

      const data = await res.json()

      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <div className="container max-w-7xl mx-auto md:p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between p-4 items-center border rounded-lg mb-3"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/userprofile.png"
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />

            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/call/${user._id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Call
          </button>
        </div>
      ))}
    </div>
  )
}