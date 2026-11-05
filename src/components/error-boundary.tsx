import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            {this.state.error?.message}
          </p>
          <button type="button" onClick={() => window.location.reload()} style={{ border: "1px solid #eee5dc", padding: "12px 18px", color: "#eee5dc", background: "transparent", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
