"use client";
"use no memo";

import { Component, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ViewportErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0c2315] text-[#f4efe4] p-6 text-center border border-[#dfb248]/25 rounded-xl">
          <p className="font-serif text-lg text-[#e5b84b]">{this.props.title}</p>
          <p className="text-sm text-[#c6d4cb] mt-2 max-w-sm">
            WebGL rendering was interrupted. Reload or reset the viewport to restore the 3D view.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#e5b84b] text-[#0c2315] hover:bg-[#f0c65c] transition-colors cursor-pointer"
          >
            Restore Viewport
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
