import { ReactNode } from "react";
import { Shell } from "./_components/shell";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <Shell>{children}</Shell>;
};
export default DashboardLayout;
