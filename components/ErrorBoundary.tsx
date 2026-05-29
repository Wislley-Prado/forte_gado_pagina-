"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-600 bg-red-50 min-h-screen font-mono">
          <h1 className="text-xl font-bold">Erro de Renderização (ErrorBoundary):</h1>
          <p className="mt-2 text-sm">{this.state.error?.message || String(this.state.error)}</p>
          <pre className="mt-4 p-4 bg-white border border-red-200 rounded text-xs overflow-auto max-w-full text-left">
            {this.state.error?.stack || "Sem stack trace disponível."}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
