import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import Loader from "./Loader";
import SectionHeading from "../ui/SectionHeading";

function Events() {
  const { allEvents = [], isLoading = false } = useSelector(
    (state) => state.events,
  );

  if (isLoading) {
    return (
      <section className={`${styles.section} mb-16`}>
        <Loader label="Loading events" />
      </section>
    );
  }

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="Ends soon"
        title="Popular footwear events"
        subtitle="Limited-time footwear events from Jutly sellers."
        actionLabel="All events"
        actionTo="/events"
      />

      <div className="grid w-full gap-6">
        {allEvents.map((event, index) => (
          <EventCard
            data={event}
            key={event?._id || index}
            active
            isLoading={isLoading}
          />
        ))}

        {allEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
            <h3 className="font-display text-[19px] font-bold text-ink-900">
              No footwear events running
            </h3>
            <p className="mt-1.5 text-[14px] text-ink-500">
              Footwear events will appear here when sellers launch them.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
