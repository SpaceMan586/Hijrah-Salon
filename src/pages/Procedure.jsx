import React from 'react';
import { Timeline } from 'flowbite-react';
import { HiCalendar, HiCheckCircle, HiClock, HiShieldCheck } from 'react-icons/hi';
import { useAdmin } from '../context/AdminContext';

export default function Procedure() {
  const { siteContent } = useAdmin();
  const { procedure } = siteContent;

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
                {procedure.title}
            </h1>
            <p className="text-gray-600">Ikuti langkah mudah berikut untuk pengalaman terbaik.</p>
            <div className="h-1 w-20 bg-pink-500 mx-auto mt-6"></div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <Timeline>
                {procedure.steps.map((step, idx) => (
                    <Timeline.Item key={idx}>
                        <Timeline.Point icon={
                            idx === 0 ? HiCalendar : 
                            idx === 1 ? HiCheckCircle : 
                            idx === 2 ? HiClock : HiShieldCheck
                        } />
                        <Timeline.Content>
                            <Timeline.Time className="text-pink-500 font-bold">Langkah {idx + 1}</Timeline.Time>
                            <Timeline.Title>{step.title}</Timeline.Title>
                            <Timeline.Body>
                                {step.desc}
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
      </div>
    </section>
  );
}