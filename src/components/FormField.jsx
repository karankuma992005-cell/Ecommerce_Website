export default function FormField({ id, label, error, hint, as = 'input', children, className = '', ...rest }) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  const common = { id, name: id, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy, ...rest };
  let control;
  if (as === 'select') control = <select {...common}>{children}</select>;
  else if (as === 'textarea') control = <textarea {...common} />;
  else control = <input {...common} />;
  return (
    <div className={`field${error ? ' field--error' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      {control}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
