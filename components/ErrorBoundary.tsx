import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error at route:", window.location.pathname, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-bg text-text-on-light-primary p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-accent-primary mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-text-on-light-muted mb-8">
              We've encountered an unexpected issue. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-dark-primary text-text-on-dark font-semibold px-8 py-3 rounded-full hover:bg-dark-secondary transition-colors duration-300 shadow-md transform hover:scale-105 active:scale-100"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;