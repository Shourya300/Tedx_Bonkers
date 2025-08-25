import React from "react";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "upcoming" | "past";
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="relative py-16">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-600" />
      {sortedEvents.map((event, index) => (
        <motion.div
          key={event.id}
          className={`flex items-center mb-8 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div
            className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-400">{event.date}</p>
          </div>
          <div
            className={`w-4 h-4 rounded-full bg-red-600 border-4 border-black absolute left-1/2 transform -translate-x-1/2`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
