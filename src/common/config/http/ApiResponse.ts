import { Pagination } from "../util/pagination";

export class ApiResponse {
  public data: any;
  public error: string;
  public date: Date = new Date();
  public pagination: Pagination['simplify'];
  constructor(
    data: any,
    pagination: Pagination,
    error: string,
  ) {
    this.data = data || null;
    this.error = error || null;
    this.pagination = pagination.simplify;
  }
}