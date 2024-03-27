import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";

interface GetPaginationProps<T> {
  items: T;
  page: string | number;
  isIndex?: boolean;
  collection?: string;
}

const getPagination = <T>({
  items,
  page,
  isIndex = false,
  collection,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(items.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;
  const ItemPerPage =
    collection === "events" ? SITE.eventPerPage : SITE.postPerPage;
  const lastItem = isIndex ? ItemPerPage : currentPage * ItemPerPage;
  const startItem = isIndex ? 0 : lastItem - ItemPerPage;
  const paginatedItems = items.slice(startItem, lastItem);

  return {
    totalPages,
    currentPage,
    paginatedItems,
  };
};

export default getPagination;
