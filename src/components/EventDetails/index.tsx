import Image from "next/image";
import eventPhoto from "../../../public/event.jpg";

type EventInformationItemProps = {
  name: string;
  children: JSX.Element | string;
  action?: {
    label: string;
    href: string;
    className?: string;
  };
};
function EventInformationItem({
  name,
  children,
  action,
}: EventInformationItemProps): JSX.Element {
  return (
    <div className="space-y-2">
      <dt className="font-condensed text-base uppercase tracking-widest">
        {name}
      </dt>
      <dd className="max-w-[32rem] font-serif text-4xl lg:space-x-2">
        <span>{children}</span>
        {action && (
          <>
            {" "}
            <a
              className={`nowrap relative top-[-2px] mt-2 block w-fit select-none whitespace-nowrap rounded-full border border-joanGreen-600 py-[0.25rem] px-[0.75rem] align-middle font-sans text-sm hover:bg-joanGreen-600 hover:text-white lg:mt-0 lg:inline ${action.className}`}
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              {action.label}
            </a>
          </>
        )}
      </dd>
    </div>
  );
}

function EventDetails(): JSX.Element {
  return (
    <div className="flex flex-col selection:bg-joanGreen-600 selection:text-white lg:flex-row">
      <div className="relative order-1 basis-1/2 border-t border-joanGreen-600 lg:order-none lg:border-r">
        <Image
          src={eventPhoto}
          alt="Melvin Sokolsky - Sidekick, Harper's Bazaar"
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ width: "100%", height: "100%" }}
          className="select-none object-cover"
        />
      </div>
      <div className="flex basis-1/2 flex-col justify-center px-8 py-10 text-joanGreen-600 lg:p-20">
        <dl className="flex flex-col space-y-10 lg:space-y-8">
          <EventInformationItem
            name="Que dia?"
            action={{
              href: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MzFkaXA4MnFqZHFmOGgwNmxxM2J0ZmswOGMgMmZkNDJkNzFiMTllNWIwYTVkM2NjZDI5ZTgzYTZmMTEwZDA1NTA4NjcxYWExNWZlOGQ1N2RlMjJhMmEwNGZmYUBn&tmsrc=2fd42d71b19e5b0a5d3ccd29e83a6f110d05508671aa15fe8d57de22a2a04ffa%40group.calendar.google.com",
              label: "Google Calendar ＋",
              className: "hidden lg:inline",
            }}
          >
            Sábado, cinco de agosto de dois mil e vinte e três
          </EventInformationItem>
          <EventInformationItem name="Que horas?">
            Duas e meia da tarde
          </EventInformationItem>
          <EventInformationItem
            name="Onde?"
            action={{
              href: "https://goo.gl/maps/i56RHKW5uLg1YMg78",
              label: "Google Maps ↗",
            }}
          >
            <address className="inline not-italic">
              Av. Professor Clóvis Salgado, 1485 — Bandeirantes, BH/MG
            </address>
          </EventInformationItem>
        </dl>
      </div>
    </div>
  );
}

export default EventDetails;
