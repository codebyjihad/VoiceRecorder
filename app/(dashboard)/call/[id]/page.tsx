'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useReactMediaRecorder } from 'react-media-recorder'
import Image from 'next/image'
import userImage from '@/public/userprofile.png'

export default function CallPage() {
  const params = useParams()
  const router = useRouter()

  const [incoming, setIncoming] = useState(false) // user B dekhe incoming call
  const [callStarted, setCallStarted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [volume, setVolume] = useState(1)
  const [recorder, setRecorder] = useState<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const channelRef = useRef<BroadcastChannel | null>(null)

  // 🔔 BroadcastChannel init for sender/receiver simulation
  useEffect(() => {
    const channel = new BroadcastChannel('call_channel')
    channelRef.current = channel

    channel.onmessage = (event) => {
      const { type, callerId } = event.data
      if (type === 'incoming-call' && callerId == params.id) setIncoming(true)
      if (type === 'call-accepted') setCallStarted(true)
      if (type === 'call-ended') {
        setCallStarted(false)
        setIncoming(false)
        alert('Call ended')
        router.push('/users')
      }
    }

    return () => channel.close()
  }, [params.id, router])

  // Timer for active call
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (callStarted) timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [callStarted])

  const formatTime = () => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Accept call → start recording
  const acceptCall = () => {
    setIncoming(false)
    const newRecorder = useReactMediaRecorder({
      audio: true,
      onStop: (blobUrl) => {
        const prev = JSON.parse(localStorage.getItem('recordings') || '[]')
        const newRecording = {
          id: Date.now(),
          title: `Call with User ${params.id}`,
          date: new Date().toLocaleString(),
          audioUrl: blobUrl,
        }
        localStorage.setItem('recordings', JSON.stringify([...prev, newRecording]))
        router.push('/recordings')
      },
    })
    setRecorder(newRecorder)
    newRecorder.startRecording()
    setCallStarted(true)

    // Notify caller
    channelRef.current?.postMessage({ type: 'call-accepted', callerId: params.id })
  }

  // Reject incoming call
  const rejectCall = () => {
    setIncoming(false)
    channelRef.current?.postMessage({ type: 'call-ended', callerId: params.id })
    router.push('/users')
  }

  // Stop active call
  const handleStop = () => {
    setCallStarted(false)
    if (recorder) recorder.stopRecording()
    channelRef.current?.postMessage({ type: 'call-ended', callerId: params.id })
  }

  // Volume control
  const handleVolumeChange = (value: number) => {
    setVolume(value)
    if (audioRef.current) audioRef.current.volume = value
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <Image src={userImage} alt="user" width={100} height={100} className="rounded-full mb-4" />
      <h2 className="text-xl font-semibold">User {params.id}</h2>

      {/* Waiting for call */}
      {!callStarted && !incoming && <p className="text-gray-400 mt-4">Calling...</p>}

      {/* Incoming Call */}
      {incoming && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-green-400 text-lg">Incoming Call...</p>
          <div className="flex gap-4">
            <button onClick={acceptCall} className="bg-green-600 px-4 py-2 rounded">Accept</button>
            <button onClick={rejectCall} className="bg-red-600 px-4 py-2 rounded">Reject</button>
          </div>
        </div>
      )}

      {/* Active Call */}
      {callStarted && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-green-400 text-lg">{formatTime()}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
          />
          <button onClick={handleStop} className="bg-red-600 w-20 h-20 rounded-full mt-4">Stop</button>
        </div>
      )}

   
      {(incoming || callStarted) && (
        <button
          onClick={() => {
            setIncoming(false)
            setCallStarted(false)
            if (recorder) recorder.stopRecording()
            channelRef.current?.postMessage({ type: 'call-ended', callerId: params.id })
            router.push('/users')
          }}
          className="bg-yellow-600 px-4 py-2 rounded mt-4"
        >
          Force Stop Call
        </button>
      )}

      <audio ref={audioRef} />
    </div>
  )
}