import _ from "lodash";

export default function Calendar() {
  return (
    <div className="max-sm:pb-[95%] relative overflow-hidden">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="hidden h-[80vh] w-[90vw] border-0 sm:block"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://calendar.google.com/calendar/embed?mode=AGENDA&src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="absolute left-0 top-0 h-full w-full border-0 sm:hidden"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}
