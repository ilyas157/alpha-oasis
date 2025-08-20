import React from "react";

const badgeVariants = {
  default:
    "inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-600 text-white hover:bg-green-700",
  secondary:
    "inline-flex items-center rounded-full text-gray-800 border px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-400  hover:bg-yellow-500",
  destructive:
    "inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-600 text-gray-100 hover:bg-amber-700",
  outline:
    "inline-flex items-center rounded-full border border-amber-600 px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-amber-600 bg-transparent hover:bg-amber-50",
};

function Badge({ className = "", variant = "default", ...props }) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  const combinedClassName = `${variantClass} ${className}`.trim();

  return <div className={combinedClassName} {...props} />;
}

export { Badge };
