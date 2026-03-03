'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useReactMediaRecorder } from 'react-media-recorder'
import Image from 'next/image'

const CallPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const { startRecording, stopRecording } =
    useReactMediaRecorder({
      audio: true,
      onStop: async (blobUrl, blob) => {
        // Save to localStorage
        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64data = reader.result as string

          const newRecording = {
            id: Date.now(),
            title: `Call-${id}`,
            date: new Date().toISOString(),
            audioUrl: base64data,
          }

          const prev = JSON.parse(
            localStorage.getItem('recordings') || '[]'
          )
          localStorage.setItem(
            'recordings',
            JSON.stringify([...prev, newRecording])
          )

          // Upload to server
          if (blob) {
            const formData = new FormData()
            formData.append('file', blob)
            await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            })
          }
        }

        if (blob) reader.readAsDataURL(blob)
      },
    })

  useEffect(() => {
    // Start recording automatically when page loads
    startRecording()
    return () => stopRecording()
  }, [])

  const handleStop = () => {
    stopRecording()
    router.push('/') // 🔹 Stop button click -> redirect home
  }

  return (
    <div className="p-6 text-center bg-secondary container max-w-7xl mx-auto rounded-3xl h-[500px] flex flex-col justify-center items-center">
      <div className="mb-4">
        <Image src="/userprofile.png" alt="user" width={100} height={100} className="rounded-full" />
      </div>
      <h2 className="text-2xl mb-6">Calling User {id}</h2>

      <button
        onClick={handleStop}
        className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
      >
        Stop Call
      </button>
    </div>
  )
}

export default CallPage