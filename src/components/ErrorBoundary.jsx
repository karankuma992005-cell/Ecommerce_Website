import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('ElectroMart error boundary caught:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="container error-state">
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred. Reload the page or head back to the home page.</p>
        <div className="error-state__actions">
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>Reload page</button>
          <a href="/" className="btn btn--outline">Go Home</a>
        </div>
      </main>
    );
  }
}
