import { useEffect, useRef, useState } from 'react'
import '../ViewCounterCounter/ViewCounterCounter.scss'

type VisitsResponse = { visits: number }

const ViewCounterCounter = () => {
  const [visits, setVisits] = useState<number | null>(null)
  const didRequest = useRef(false)

  useEffect(() => {
    if (didRequest.current) return
    didRequest.current = true

    fetch('/api/visits/', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<VisitsResponse>
      })
      .then((data) => setVisits(data.visits))
      .catch((err) => {
        console.error('Visits API error:', err)
        setVisits(0)
      })
  }, [])

  return (
    <div className='viewCounterCounter'>
      <p>Количество посещений сайта: </p>
      <h3>{visits ?? '...'}</h3>
    </div>
  )
}

export default ViewCounterCounter
