'use client'

import React, { useState } from 'react'
import { Play, Pause, Download, Trash2 } from 'lucide-react'

type Recording = {
  id: number
  title: string
  date: string
  audioUrl: string
}

const initialRecordings: Recording[] = [
  { id: 1, title: 'Meeting with Alice', date: '2024-06-10', audioUrl: '/recordings/meeting-alice.mp3' },
  { id: 2, title: 'Support Call', date: '2024-06-12', audioUrl: '/recordings/support-call.mp3' },
  { id: 3, title: 'Sales Pitch', date: '2024-06-13', audioUrl: '/recordings/sales-pitch.mp3' },
]

const Recordings: React.FC = () => {
  const [recordings, setRecordings] = useState(initialRecordings)
  const [playingId, setPlayingId] = useState<number | null>(null)

  const handlePlayPause = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  const handleDelete = (id: number) => {
    setRecordings((prev) => prev.filter((rec) => rec.id !== id))
  }

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Your Recordings</h2>

      <ul className="space-y-3">
        {recordings.map((rec) => (
          <li
            key={rec.id}
            className="flex justify-between items-center p-4 bg-card border border-border rounded-lg shadow-md"
          >
            <div>
              <p className="font-semibold text-foreground">{rec.title}</p>
              <p className="text-sm text-foreground/70">{rec.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <audio
                id={`audio-${rec.id}`}
                src={rec.audioUrl}
                onPlay={() => setPlayingId(rec.id)}
                onPause={() => setPlayingId(null)}
              />

              <button
                onClick={() => {
                  const audio = document.getElementById(`audio-${rec.id}`) as HTMLAudioElement
                  if (audio) {
                    if (playingId === rec.id) {
                      audio.pause()
                    } else {
                      audio.play()
                    }
                  }
                  handlePlayPause(rec.id)
                }}
                className="p-2 text-primary hover:text-primary/80 transition"
              >
                {playingId === rec.id ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <a
                href={rec.audioUrl}
                download
                className="p-2 text-foreground/80 hover:text-primary transition"
              >
                <Download size={20} />
              </a>

              <button
                onClick={() => handleDelete(rec.id)}
                className="p-2 text-destructive/80 hover:text-destructive transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {recordings.length === 0 && (
        <p className="mt-4 text-foreground/80 text-center">No recordings found</p>
      )}
    </div>
  )
}

export default Recordings