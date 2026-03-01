'use client'
import React, { useState } from 'react'

// Define type for a Call
type Call = {
  id: number
  user: string
  time: string
  duration: string
}

// Sample call data
const initialCalls: Call[] = [
  { id: 1, user: 'John Doe', time: '10:30 AM', duration: '5 min ago' },
  { id: 2, user: 'Jane Smith', time: '11:15 AM', duration: '8 min ago' },
  { id: 3, user: 'Alex Brown', time: '1:45 PM', duration: '3 min ago' },
]

const CallStory: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>(initialCalls)

  const handleDelete = (id: number) => {
    const filtered = calls.filter((call) => call.id !== id)
    setCalls(filtered)
  }

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">User Call Stories</h2>
      <ul className="space-y-3">
        {calls.map((call) => (
          <li
            key={call.id}
            className="flex justify-between items-center p-4 bg-card border-border border-1 rounded-lg shadow-md"
          >
            <div>
              <p className="font-semibold text-foreground">{call.user}</p>
              <p className="text-foreground text-sm">{call.time}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-foreground/80 text-sm">{call.duration}  </p>
              <button
                onClick={() => handleDelete(call.id)}
                className="text-destructive/80 hover:text-foreground font-bold"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {calls.length === 0 && (
        <p className="mt-4 text-foreground text-center">No calls available</p>
      )}
    </div>
  )
}

export default CallStory