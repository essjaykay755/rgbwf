'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { debugAuthState } from '@/lib/debug'

export default function DebugPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [localStorageKeys, setLocalStorageKeys] = useState<string[]>([])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Debug auth state
        await debugAuthState()
        
        // Get session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error getting session:', sessionError)
          setError(`Session error: ${sessionError.message}`)
        } else {
          setSessionInfo(session)
        }
        
        // Get user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) {
          console.error('Error getting user:', userError)
          setError((prev) => `${prev ? prev + '; ' : ''}User error: ${userError.message}`)
        } else {
          setUserInfo(user)
        }
        
        // Get localStorage keys
        if (typeof window !== 'undefined') {
          const keys = Object.keys(localStorage)
            .filter(key => key.includes('supabase') || key.includes('auth'))
          setLocalStorageKeys(keys)
        }
      } catch (error: any) {
        console.error('Error in auth check:', error)
        setError(`Exception: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])
  
  const handleRefresh = () => {
    window.location.reload()
  }
  
  const handleClearStorage = () => {
    if (typeof window !== 'undefined') {
      localStorageKeys.forEach(key => {
        localStorage.removeItem(key)
      })
      window.location.reload()
    }
  }
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.reload()
    } catch (error: any) {
      console.error('Error signing out:', error)
      setError(`Sign out error: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
        <button 
          onClick={handleClearStorage}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Clear Auth Storage
        </button>
        <button 
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <p>Loading auth information...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Session Info</h2>
            {sessionInfo ? (
              <div>
                <p><strong>User Email:</strong> {sessionInfo.user?.email}</p>
                <p><strong>Expires At:</strong> {new Date(sessionInfo.expires_at * 1000).toLocaleString()}</p>
                <p><strong>Is Expired:</strong> {Date.now() > sessionInfo.expires_at * 1000 ? 'Yes' : 'No'}</p>
                <details>
                  <summary className="cursor-pointer text-blue-500">Raw Session Data</summary>
                  <pre className="bg-gray-100 p-2 mt-2 overflow-auto max-h-60 text-xs">
                    {JSON.stringify(sessionInfo, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p className="text-red-500">No session found</p>
            )}
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            {userInfo ? (
              <div>
                <p><strong>ID:</strong> {userInfo.id}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Created At:</strong> {new Date(userInfo.created_at).toLocaleString()}</p>
                <details>
                  <summary className="cursor-pointer text-blue-500">Raw User Data</summary>
                  <pre className="bg-gray-100 p-2 mt-2 overflow-auto max-h-60 text-xs">
                    {JSON.stringify(userInfo, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p className="text-red-500">No user found</p>
            )}
          </div>
          
          <div className="border p-4 rounded md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Local Storage Keys</h2>
            {localStorageKeys.length > 0 ? (
              <ul className="list-disc pl-5">
                {localStorageKeys.map(key => (
                  <li key={key}>
                    <strong>{key}</strong>
                    <details>
                      <summary className="cursor-pointer text-blue-500 ml-2">View Value</summary>
                      <pre className="bg-gray-100 p-2 mt-2 overflow-auto max-h-40 text-xs">
                        {typeof window !== 'undefined' ? localStorage.getItem(key) : ''}
                      </pre>
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500">No auth-related localStorage keys found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 