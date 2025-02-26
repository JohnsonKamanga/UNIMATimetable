import { TRow } from "@/pages/Timetable";
import { saveAs } from "file-saver";
import { getPeriodTime } from "./time";

export type TExportToCSVInput = {
  monday: TRow;
  tuesday: TRow;
  wednesday: TRow;
  thursday: TRow;
  friday: TRow;
};

export function exportExcel(timetableData: TExportToCSVInput | undefined) {
  if(!timetableData){
    return;
  }

  const keys = ["Course", "Period", "Time", "Venue", "Day"];
  const days: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday")[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  var convertToCSV = function (csvData: TExportToCSVInput, keys: string[]) {
    let res = keys.join(";") + "\n";
    for (let i = 0; i < days.length; i++) {
      const day: TRow = csvData[days[i]];
      for (let j = 0; j < day.length; j++) {
        const period = day[j];
        if (!period) {
          continue;
        }
        res +=
          period.course.course_code +
          ";" +
          `${j + 1}` +
          ";" +
          getPeriodTime(period.scheduled_time) +
          ";" +
          period.venue +
          ";" +
          days[i] +
          "\n";
      }
    }
    return res;
  };

  const str = convertToCSV(timetableData, keys);
  const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
  const filename = prompt("Please enter the filename");
  if (filename != null && filename != "") saveAs(blob, filename + ".csv");
  else alert("please enter a filename!");
}
