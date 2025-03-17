'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProfilesButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to create profiles')
      }
      
      const data = await response.json()
      console.log('Created profiles:', data)
      
      // Refresh the page to show new profiles
      router.refresh()
    } catch (error) {
      console.error('Error creating profiles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Creating...' : 'Create 2 Profiles (Transaction)'}
    </button>
  )
} 