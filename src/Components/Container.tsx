import clsx from "clsx";

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between [&_div]:mb-2 [&_div]:tracking-[.02rem] [&_h1]:mb-8 [&_h1]:text-2xl [&_p]:mb-8 [&_p]:text-base/8",
        className
      )}
      {...props}
    />
  );
}
