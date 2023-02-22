import { Request, Response, NextFunction } from "express";

type SortOrder = -1 | 1 | "asc" | "ascending" | "desc" | "descending";
const DEFAULT_PAGESIZE = 10;

/**
 *  Parse Pagination Query and add to request object
 */
export const paginatedRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { order, orderBy } = req.query;
  const sortOrder: SortOrder = order == "asc" ? 1 : -1;
  let page = Number(req.query.page || 0);
  let pageSize = Number(req.query.pageSize || DEFAULT_PAGESIZE) || 0;
  let filterQuery = null;

  req._pagination = {
    page,
    pageSize,
    sortBy: orderBy ? String(orderBy) : 'createdAt',
    sortOrder: sortOrder,
  };

  if (req.query.filters) {
    filterQuery = JSON.parse(req.query.filters as string);
  }

  req._filterQuery = filterQuery;

  next();
};
