'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Trash2, 
  Inbox, 
  Check 
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/lib/types';

interface EnquiriesViewProps {
  enquiries: Enquiry[];
  onSelectEnquiry: (enquiry: Enquiry) => void;
  onOpenNewEnquiry: () => void;
  onUpdateStatus: (enquiry: Enquiry, newStatus: EnquiryStatus) => void;
  onDeleteEnquiry: (enquiry: Enquiry) => void;
}

export const EnquiriesView: React.FC<EnquiriesViewProps> = ({
  enquiries,
  onSelectEnquiry,
  onOpenNewEnquiry,
  onUpdateStatus,
  onDeleteEnquiry
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses: string[] = [
    'All',
    'New',
    'In Progress',
    'Contacted',
    'Proposal Sent',
    'Converted',
    'Archived'
  ];

  const filtered = enquiries.filter((e) => {
    const matchesSearch = 
      e.clientName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.service.toLowerCase().includes(search) ||
      e.message.toLowerCase().includes(search);

    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const newCount = enquiries.filter(e => e.status === 'New').length;
  const inProgressCount = enquiries.filter(e => e.status === 'In Progress').length;
  const convertedCount = enquiries.filter(e => e.status === 'Converted').length;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Client Enquiries & Pipeline
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Prospective interior design commissions, project scopes, and client communications.
          </p>
        </div>

        <button
          onClick={onOpenNewEnquiry}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Lead</span>
        </button>
      </div>

      {/* Restrained Metric Summary Row */}
      <div className="grid grid-cols-3 bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md divide-x divide-[#DDD5C9] dark:divide-[#3E3C33] p-4 text-center">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1]">Total Inquiries</span>
          <p className="font-serif text-xl text-[#302A25] dark:text-[#F4EFE5] mt-0.5">{enquiries.length}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#777963] dark:text-[#8E9177] font-medium">Awaiting Review</span>
          <p className="font-serif text-xl text-[#777963] dark:text-[#8E9177] mt-0.5">{newCount}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1]">Signed Commissions</span>
          <p className="font-serif text-xl text-[#302A25] dark:text-[#F4EFE5] mt-0.5">{convertedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777067] dark:text-[#B6AEA1]" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                selectedStatus === status
                  ? 'bg-[#EBE5DA] dark:bg-[#38362F] text-[#302A25] dark:text-[#F4EFE5] font-medium border border-[#DDD5C9] dark:border-[#3E3C33]'
                  : 'text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Enquiries Table */}
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F1E9] dark:bg-[#24241F] border-b border-[#DDD5C9] dark:border-[#3E3C33] text-[#777067] dark:text-[#B6AEA1]">
              <tr>
                <th className="py-2.5 px-4 font-normal">Client Name</th>
                <th className="py-2.5 px-4 font-normal">Contact</th>
                <th className="py-2.5 px-4 font-normal">Service</th>
                <th className="py-2.5 px-4 font-normal">Budget</th>
                <th className="py-2.5 px-4 font-normal">Status</th>
                <th className="py-2.5 px-4 font-normal">Date</th>
                <th className="py-2.5 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD5C9]/60 dark:divide-[#3E3C33]/60">
              {filtered.map((enq) => (
                <tr
                  key={enq.id}
                  onClick={() => onSelectEnquiry(enq)}
                  className="hover:bg-[#EBE5DA]/30 dark:hover:bg-[#38362F]/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-[#302A25] dark:text-[#F4EFE5] block">
                      {enq.clientName}
                    </span>
                    <span className="text-[10px] text-[#777067] dark:text-[#B6AEA1]">
                      Lead: {enq.assignedTo || 'Clara Delacroix'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#302A25] dark:text-[#F4EFE5]">
                        <Mail className="w-3 h-3 text-[#777963]" />
                        <span>{enq.email}</span>
                      </div>
                      {enq.phone && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Phone className="w-2.5 h-2.5 text-[#777067]" />
                          <span>{enq.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-[#302A25] dark:text-[#F4EFE5]">
                    {enq.service}
                  </td>

                  <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                    {enq.budget}
                  </td>

                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={enq.status}
                      onChange={(e) => onUpdateStatus(enq, e.target.value as EnquiryStatus)}
                      className="text-[11px] px-2 py-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FCFAF6] dark:bg-[#2E2D27] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>

                  <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                    {new Date(enq.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>

                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectEnquiry(enq)}
                        className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onDeleteEnquiry(enq)}
                        className="p-1 text-[#777067] dark:text-[#B6AEA1] hover:text-red-600 rounded transition-colors"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md">
          <Inbox className="w-8 h-8 text-[#777067] dark:text-[#B6AEA1] mx-auto mb-2 opacity-50" />
          <h3 className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">No inquiries found</h3>
          <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Try adjusting your search query or selected status filter.
          </p>
        </div>
      )}
    </div>
  );
};
