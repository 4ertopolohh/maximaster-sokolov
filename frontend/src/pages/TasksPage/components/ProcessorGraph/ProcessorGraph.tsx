import { useEffect, useMemo, useRef, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../ProcessorGraph/ProcessorGraph.scss'
import ProcessorGraphGraph, { type CpuLoadPoint } from '../ProcessorGraphGraph/ProcessorGraphGraph'
import ProcessorGraphInfoBlock from '../ProcessorGraphInfoBlock/ProcessorGraphInfoBlock'
import cpuLoadMockData from '../../../../shared/cpuLoadMockData'

const MAX_POINTS = 24
const UPDATE_INTERVAL_MS = 5000

type Sample = {
  value: number
  isError: boolean
}

const ProcessorGraph = () => {
  const [points, setPoints] = useState<CpuLoadPoint[]>([])
  const [totalRequests, setTotalRequests] = useState<number>(0)
  const [errorRequests, setErrorRequests] = useState<number>(0)

  const dataIndexRef = useRef<number>(0)
  const lastOkValueRef = useRef<number | null>(null)

  const getNextMockSample = (): Sample => {
    const idx = dataIndexRef.current
    const rawValue = cpuLoadMockData[idx] ?? 0
    dataIndexRef.current = (idx + 1) % cpuLoadMockData.length
    return { value: rawValue, isError: rawValue === 0 }
  }

  /*
  const CPU_SERVICE_URL = 'https://exercise.develop.maximaster.ru/service/cpu/'

  const fetchCpuLoadFromService = async (signal: AbortSignal): Promise<Sample> => {
    const res = await fetch(CPU_SERVICE_URL, { method: 'GET', signal })
    const text = await res.text()
    const num = Number(text.trim())
    if (!Number.isFinite(num)) {
      return { value: 0, isError: true }
    }
    const normalized = Math.max(0, Math.min(100, Math.round(num)))
    return { value: normalized, isError: normalized === 0 }
  }
  */

  const pushPoint = (sample: Sample) => {
    const nextValue = sample.isError
      ? lastOkValueRef.current ?? 0
      : Math.max(0, Math.min(100, Math.round(sample.value)))

    if (!sample.isError) {
      lastOkValueRef.current = nextValue
    }

    const nextPoint: CpuLoadPoint = { ts: Date.now(), value: nextValue }

    setPoints((prev) => {
      const updated = [...prev, nextPoint]
      if (updated.length <= MAX_POINTS) return updated
      return updated.slice(updated.length - MAX_POINTS)
    })

    setTotalRequests((prev) => prev + 1)
    if (sample.isError) {
      setErrorRequests((prev) => prev + 1)
    }
  }

  useEffect(() => {
    pushPoint(getNextMockSample())

    const id = window.setInterval(() => {
      pushPoint(getNextMockSample())
    }, UPDATE_INTERVAL_MS)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  const errorPercentText = useMemo(() => {
    if (totalRequests === 0) return '0%'
    const percent = (errorRequests / totalRequests) * 100
    return `${percent.toFixed(1)}%`
  }, [errorRequests, totalRequests])

  return (
    <section className="processorGraph">
      <div className="container">
        <SectionTitle title="График загруженности процессора" />
        <div className="taskWrapper">
          <ProcessorGraphGraph points={points} />
          <div className="processorGraphInfo">
            <ProcessorGraphInfoBlock title="Запросов:" value={String(totalRequests)} />
            <ProcessorGraphInfoBlock title="Ошибок:" value={errorPercentText} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessorGraph
