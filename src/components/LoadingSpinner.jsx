export default function LoadingSpinner({ label = 'Loading', fullPage = false, small = false }) {
  return (
    <div className={`spinner-wrap${fullPage ? ' spinner-wrap--page' : ''}`} role="status" aria-live="polite">
      <span className={`spinner${small ? ' spinner--small' : ''}`} aria-hidden="true" />
      {!small && <span className="spinner__label">{label}...</span>}
      {small && <span className="sr-only">{label}</span>}
    </div>
  );
}
