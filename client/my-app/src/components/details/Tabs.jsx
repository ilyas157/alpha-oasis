import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// Tabs Root
const Tabs = TabsPrimitive.Root;

// TabsList
const TabsList = React.forwardRef(({ style, ...props }, ref) => {
  const defaultStyle = {
    display: 'inline-flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#e0e0e0', // Muted gray background
    padding: 4,
    color: '#555555', // Muted foreground
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

// TabsTrigger
const TabsTrigger = React.forwardRef(({ style, disabled, ...props }, ref) => {
  const triggerRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);

  // Base styles for all tabs
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    padding: '6px 12px',
    fontSize: 14,
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    userSelect: 'none',
    backgroundColor: '#e0e0e0', // Default background
    color: '#333333', // Default text color
    boxShadow: 'none',
    border: 'none',
    outline: 'none',
  };

  // Active styles for selected tab
  const activeStyle = {
    backgroundColor: 'white', // Blue for active tab
    color: 'black', // White text for active tab
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow
  };

  // Detect data-state changes
  React.useEffect(() => {
    const checkActive = () => {
      if (triggerRef.current) {
        const state = triggerRef.current.getAttribute('data-state');
        setIsActive(state === 'active');
      }
    };
    checkActive();

    const observer = new MutationObserver(checkActive);
    if (triggerRef.current) {
      observer.observe(triggerRef.current, { attributes: true, attributeFilter: ['data-state'] });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={(node) => {
        triggerRef.current = node;
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
      }}
      disabled={disabled}
      style={{ ...baseStyle, ...(isActive ? activeStyle : {}), ...style }}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// TabsContent
const TabsContent = React.forwardRef(({ style, ...props }, ref) => {
  const contentStyle = {
    marginTop: 8,
    outline: 'none',
    padding: 10,
    borderRadius: 6,
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  return (
    <TabsPrimitive.Content
      ref={ref}
      style={{ ...contentStyle, ...style }}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };