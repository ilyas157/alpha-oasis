import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export const Button = React.forwardRef(
  ({ className = '', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 
          ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
