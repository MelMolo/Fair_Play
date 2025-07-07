/* eslint-disable @typescript-eslint/no-unused-vars */

import { Report } from "@/types/reports";

let reports: Report[] = [
  {
    id: "5",
    firstName: "Fatima",
    lastName: "Ali",
    event: "Cyclisme",
    type: "Respect",
    description: "Waited for a fellow cyclist who had a flat tire.",
    country: "Mali",
    gender: "female",
    age: 23,
    date: "2025-07-01",
  },
  {
    id: "6",
    firstName: "Pierre",
    lastName: "Tchouameni",
    event: "Football",
    type: "Altruisme",
    description: "Helped a teammate overcome anxiety before a match.",
    country: "Cameroon",
    gender: "male",
    age: 26,
    date: "2025-06-30",
  },
  {
    id: "7",
    firstName: "Léa",
    lastName: "Mbi",
    event: "Athlétisme",
    type: "Courage",
    description: "Finished a marathon despite collapsing twice.",
    country: "Ivory Coast",
    gender: "female",
    age: 30,
    date: "2025-06-29",
  },
  {
    id: "8",
    firstName: "Eric",
    lastName: "Bakary",
    event: "Handball",
    type: "Honnêteté",
    description: "Returned a wrongly awarded point.",
    country: "Gabon",
    gender: "male",
    age: 22,
    date: "2025-06-28",
  },
  {
    id: "9",
    firstName: "Diane",
    lastName: "Kouassi",
    event: "Natation",
    type: "Respect",
    description: "Congratulated every opponent personally.",
    country: "Cameroon",
    gender: "female",
    age: 19,
    date: "2025-06-27",
  },
  {
    id: "10",
    firstName: "Samuel",
    lastName: "Etame",
    event: "Tennis",
    type: "Altruisme",
    description: "Offered coaching tips to a new competitor.",
    country: "Cameroon",
    gender: "male",
    age: 33,
    date: "2025-06-22",
  },
  {
    id: "11",
    firstName: "Olivia",
    lastName: "Nseke",
    event: "Football",
    type: "Respect",
    description: "Stopped play when an opponent fainted.",
    country: "Chad",
    gender: "female",
    age: 25,
    date: "2025-06-25",
  },
];

// Get all reports
export function getAllReports(userId: string): Report[] {
  return reports;
}

// Add a new report
export function addReport(report: Report) {
  reports.push(report);
}

// Delete a report by ID (admin only)
export function deleteReport(id: string, userId: string) {
  // You can verify userId if needed
  reports = reports.filter((r) => r.id !== id);
}

// Delete all reports (admin only)
export function deleteAllReports(userId: string) {
  // You can verify userId if needed
  reports = [];
}
