import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface Props {
  region: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Region-aware error boundary that catches render errors in region routes
 * and shows a region-appropriate fallback UI.
 */
class RegionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[RegionErrorBoundary/${this.props.region}]`, error, info.componentStack);
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when region changes (user navigated)
    if (prevProps.region !== this.props.region && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { region } = this.props;
    const isUS = region === "us";

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {isUS
              ? "We're having trouble loading this page. This could be a temporary issue with our US data services."
              : "We're having trouble loading this page. This could be a temporary issue with our UK data services."}
          </p>

          {this.state.error && (
            <details className="mb-6 rounded-lg border border-border bg-muted/50 p-3 text-left">
              <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                Technical details
              </summary>
              <pre className="mt-2 overflow-auto text-xs text-muted-foreground">
                {this.state.error.message}
              </pre>
            </details>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <Link
              to={`/${region}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              {isUS ? "Back to Home" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RegionErrorBoundary;
