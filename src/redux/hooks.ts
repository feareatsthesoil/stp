import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eventsByIdSelector,
  eventsSelector,
  loadEvents,
} from "./slices/calendar";
import { AppDispatch } from "./store";

export const useEvents = (refresh = true) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let interval: any;
    dispatch(loadEvents());
    if (refresh) interval = setInterval(() => dispatch(loadEvents()), 3000);
    return () => {
      if (refresh) clearInterval(interval);
    };
  }, []);
  return useSelector(eventsSelector);
};

export const useEvent = (id: string) => {
  const dispatch: AppDispatch = useDispatch();

  const event = useSelector(eventsByIdSelector(id));
  useEffect(() => {
    if (!event) dispatch(loadEvents());
  }, []);
  return event;
};
