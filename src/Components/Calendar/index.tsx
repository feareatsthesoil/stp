import _ from "lodash";

export default function Calendar() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden ">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="hidden h-full w-full sm:block"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://calendar.google.com/calendar/embed?mode=AGENDA&src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="block h-full w-full sm:hidden"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}
