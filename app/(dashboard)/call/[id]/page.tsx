'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useReactMediaRecorder } from 'react-media-recorder'
import Image from 'next/image'
import userImage from '@/public/userprofile.png'

export default function CallPage() {
  const params = useParams()
  const router = useRouter()

  const [callStarted, setCallStarted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { startRecording, stopRecording } =
    useReactMediaRecorder({
      audio: true,
      onStop: (blobUrl) => {
        const prev =
          JSON.parse(localStorage.getItem('recordings') || '[]')

        const newRecording = {
          id: Date.now(),
          title: `Call with User ${params.id}`,
          date: new Date().toLocaleString(),
          audioUrl: blobUrl,
        }

        localStorage.setItem(
          'recordings',
          JSON.stringify([...prev, newRecording])
        )

        router.push('/recordings')
      },
    })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (callStarted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [callStarted])

  const formatTime = () => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleStart = () => {
    setCallStarted(true)
    startRecording()
  }

  const handleStop = () => {
    setCallStarted(false)
    stopRecording()
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <Image
        src={userImage}
        alt="user"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />

      <h2 className="text-xl font-semibold">
        User {params.id}
      </h2>

      {callStarted && (
        <p className="text-green-400 text-lg mt-2">
          {formatTime()}
        </p>
      )}

      {!callStarted ? (
        <button
          onClick={handleStart}
          className="mt-6 bg-green-600 w-20 h-20 rounded-full"
        >
          Call
        </button>
      ) : (
        <>
          <div className="mt-6">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) =>
                handleVolumeChange(Number(e.target.value))
              }
            />
          </div>

          <button
            onClick={handleStop}
            className="mt-6 bg-red-600 w-20 h-20 rounded-full"
          >
            Stop
          </button>
        </>
      )}

      <audio ref={audioRef} />
    </div>
  )
}