'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import userImage from '@/public/userprofile.png'

type User = {
  id: number
  name: string
  number: string
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', number: '+8801734567890' },
  { id: 2, name: 'John Doe', number: '+8801712345678' },
]

export default function UsersPage() {
  const router = useRouter()

  return (
    <div className="container max-w-7xl mx-auto md:p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between p-4 items-center mp-4 border rounded-lg mb-3"
        >
          <div className="flex items-center gap-3">
            <Image
              src={userImage}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.number}</p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/call/${user.id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Call
          </button>
        </div>
      ))}
    </div>
  )
}