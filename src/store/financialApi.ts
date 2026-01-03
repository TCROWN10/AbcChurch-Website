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
    // Get financial summary (Super Admin only)
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
      providesTags: ['Financial'],
    }),

    // Export donations to Excel (Super Admin only)
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
            return await response.blob();
          },
        };
      },
    }),

    // Export and email Excel report (Super Admin only)
    exportExcelToEmail: builder.mutation<ApiResponse, ExportExcelRequest>({
      query: (body) => ({
        url: '/api/financial/export/excel/email',
        method: 'POST',
        body,
      }),
    }),

    // Export donations to PDF (Super Admin only)
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
            return await response.blob();
          },
        };
      },
    }),

    // Export and email PDF report (Super Admin only)
    exportPDFToEmail: builder.mutation<ApiResponse, ExportPDFRequest>({
      query: (body) => ({
        url: '/api/financial/export/pdf/email',
        method: 'POST',
        body,
      }),
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

