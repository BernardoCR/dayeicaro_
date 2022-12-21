import type { FC } from "react";
import Image from 'next/image'
import eventPhoto from '../../../public/chandra-e-joao.jpg'

interface EventInformationProps {
  name: string,
  children: JSX.Element | string,
}

const EventInformation = ({ name, children }: EventInformationProps) => {
  return (
    <div className="space-y-2">
      <dt className="font-condensed uppercase tracking-widest text-base">{ name }</dt>
      <dd className="font-serif text-4xl max-w-[32rem]">{ children }</dd>
    </div>
  )
}

const EventDetails: FC = () => {
  return (
    <div className="flex selection:bg-joanGreen-500 selection:text-white">
      <div className="basis-1/2 border-joanGreen-500 border-r relative">
        <Image src={eventPhoto} alt="Chandra e João sorrindo" fill className="object-cover"/>
      </div>
      <div className="basis-1/2 px-16 py-20 text-joanGreen-500">
        <dl className="flex flex-col space-y-8">
          <EventInformation name="Que dia?">
            Sábado, cinco de agosto de dois mil e vinte e três
          </EventInformation>
          <EventInformation name="Que horas?">
            Três da tarde
          </EventInformation>
          <EventInformation name="Onde?">
            <address className="not-italic">Av. Professor Clóvis Salgado, 1485 — Bandeirantes, BH/MG</address>
          </EventInformation>
        </dl>
      </div>
    </div>

  )
}

export default EventDetails