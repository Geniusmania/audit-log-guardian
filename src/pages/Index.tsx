
import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Layout/Header';
import AuditLogList from '@/components/AuditLog/AuditLogList';
import AuditLogFilter from '@/components/AuditLog/AuditLogFilter';
import AuditLogTimeline from '@/components/AuditLog/AuditLogTimeline';
import SearchBar from '@/components/Common/SearchBar';
import { 
  AuditLogAction, 
  AuditLogEntry, 
  getAllAuditLogs, 
  getTicketById 
} from '@/utils/auditLogData';

const Index = () => {
  const allLogs = useMemo(() => getAllAuditLogs(), []);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>(allLogs);
  const [filter, setFilter] = useState<AuditLogAction | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    let result = allLogs;

    // Apply action filter
    if (filter !== 'all') {
      result = result.filter(log => log.action === filter);
    }

    // Apply date filter
    if (selectedDate) {
      result = result.filter(log => {
        const logDate = new Date(log.timestamp).toISOString().split('T')[0];
        return logDate === selectedDate;
      });
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => {
        const ticket = getTicketById(log.ticketId);
        return (
          log.ticketId.toLowerCase().includes(query) || 
          log.user.name.toLowerCase().includes(query) ||
          (ticket?.title.toLowerCase().includes(query)) ||
          (log.details.comment?.toLowerCase().includes(query))
        );
      });
    }

    setFilteredLogs(result);
  }, [allLogs, filter, searchQuery, selectedDate]);

  const handleFilterChange = (newFilter: AuditLogAction | 'all') => {
    setFilter(newFilter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date || null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:px-6 lg:px-8">
      <Header 
        title="Audit Log" 
        subtitle="Activity Tracker" 
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-3 md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <AuditLogFilter
              selectedFilter={filter}
              onFilterChange={handleFilterChange}
            />
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search tickets, users..."
              className="sm:w-64"
            />
          </div>
          
          <AuditLogList logs={filteredLogs} />
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <AuditLogTimeline 
              logs={allLogs}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="text-sm font-medium mb-2">Audit Log Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Activities</span>
                  <span className="font-medium">{allLogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Tickets</span>
                  <span className="font-medium">
                    {new Set(allLogs.map(log => log.ticketId)).size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-medium">
                    {new Set(allLogs.map(log => log.user.id)).size}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
