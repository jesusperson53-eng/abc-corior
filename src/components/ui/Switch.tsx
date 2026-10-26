import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, checked, disabled, className, id, onChange, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id || generatedId;

    return (
      <div className="flex items-center justify-between gap-3">
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={switchId}
                className={cn('text-sm font-medium text-ink-900 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
              >
                {label}
              </label>
            )}
            {description && <p className="text-xs text-ink-600">{description}</p>}
          </div>
        )}
        <label htmlFor={switchId} className="relative inline-flex items-center cursor-pointer select-none">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-9 h-5 bg-ink-300 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          />
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
