import { SITE } from "@config";

const getPageNumbers = (numberOfEvents: number) => {
  const numberOfPages = numberOfEvents / Number(SITE.eventPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
