import clsx from "clsx";
import ReactPaginate from "react-paginate";

import { memo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const itemContainerClassName = clsx(
  "mx-1 flex h-9 w-9 items-center justify-center",
  "rounded border border-border bg-bg text-text",
  "hover:bg-gray-300"
);

const itemClassName = clsx(
  "w-full text-center flex items-center justify-center"
);

interface Props {
  onPageChange: (page: number) => void;
  pageCount: number;
  initialPage?: number;
  className?: string;
}

const Pagination: React.FC<Props> = memo(
  ({ onPageChange, pageCount, initialPage = 0 }) => {
    const { t, i18n } = useTranslation();
    return (
      <ReactPaginate
        initialPage={initialPage ? initialPage - 1 : 0}
        nextLabel={
          <div className="flex flex-row items-center justify-center gap-1">
            <p>{t("Next")}</p>
            {i18n?.language == "ar" ? <ArrowLeft /> : <ArrowRight />}
          </div>
        }
        previousLabel={
          <div className="flex flex-row items-center justify-center gap-1">
            {i18n?.language == "ar" ? <ArrowRight /> : <ArrowLeft />}
            <p>{t("Prevs")}</p>
          </div>
        }
        onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex flex-row items-center justify-center text-red-600"
        breakClassName="mb-2 text-pastel2 mx-1"
        pageClassName={clsx(
          itemContainerClassName,
          "border-[#DCDFE4] hover:bg-gray-300 hover:bg-opacity-30"
        )}
        pageLinkClassName={itemClassName}
        nextClassName={clsx(
          itemContainerClassName,
          "bg-[#F4F6F9] w-[80px] h-[30px] border-0 "
        )}
        nextLinkClassName={clsx(itemClassName, "text-red-600")}
        previousClassName={clsx(
          itemContainerClassName,
          "bg-[#F4F6F9] w-[80px] h-[30px] border-0 "
        )}
        previousLinkClassName={clsx(itemClassName, "text-red-600")}
        activeClassName="bg-red-one t  border-0"
        activeLinkClassName="!text-red-600"
        disabledLinkClassName={"cursor-not-allowed"}
        disabledClassName="opacity-30 "
      />
    );
  }
);
Pagination.displayName = "Pagination";
export default Pagination;
