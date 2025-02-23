import { Text, View } from "@react-pdf/renderer";
import { getPeriodTime } from "../functions/time";
import { TRow } from "../pages/Timetable";
import { PdfTimetableCard } from "./PdfTimetableCard";
import { PDFTableHead } from "./PdfTableHead";
import { PDFTh } from "./PdfTh";

export function PdfTimetableComponent({
  TimetableData,
}: {
  TimetableData: TRow[];
}) {
  const renderTableRow = (row: TRow, index: number) => {
    return (
      <View
        key={index}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "16.67%",
            height: 70,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              padding: 4,
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: 1,
            }}
          >
            <Text>{index + 1}</Text>
          </View>
        </View>
        <View
          style={{
            height: 70,
            width: "16.67%",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          >
            {row[0] && (
              <PdfTimetableCard
                course={row[0]?.course?.course_code}
                venue={row[0]?.venue}
                time={getPeriodTime(row[0]?.scheduled_time)}
                style={{
                  backgroundColor: "#D62828",
                  color: "#FFFFFF",
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            height: 70,
            width: "16.67%",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          >
            {row[1] && (
              <PdfTimetableCard
                course={row[1]?.course.course_code}
                venue={row[1]?.venue}
                time={getPeriodTime(row[1]?.scheduled_time)}
                style={{
                  backgroundColor: "#FCBF49",
                  color: "#000000",
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            height: 70,
            width: "16.67%",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          >
            {row[2] && (
              <PdfTimetableCard
                course={row[2]?.course.course_code}
                venue={row[2]?.venue}
                time={getPeriodTime(row[2]?.scheduled_time)}
                style={{
                  backgroundColor: "#F77F00",
                  color: "#FFFFFF",
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            height: 70,
            width: "16.67%",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          >
            {row[3] && (
              <PdfTimetableCard
                course={row[3]?.course.course_code}
                venue={row[3]?.venue}
                time={getPeriodTime(row[3]?.scheduled_time)}
                style={{
                  backgroundColor: "#EAE2B7",
                  color: "#000000",
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            height: 70,
            width: "16.67%",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "rgb(0,0,0)",
            opacity: 0.25,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          >
            {row[4] && (
              <PdfTimetableCard
                course={row[4]?.course.course_code}
                venue={row[4]?.venue}
                time={getPeriodTime(row[4]?.scheduled_time)}
                style={{
                  backgroundColor: "#D62828",
                  color: "#FFFFFF",
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F8F7F7",
        borderRadius: 6,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: "rgb(30,20,0)",
            borderRadius: 12,
            opacity: 0.25,
            overflow: "hidden",
          }}
        >
          <View
            id="timetable"
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              opacity: 1,
            }}
          >
            <PDFTableHead>
              <PDFTh>
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: 700,
                  }}
                >
                  Period
                </Text>
              </PDFTh>
              <PDFTh>
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: 700,
                  }}
                >
                  Monday
                </Text>
              </PDFTh>
              <PDFTh>
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: 700,
                  }}
                >
                  Tuesday
                </Text>
              </PDFTh>
              <PDFTh>
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: 700,
                  }}
                >
                  Wednesday
                </Text>
              </PDFTh>
              <PDFTh>
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: 700,
                  }}
                >
                  Thursday
                </Text>
              </PDFTh>
              <PDFTh last={true}>
                <Text>Friday</Text>
              </PDFTh>
            </PDFTableHead>
            <View
              style={{
                width: "100%",
              }}
            >
              {TimetableData.map(renderTableRow)}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
