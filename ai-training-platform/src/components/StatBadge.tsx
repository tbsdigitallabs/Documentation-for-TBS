"use client";

interface StatBadgeProps {
  value: string | number;
  label: string;
  className?: string;
  variant?: 'default' | 'large' | 'compact';
}

export default function StatBadge({ 
  value, 
  label, 
  className = '', 
  variant = 'default' 
}: StatBadgeProps) {
  const sizeClasses = {
    default: 'px-4 py-2',
    large: 'px-6 py-3',
    compact: 'px-3 py-1'
  };

  const textClasses = {
    default: 'text-sm',
    large: 'text-base',
    compact: 'text-xs'
  };

  return (
    <div className={`stat-badge rounded-lg ${sizeClasses[variant]} ${className}`}>
      <div className={`font-bold text-content-primary ${variant === 'large' ? 'text-2xl' : 'text-lg'}`}>
        {value}
      </div>
      <div className={`text-content-secondary ${textClasses[variant]}`}>
        {label}
      </div>
    </div>
  );
}
