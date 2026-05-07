import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

export default function Layout() {
  return (
    <div className="font-inter min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}