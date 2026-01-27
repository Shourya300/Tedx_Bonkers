import React from "react";
import TicketHero from "@/components/Ticket/TicketHero";
import TicketBody from "@/components/Ticket/TicketBody";

const Register: React.FC = () => {
  return (
    <div className="w-full h-full gap-2">
      <TicketHero />
      <TicketBody />
    </div>
  );
};

export default Register;
