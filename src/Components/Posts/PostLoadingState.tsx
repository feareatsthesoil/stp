import DefaultLayout from "../Layouts/DefaultLayout";

interface LoadingStateProps {}

const buttonWidths = ["30%", "50%", "40%"];

export const LoadingState: React.FC<LoadingStateProps> = ({}) => {
  return (
    <>
      <div className="overflow-hidden">
        <DefaultLayout>
          <div
            className="ml-8 mt-3 flex h-max w-screen flex-col items-start catCol2:items-center"
            style={{ maxWidth: "1000px" }}
          >
            <button className="my-1 h-6 w-[50%] animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs" />
            <button className="my-1 h-6 w-[20%] animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs" />
            <button className="my-1 h-6 w-[30%] animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs" />
            <div className="relative w-[50%]">
              <button
                className="my-1 w-[100%] animate-pulse cursor-default rounded-md bg-[#fff] px-2 pt-[100%] font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs"
                style={{ maxWidth: "500px", maxHeight: "500px" }}
              />
            </div>
            <ul
              role="list"
              className="mb-8 mt-2 w-fit space-y-2"
              style={{ width: "calc(100vw - 2rem)", maxWidth: "500px" }}
            >
              {Array.from({ length: 30 }, (_, index) => {
                const buttonWidth = buttonWidths[index % 3];
                return (
                  <li className="relative flex gap-x-4" key={index}>
                    <div
                      className={`absolute left-0 top-0 flex w-6 animate-pulse justify-center ${
                        index === -1 ? "h-2" : "-bottom-2"
                      }`}
                    >
                      <div className="w-px animate-pulse bg-gray-200" />
                    </div>
                    <div className="relative mt-1 h-6 w-6 flex-none animate-pulse rounded-full bg-gray-50" />
                    <button
                      className="my-1 h-6 animate-pulse cursor-default rounded-md bg-[#fff] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:text-xs"
                      style={{ width: buttonWidth }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </DefaultLayout>
      </div>
    </>
  );
};
