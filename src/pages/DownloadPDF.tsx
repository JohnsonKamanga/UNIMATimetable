import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import { UserContext } from "../user-context";
import { PDFViewer, Text } from "@react-pdf/renderer";
import { Document, Page, View } from "@react-pdf/renderer";
import { PdfTimetableComponent } from "../components/PdfTimetableComponent";

export default function DownloadPDF() {
  const { name } = useParams();
  const [timetableData, settimetableData] = useState<any[]>([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseurl}/timetable/view?userId=${user?.id}&name=${name}`)
      .then(async (res) => {
        let sortedData = [];
        for (let i = 0; i < 9; i++) {
          sortedData.push([
            res.data?.monday[i],
            res.data?.tuesday[i],
            res.data?.wednesday[i],
            res.data?.thursday[i],
            res.data?.friday[i],
          ]);
        }
        settimetableData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occured: ", err);
      });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,o.25)",
          }}
        >
          <Loader message="Fetching Timetable Data" />
        </View>
      </View>
    );
  }

  return (
    <PDFViewer className="h-screen w-full">
      <Document>
        <Page
          size="A3"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              padding: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 50,
                marginVertical: 5,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              A Timetable for {user?.username}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Saved on {Date()}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              padding: 50,
            }}
          >
            <PdfTimetableComponent TimetableData={timetableData} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
