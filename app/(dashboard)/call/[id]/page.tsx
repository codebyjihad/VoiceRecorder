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
        if (!blob) return

        const formData = new FormData()
        formData.append('file', blob)

        await fetch(
          'http://localhost:8080/api/recording/upload',
          {
            method: 'POST',
            body: formData,
          }
        )
      },
    })

  useEffect(() => {
    const startCall = async () => {
      const callerId = localStorage.getItem('userId')

      const res = await fetch(
        'http://localhost:8080/api/call/start',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            callerId,
            receiverId: id,
          }),
        }
      )

      const data = await res.json()

      localStorage.setItem('callId', data._id)
    }

    startCall()
    startRecording()

    return () => stopRecording()
  }, [])

  const handleStop = async () => {
    stopRecording()

    const callId = localStorage.getItem('callId')

    await fetch('http://localhost:8080/api/call/end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callId,
      }),
    })

    router.push('/')
  }

  return (
    <div className="p-6 text-center container max-w-7xl mx-auto h-[500px] flex flex-col justify-center items-center">
      <Image
        src="/userprofile.png"
        alt="user"
        width={100}
        height={100}
        className="rounded-full"
      />

      <h2 className="text-2xl mb-6">
        Calling User {id}
      </h2>

      <button
        onClick={handleStop}
        className="bg-red-500 text-white px-6 py-3 rounded-full"
      >
        Stop Call
      </button>
    </div>
  )
}

export default CallPage