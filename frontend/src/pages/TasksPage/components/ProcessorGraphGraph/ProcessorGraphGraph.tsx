import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import '../ProcessorGraphGraph/ProcessorGraphGraph.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend)

export type CpuLoadPoint = {
  ts: number
  value: number
}

export type ProcessorGraphGraphProps = {
  points: readonly CpuLoadPoint[]
}

const ProcessorGraphGraph = ({ points }: ProcessorGraphGraphProps) => {
  const labels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    return points.map((p) => formatter.format(new Date(p.ts)))
  }, [points])

  const data = useMemo<ChartData<'line'>>(() => {
    return {
      labels,
      datasets: [
        {
          data: points.map((p) => p.value),
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.35,
          borderColor: '#000',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      ],
    }
  }, [labels, points])

  const options = useMemo<ChartOptions<'line'>>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
        },
        y: {
          min: 0,
          max: 100,
          beginAtZero: true,
          ticks: { stepSize: 20 },
        },
      },
    }
  }, [])

  return (
    <div className="processorGraphGraph">
      <Line data={data} options={options} />
    </div>
  )
}

export default ProcessorGraphGraph
