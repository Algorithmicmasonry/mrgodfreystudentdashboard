import DashboardClient from "@/components/dashboard/dashboard-client";
import React from "react";
import { getStudents } from "../actions/getStudents";

const DashboardPage = async () => {
  const students = await getStudents();
  return (
    <div>
      <DashboardClient students={students?.data} />
    </div>
  );
};

export default DashboardPage;
