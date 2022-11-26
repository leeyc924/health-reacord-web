import React, { ReactNode } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";

export interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default React.memo(MainLayout);
