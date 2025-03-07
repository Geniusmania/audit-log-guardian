
import React from 'react';
import { Activity } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { AuditLogEntry, getActionColor } from '@/utils/auditLogData';

interface AuditLogTimelineProps {
  logs: AuditLogEntry[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({ 
  logs, 
  onDateSelect,
  selectedDate 
}) => {
  // Group logs by date
  const groupedLogs: Record<string, AuditLogEntry[]> = {};
  
  logs.forEach(log => {
    const date = new Date(log.timestamp).toISOString().split('T')[0];
    if (!groupedLogs[date]) {
      groupedLogs[date] = [];
    }
    groupedLogs[date].push(log);
  });

  // Convert to array for rendering
  const datesWithLogs = Object.keys(groupedLogs).sort().reverse();

  return (
    <div className="mb-8 pb-2 overflow-x-auto">
      <div className="flex items-center mb-3 space-x-2">
        <Activity size={16} className="text-primary" />
        <h3 className="text-sm font-medium">Activity Timeline</h3>
      </div>
      <div className="flex space-x-2">
        {datesWithLogs.map(date => (
          <button
            key={date}
            onClick={() => onDateSelect(date === selectedDate ? '' : date)}
            className={`flex flex-col items-center p-2 min-w-[70px] rounded-md transition-all
                      ${date === selectedDate 
                        ? 'bg-primary text-white shadow-md transform scale-105' 
                        : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
          >
            <span className={`text-xs font-medium ${date === selectedDate ? 'text-white/80' : 'text-gray-500'}`}>
              {formatDate(date).split(' ')[0]} {/* Just the month */}
            </span>
            <span className="text-xl font-semibold mt-0.5">
              {new Date(date).getDate()}
            </span>
            <div className="flex space-x-1 mt-1">
              {Object.entries(
                groupedLogs[date].reduce((acc: Record<string, number>, log) => {
                  acc[log.action] = (acc[log.action] || 0) + 1;
                  return acc;
                }, {})
              ).slice(0, 3).map(([action, count]) => (
                <span 
                  key={action}
                  className={`w-2 h-2 rounded-full ${getActionColor(action as any)}`}
                  title={`${count} ${action} ${count === 1 ? 'action' : 'actions'}`}
                ></span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuditLogTimeline;
