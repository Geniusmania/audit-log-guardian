
import React from 'react';
import AuditLogItem from './AuditLogItem';
import { AuditLogEntry } from '@/utils/auditLogData';

interface AuditLogListProps {
  logs: AuditLogEntry[];
}

const AuditLogList: React.FC<AuditLogListProps> = ({ logs }) => {
  if (!logs.length) {
    return (
      <div className="py-8 text-center text-gray-500 animate-fade-in">
        No audit logs found matching your criteria.
      </div>
    );
  }

  return (
    <div className="audit-log-card overflow-hidden animate-fade-in">
      {logs.map((log, index) => (
        <AuditLogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

export default AuditLogList;
