import type { CollectionEntry } from "astro:content";

const getSortedEvents = (events: CollectionEntry<"event">[]) => {
  return events.sort(
    (a, b) => +new Date(a.data.eventDatetime) - +new Date(b.data.eventDatetime)
  );
};

export default getSortedEvents;
