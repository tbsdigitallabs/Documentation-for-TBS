"use client";

interface DataGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle';
}

export default function DataGrid({ children, className = '', variant = 'default' }: DataGridProps) {
  const gridClass = variant === 'subtle' ? 'bg-tech-grid-subtle' : 'bg-tech-grid';
  
  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
}
