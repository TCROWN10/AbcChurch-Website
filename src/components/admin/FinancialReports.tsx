"use client";
import { useState } from 'react';
import {
  useGetFinancialSummaryQuery,
  useLazyExportExcelQuery,
  useLazyExportPDFQuery,
  useExportExcelToEmailMutation,
  useExportPDFToEmailMutation,
} from '@/store';
import type { DonationType, FinancialSummaryParams } from '@/types/api';

export default function FinancialReports() {
  const [params, setParams] = useState<FinancialSummaryParams>({});
  const [email, setEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [exportType, setExportType] = useState<'excel' | 'pdf' | null>(null);

  const { data: summary, isLoading } = useGetFinancialSummaryQuery(params);
  const [exportExcel] = useLazyExportExcelQuery();
  const [exportPDF] = useLazyExportPDFQuery();
  const [exportExcelToEmail] = useExportExcelToEmailMutation();
  const [exportPDFToEmail] = useExportPDFToEmailMutation();

  const handleExport = async (type: 'excel' | 'pdf') => {
    try {
      if (type === 'excel') {
        const blob = await exportExcel(params).unwrap();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `financial-report-${new Date().toISOString()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const blob = await exportPDF(params).unwrap();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `financial-report-${new Date().toISOString()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  const handleEmailExport = async () => {
    if (!email || !exportType) return;
    try {
      if (exportType === 'excel') {
        await exportExcelToEmail({ ...params, recipientEmail: email }).unwrap();
      } else {
        await exportPDFToEmail({ ...params, recipientEmail: email }).unwrap();
      }
      setShowEmailModal(false);
      setEmail('');
      setExportType(null);
      alert('Report sent to email successfully!');
    } catch (error) {
      console.error('Failed to email export:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={params.type || ''}
              onChange={(e) => setParams({ ...params, type: e.target.value as DonationType || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All Types</option>
              <option value="TITHE">Tithe</option>
              <option value="OFFERING">Offering</option>
              <option value="DONATION">Donation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={params.startDate || ''}
              onChange={(e) => setParams({ ...params, startDate: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={params.endDate || ''}
              onChange={(e) => setParams({ ...params, endDate: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={params.today || false}
                onChange={(e) => setParams({ ...params, today: e.target.checked || undefined })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Today Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Summary */}
      {isLoading ? (
        <div className="text-center py-8">Loading financial summary...</div>
      ) : summary ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">${summary.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Count</p>
              <p className="text-3xl font-bold text-gray-900">{summary.count}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">By Type</h4>
              <div className="space-y-2">
                {Object.entries(summary.byType).map(([type, amount]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-sm text-gray-600">{type}</span>
                    <span className="text-sm font-medium text-gray-900">${Number(amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">By Status</h4>
              <div className="space-y-2">
                {Object.entries(summary.byStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between">
                    <span className="text-sm text-gray-600">{status}</span>
                    <span className="text-sm font-medium text-gray-900">{Number(count)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {summary.byDate && summary.byDate.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">By Date</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summary.byDate.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.date}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">${item.total.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleExport('excel')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Export PDF
          </button>
          <button
            onClick={() => {
              setExportType('excel');
              setShowEmailModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Email Excel
          </button>
          <button
            onClick={() => {
              setExportType('pdf');
              setShowEmailModal(true);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Email PDF
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email {exportType?.toUpperCase()} Report</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E] mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setEmail('');
                  setExportType(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailExport}
                className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

