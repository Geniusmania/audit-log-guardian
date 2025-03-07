
export type AuditLogAction = 
  | 'created'
  | 'updated'
  | 'assigned'
  | 'escalated'
  | 'commented'
  | 'resolved'
  | 'reopened'
  | 'closed';

export interface AuditLogEntry {
  id: string;
  ticketId: string;
  timestamp: string;
  action: AuditLogAction;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  details: {
    field?: string;
    oldValue?: string;
    newValue?: string;
    comment?: string;
    assignee?: {
      id: string;
      name: string;
    };
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

// Sample data
export const tickets: Ticket[] = [
  {
    id: 'TKT-1001',
    title: 'Cannot access customer dashboard',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2023-04-15T09:24:33Z',
    updatedAt: '2023-04-15T10:12:45Z'
  },
  {
    id: 'TKT-1002',
    title: 'Payment gateway integration error',
    status: 'open',
    priority: 'critical',
    createdAt: '2023-04-14T15:32:10Z',
    updatedAt: '2023-04-14T15:32:10Z'
  },
  {
    id: 'TKT-1003',
    title: 'New feature request: Export to CSV',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2023-04-10T11:05:22Z',
    updatedAt: '2023-04-13T14:45:00Z'
  },
  {
    id: 'TKT-1004',
    title: 'Mobile app crashing on startup',
    status: 'closed',
    priority: 'high',
    createdAt: '2023-04-08T08:15:40Z',
    updatedAt: '2023-04-12T16:30:12Z'
  },
  {
    id: 'TKT-1005',
    title: 'UI elements misaligned on profile page',
    status: 'in_progress',
    priority: 'low',
    createdAt: '2023-04-14T13:45:33Z',
    updatedAt: '2023-04-15T09:30:21Z'
  }
];

export const auditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    ticketId: 'TKT-1001',
    timestamp: '2023-04-15T09:24:33Z',
    action: 'created',
    user: {
      id: 'user-1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    details: {}
  },
  {
    id: 'log-2',
    ticketId: 'TKT-1001',
    timestamp: '2023-04-15T09:45:12Z',
    action: 'updated',
    user: {
      id: 'user-1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    details: {
      field: 'priority',
      oldValue: 'medium',
      newValue: 'high'
    }
  },
  {
    id: 'log-3',
    ticketId: 'TKT-1001',
    timestamp: '2023-04-15T10:12:45Z',
    action: 'assigned',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    details: {
      assignee: {
        id: 'user-3',
        name: 'Alex Rivera'
      }
    }
  },
  {
    id: 'log-4',
    ticketId: 'TKT-1001',
    timestamp: '2023-04-15T11:05:33Z',
    action: 'commented',
    user: {
      id: 'user-3',
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    details: {
      comment: 'Investigating the access issue. Will update with findings shortly.'
    }
  },
  {
    id: 'log-5',
    ticketId: 'TKT-1002',
    timestamp: '2023-04-14T15:32:10Z',
    action: 'created',
    user: {
      id: 'user-4',
      name: 'Emily Parker',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    details: {}
  },
  {
    id: 'log-6',
    ticketId: 'TKT-1002',
    timestamp: '2023-04-14T15:38:22Z',
    action: 'escalated',
    user: {
      id: 'user-4',
      name: 'Emily Parker',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    details: {
      priority: 'critical'
    }
  },
  {
    id: 'log-7',
    ticketId: 'TKT-1003',
    timestamp: '2023-04-10T11:05:22Z',
    action: 'created',
    user: {
      id: 'user-5',
      name: 'Jordan Smith',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    details: {}
  },
  {
    id: 'log-8',
    ticketId: 'TKT-1003',
    timestamp: '2023-04-12T09:30:45Z',
    action: 'assigned',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    details: {
      assignee: {
        id: 'user-2',
        name: 'Michael Chen'
      }
    }
  },
  {
    id: 'log-9',
    ticketId: 'TKT-1003',
    timestamp: '2023-04-13T14:45:00Z',
    action: 'resolved',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    details: {
      comment: 'Feature added to development roadmap for next sprint.'
    }
  },
  {
    id: 'log-10',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-08T08:15:40Z',
    action: 'created',
    user: {
      id: 'user-6',
      name: 'Taylor Washington',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    details: {}
  },
  {
    id: 'log-11',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-08T08:45:33Z',
    action: 'assigned',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    details: {
      assignee: {
        id: 'user-7',
        name: 'Sophie Martinez'
      }
    }
  },
  {
    id: 'log-12',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-10T13:22:18Z',
    action: 'updated',
    user: {
      id: 'user-7',
      name: 'Sophie Martinez',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    details: {
      field: 'status',
      oldValue: 'open',
      newValue: 'in_progress'
    }
  },
  {
    id: 'log-13',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-11T09:17:42Z',
    action: 'commented',
    user: {
      id: 'user-7',
      name: 'Sophie Martinez',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    details: {
      comment: 'Fixed memory leak causing the crash. Will deploy in next update.'
    }
  },
  {
    id: 'log-14',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-11T16:05:39Z',
    action: 'resolved',
    user: {
      id: 'user-7',
      name: 'Sophie Martinez',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    details: {}
  },
  {
    id: 'log-15',
    ticketId: 'TKT-1004',
    timestamp: '2023-04-12T16:30:12Z',
    action: 'closed',
    user: {
      id: 'user-6',
      name: 'Taylor Washington',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    details: {
      comment: 'Confirmed fix works. Issue resolved.'
    }
  },
  {
    id: 'log-16',
    ticketId: 'TKT-1005',
    timestamp: '2023-04-14T13:45:33Z',
    action: 'created',
    user: {
      id: 'user-8',
      name: 'Ryan Kim',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    details: {}
  },
  {
    id: 'log-17',
    ticketId: 'TKT-1005',
    timestamp: '2023-04-15T09:30:21Z',
    action: 'assigned',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    details: {
      assignee: {
        id: 'user-3',
        name: 'Alex Rivera'
      }
    }
  }
];

export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find(ticket => ticket.id === id);
};

export const getAuditLogsByTicketId = (ticketId: string): AuditLogEntry[] => {
  return auditLogs
    .filter(log => log.ticketId === ticketId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getAllAuditLogs = (): AuditLogEntry[] => {
  return [...auditLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const getActionColor = (action: AuditLogAction): string => {
  switch (action) {
    case 'created':
      return 'bg-[hsl(var(--status-created))]';
    case 'updated':
      return 'bg-[hsl(var(--status-updated))]';
    case 'assigned':
      return 'bg-[hsl(var(--status-assigned))]';
    case 'escalated':
      return 'bg-[hsl(var(--status-escalated))]';
    case 'resolved':
      return 'bg-[hsl(var(--status-resolved))]';
    case 'closed':
      return 'bg-[hsl(var(--status-closed))]';
    default:
      return 'bg-gray-400';
  }
};

export const getActionLabel = (action: AuditLogAction): string => {
  return action.charAt(0).toUpperCase() + action.slice(1);
};
