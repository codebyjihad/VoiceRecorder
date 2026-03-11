'use client'
import React, { useEffect, useState } from 'react'

type Call = {
  _id: string
  callerId: {
    name: string
  }
  receiverId: {
    name: string
  }
  startTime: string
  duration: number
}

const CallStory: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([])

  useEffect(() => {
    const fetchCalls = async () => {
      const userId = localStorage.getItem('userId')

      if (!userId) return

      const res = await fetch(
        `http://localhost:5000/api/call/history/${userId}`
      )

      const data = await res.json()

      setCalls(data)
    }

    fetchCalls()
  }, [])

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        User Call Stories
      </h2>

      <ul className="space-y-3">
        {calls.map((call) => (
          <li
            key={call._id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p className="font-semibold">
                {call.receiverId?.name}
              </p>
              <p className="text-sm">
                {new Date(call.startTime).toLocaleString()}
              </p>
            </div>

            <p className="text-sm">{call.duration}s</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CallStory