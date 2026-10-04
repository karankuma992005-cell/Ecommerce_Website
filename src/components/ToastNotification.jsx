import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ToastNotification() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] ?? Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>
            <Icon size={18} aria-hidden="true" />
            <span className="toast__message">{toast.message}</span>
            <button type="button" className="toast__close" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
