import React from 'react';
import { useToast } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();
  
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <div key={id} className="group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-border p-5 pr-8 shadow-lg bg-panel text-foreground" {...props}>
            <div className="grid gap-1">
              {title && <div className="text-sm font-semibold text-amber">{title}</div>}
              {description && (
                <div className="text-sm text-muted">{description}</div>
              )}
            </div>
            {action}
          </div>
        )
      })}
    </div>
  )
}
