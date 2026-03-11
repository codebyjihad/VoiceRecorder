'use client'

import React, { useEffect, useState } from 'react'
import { Play, Pause, Download, Trash2 } from 'lucide-react'

type Recording = {
  _id: string
  recordingUrl: string
}

const Recordings = () => {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [recordings, setRecordings] = useState<Recording[]>([])

  useEffect(() => {
    const fetchRecordings = async () => {
      const userId = localStorage.getItem('userId')

      const res = await fetch(
        `http://localhost:8080/api/call/history/${userId}`
      )

      const data = await res.json()

      setRecordings(data)
    }

    fetchRecordings()
  }, [])

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Your Recordings
      </h2>

      <ul className="space-y-3">
        {recordings.map((rec) => (
          <li
            key={rec._id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <audio
              id={`audio-${rec._id}`}
              src={rec.recordingUrl}
              onPlay={() => setPlayingId(rec._id)}
              onPause={() => setPlayingId(null)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const audio = document.getElementById(
                    `audio-${rec._id}`
                  ) as HTMLAudioElement

                  if (playingId === rec._id) {
                    audio.pause()
                  } else {
                    audio.play()
                  }
                }}
              >
                {playingId === rec._id ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>

              <a href={rec.recordingUrl} download>
                <Download size={20} />
              </a>

              <button>
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recordings