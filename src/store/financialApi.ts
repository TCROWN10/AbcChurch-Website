import { baseApi } from './baseApi';
import type {
  FinancialSummaryParams,
  FinancialSummary,
  ExportExcelRequest,
  ExportPDFRequest,
  ApiResponse,
} from '@/types/api';

export const financialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get financial summary with totals and breakdowns (Super Admin only)
     * GET /api/financial/summary
     * Query params: type, startDate, endDate, today, status
     */
    getFinancialSummary: builder.query<FinancialSummary, FinancialSummaryParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.startDate) searchParams.append('startDate', params.startDate);
          if (params.endDate) searchParams.append('endDate', params.endDate);
          if (params.today !== undefined) {
            searchParams.append('today', String(params.today));
          }
          if (params.status) searchParams.append('status', params.status);
        }
        const queryString = searchParams.toString();
        return `/api/financial/summary${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): FinancialSummary => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'total' in response && 'count' in response) {
          return response as FinancialSummary;
        }
        const wrapped = response as ApiResponse<FinancialSummary>;
        return (wrapped?.data || {
          total: 0,
          count: 0,
          byType: {} as Record<string, number>,
          byStatus: {} as Record<string, number>,
          byDate: [],
        }) as FinancialSummary;
      },
      providesTags: ['Financial'],
    }),

    /**
     * Download donation records as Excel file (Super Admin only)
     * GET /api/financial/export/excel
     * Query params: type, startDate, endDate, today, status
     */
    exportExcel: builder.query<Blob, FinancialSummaryParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.startDate) searchParams.append('startDate', params.startDate);
          if (params.endDate) searchParams.append('endDate', params.endDate);
          if (params.today !== undefined) {
            searchParams.append('today', String(params.today));
          }
          if (params.status) searchParams.append('status', params.status);
        }
        const queryString = searchParams.toString();
        return {
          url: `/api/financial/export/excel${queryString ? `?${queryString}` : ''}`,
          responseHandler: async (response) => {
            if (!response.ok) {
              throw new Error(`Failed to export Excel: ${response.statusText}`);
            }
            return await response.blob();
          },
        };
      },
    }),

    /**
     * Generate Excel report and send via email asynchronously (Super Admin only)
     * POST /api/financial/export/excel/email
     */
    exportExcelToEmail: builder.mutation<ApiResponse, ExportExcelRequest>({
      query: (body) => ({
        url: '/api/financial/export/excel/email',
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown): ApiResponse => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'success' in response) {
          return response as ApiResponse;
        }
        return { success: true, data: response, message: 'Export request accepted, will be sent via email' };
      },
    }),

    /**
     * Download donation records as PDF file (Super Admin only)
     * GET /api/financial/export/pdf
     * Query params: type, startDate, endDate, today, status
     */
    exportPDF: builder.query<Blob, FinancialSummaryParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.startDate) searchParams.append('startDate', params.startDate);
          if (params.endDate) searchParams.append('endDate', params.endDate);
          if (params.today !== undefined) {
            searchParams.append('today', String(params.today));
          }
          if (params.status) searchParams.append('status', params.status);
        }
        const queryString = searchParams.toString();
        return {
          url: `/api/financial/export/pdf${queryString ? `?${queryString}` : ''}`,
          responseHandler: async (response) => {
            if (!response.ok) {
              throw new Error(`Failed to export PDF: ${response.statusText}`);
            }
            return await response.blob();
          },
        };
      },
    }),

    /**
     * Generate PDF report and send via email asynchronously (Super Admin only)
     * POST /api/financial/export/pdf/email
     */
    exportPDFToEmail: builder.mutation<ApiResponse, ExportPDFRequest>({
      query: (body) => ({
        url: '/api/financial/export/pdf/email',
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown): ApiResponse => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'success' in response) {
          return response as ApiResponse;
        }
        return { success: true, data: response, message: 'Export request accepted, will be sent via email' };
      },
    }),
  }),
});

export const {
  useGetFinancialSummaryQuery,
  useLazyExportExcelQuery,
  useExportExcelToEmailMutation,
  useLazyExportPDFQuery,
  useExportPDFToEmailMutation,
} = financialApi;

