'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import userImage from '@/public/userprofile.png'

// User type with optional fields + correct image typing
type User = {
  id: number
  name?: string
  number?: string
  email?: string
  image?: string | StaticImageData
}

// Sample data
const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    number: '+8801734567890',
    image: userImage, // local image import works now
  },
  {
    id: 2,
    name:'Jshon , deo',
    email: 'someone@example.com',
    image: userImage,
  },
  {
    id: 3,
    name: 'Nadia Rahman',
    email: 'nadia@example.com',
    image: userImage,
  },
  {
    id: 4,
    name:'Jhon doe',
    number: '+8801711112222',
    image: userImage,
  },
]

const page: React.FC = () => {
  const router = useRouter()

  const handleCall = (id: number) => {
    router.push(`/call/${id}`)
  }

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Available for Call</h2>

      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 bg-card border-border rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <Image
                src={user.image || userImage}
                alt={user.name || user.email || 'User profile'}
                width={48}
                height={48}
                className="rounded-full border border-border object-cover"
              />

              <div>
                {user.name && (
                  <p className="font-semibold text-foreground">{user.name}</p>
                )}
                {user.number && (
                  <p className="text-sm text-foreground/80">{user.number}</p>
                )}
                {user.email && (
                  <p className="text-sm text-foreground/80">{user.email}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleCall(user.id)}
              className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
            >
              Call
            </button>
          </li>
        ))}
      </ul>

      {users.length === 0 && (
        <p className="mt-4 text-foreground text-center">No users available</p>
      )}
    </div>
  )
}

export default page