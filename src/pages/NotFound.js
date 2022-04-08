import React from 'react'
import Button from '../components/Button'
import { useDocumentTitle } from '../lib/customHooks'

export default function NotFound() {
  useDocumentTitle('Not Found - Spotipy')
  return (
    <main className="center">
      No Content Here...
      <Button href="/create-playlist">Go To Content</Button>
    </main>
  )
}