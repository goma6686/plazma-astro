import type { CollectionEntry } from "astro:content";

const getSortedEvents = (events: CollectionEntry<"event">[]) => {
  return events.sort(
    (a, b) => +new Date(b.data.eventDatetime) - +new Date(a.data.eventDatetime)
  );
};

export default getSortedEvents;
