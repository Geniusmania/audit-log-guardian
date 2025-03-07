
import React from 'react';
import { AuditLogAction, getActionColor, getActionLabel } from '@/utils/auditLogData';

interface AuditLogFilterProps {
  selectedFilter: AuditLogAction | 'all';
  onFilterChange: (filter: AuditLogAction | 'all') => void;
}

const AuditLogFilter: React.FC<AuditLogFilterProps> = ({ 
  selectedFilter, 
  onFilterChange 
}) => {
  const actions: (AuditLogAction | 'all')[] = [
    'all', 
    'created', 
    'updated', 
    'assigned', 
    'escalated', 
    'commented', 
    'resolved', 
    'closed'
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
      {actions.map(action => (
        <button
          key={action}
          onClick={() => onFilterChange(action)}
          className={`filter-chip ${
            selectedFilter === action 
              ? 'bg-gray-800 text-white' 
              : action === 'all' 
                ? 'bg-gray-100 text-gray-800' 
                : `${getActionColor(action as AuditLogAction)} text-white opacity-80`
          }`}
        >
          {action === 'all' ? 'All Activities' : getActionLabel(action as AuditLogAction)}
        </button>
      ))}
    </div>
  );
};

export default AuditLogFilter;
