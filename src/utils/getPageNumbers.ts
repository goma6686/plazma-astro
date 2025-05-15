import { SITE } from "@config";

const getPageNumbers = (
  numberOfItems: number,
  itemType: "post" | "event" = "post"
) => {
  // Use the correct per-page value based on item type
  const itemsPerPage =
    itemType === "post" ? SITE.postPerPage : SITE.eventPerPage;

  const numberOfPages = numberOfItems / Number(itemsPerPage);
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
