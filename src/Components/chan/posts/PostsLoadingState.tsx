interface LoadingStateProps {
  isCatalogView: boolean;
  showComponents: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isCatalogView,
  showComponents,
}) => {
  if (!showComponents) return null;
  const buttonWidths = [
    "calc(30vw - 2rem)",
    "calc(50vw - 2rem)",
    "calc(40vw - 2rem)",
  ];
  return (
    <>
      {Array.from({ length: 15 }).map((_, index) => {
        const buttonWidth = buttonWidths[index % 3];
        return (
          <div
            key={index}
            className={`${
              isCatalogView
                ? "border-x border-y border-solid border-slate-300"
                : `pb-auto ${
                    index !== 0
                      ? "border-t border-solid border-slate-300"
                      : "mt-2 "
                  }`
            }flex w-full flex-col border-slate-300 pt-1 md:flex-row`}
          >
            <div className="flex-col">
              <div className="flex w-full flex-col">
                <div className="scrollbar-hide flex w-full flex-row overflow-x-auto py-0.5 text-xs leading-5 text-gray-500 ">
                  <div
                    className={`${
                      isCatalogView && "ml-2"
                    } relative mr-2 h-6 w-6 flex-none animate-pulse rounded-full bg-white`}
                  ></div>
                  <button className="my-1 h-4 w-[8rem] animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs"></button>
                </div>
                <div className={`items-left flex flex-col`}>
                  <button
                    style={{ width: buttonWidth }}
                    className="mb-2 mt-1 h-7 animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:h-5 sm:text-xs"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
