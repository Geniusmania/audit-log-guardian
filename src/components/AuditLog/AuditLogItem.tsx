
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MessageSquare, User, FileText } from 'lucide-react';
import { AuditLogEntry, getActionColor, getTicketById } from '@/utils/auditLogData';
import { formatDateTime, timeAgo } from '@/utils/formatters';
import Badge from '@/components/Common/Badge';

interface AuditLogItemProps {
  log: AuditLogEntry;
}

const AuditLogItem: React.FC<AuditLogItemProps> = ({ log }) => {
  const [expanded, setExpanded] = useState(false);
  const ticket = getTicketById(log.ticketId);
  
  const renderActionIcon = () => {
    switch (log.action) {
      case 'commented':
        return <MessageSquare size={14} className="mr-1" />;
      case 'assigned':
        return <User size={14} className="mr-1" />;
      default:
        return <FileText size={14} className="mr-1" />;
    }
  };

  const renderActionDetails = () => {
    switch (log.action) {
      case 'created':
        return <span>created ticket <strong>{log.ticketId}</strong></span>;
      case 'updated':
        return (
          <span>
            updated <strong>{log.details.field}</strong> from{' '}
            <span className="text-gray-600">{log.details.oldValue}</span> to{' '}
            <span className="font-medium">{log.details.newValue}</span>
          </span>
        );
      case 'assigned':
        return (
          <span>
            assigned ticket to <strong>{log.details.assignee?.name}</strong>
          </span>
        );
      case 'escalated':
        return (
          <span>
            escalated ticket to <strong>{log.details.priority}</strong> priority
          </span>
        );
      case 'commented':
        return <span>added a comment</span>;
      case 'resolved':
        return <span>marked ticket as resolved</span>;
      case 'reopened':
        return <span>reopened ticket</span>;
      case 'closed':
        return <span>closed ticket</span>;
      default:
        return <span>{log.action}</span>;
    }
  };

  return (
    <div 
      className={`audit-log-item ${getActionColor(log.action).replace('bg-', 'before:bg-')} animate-fade-in-up`}
      style={{ animationDelay: '100ms' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <img 
              src={log.user.avatar || 'https://ui-avatars.com/api/?name=' + log.user.name} 
              alt={log.user.name}
              className="w-8 h-8 rounded-full border border-gray-200"
            />
          </div>
          <div>
            <div className="flex items-center text-sm">
              <span className="font-medium">{log.user.name}</span>
              <span className="mx-1.5 text-gray-500">·</span>
              <span className="text-gray-600">{renderActionDetails()}</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span title={formatDateTime(log.timestamp)}>{timeAgo(log.timestamp)}</span>
              <span className="mx-1.5">·</span>
              <Badge 
                variant="outline" 
                className="bg-white"
              >
                {renderActionIcon()} {log.ticketId}
              </Badge>
            </div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pl-11 animate-fade-in">
          {log.details.comment && (
            <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700">
              {log.details.comment}
            </div>
          )}
          <div className="mt-2 flex items-center text-xs">
            <div className="flex items-center text-gray-500">
              <FileText size={12} className="mr-1" />
              <span>Ticket: {ticket?.title}</span>
            </div>
            <span className="mx-1.5 text-gray-400">•</span>
            <Badge 
              className={
                ticket?.status === 'open' ? 'bg-blue-500' :
                ticket?.status === 'in_progress' ? 'bg-amber-500' :
                ticket?.status === 'resolved' ? 'bg-green-600' :
                'bg-gray-600'
              }
            >
              {ticket?.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogItem;
