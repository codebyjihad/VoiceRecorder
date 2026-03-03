'use client'

import React, { useEffect, useState } from 'react'
import { Play, Pause, Download, Trash2 } from 'lucide-react'

type Recording = {
  id: number
  title: string
  date: string
  audioUrl: string
}

const Recordings = () => {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [recordings, setRecordings] = useState<Recording[]>([])

  useEffect(() => {
    const data = localStorage.getItem('recordings')
    if (data) {
      setRecordings(JSON.parse(data))
    }
  }, [])

  const handleDelete = (id: number) => {
    const filtered = recordings.filter((rec) => rec.id !== id)
    setRecordings(filtered)
    localStorage.setItem('recordings', JSON.stringify(filtered))
  }

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Recordings</h2>

      <ul className="space-y-3">
        {recordings.map((rec) => (
          <li
            key={rec.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p>{rec.title}</p>
              <p className="text-sm">{rec.date}</p>
            </div>

            <div className="flex gap-3 items-center">
              <audio
                id={`audio-${rec.id}`}
                src={rec.audioUrl}
                onPlay={() => setPlayingId(rec.id)}
                onPause={() => setPlayingId(null)}
              />

              <button
                onClick={() => {
                  const audio = document.getElementById(
                    `audio-${rec.id}`
                  ) as HTMLAudioElement
                  if (!audio) return
                  playingId === rec.id
                    ? audio.pause()
                    : audio.play()
                }}
              >
                {playingId === rec.id ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>

              <a href={rec.audioUrl} download>
                <Download size={20} />
              </a>

              <button onClick={() => handleDelete(rec.id)}>
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