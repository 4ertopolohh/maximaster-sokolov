import '../Loader/Loader.scss'

const Loader = () => {
  return (
    <div className="loaderOverlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="loaderRing" />
    </div>
  )
}

export default Loader
