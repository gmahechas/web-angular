export interface SearchContext {
  context?: {
    context_id?: string;
    context_description?: string;
  };
  limit?: number;
  page?: number;
}
