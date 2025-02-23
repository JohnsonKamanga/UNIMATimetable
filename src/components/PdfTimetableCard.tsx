import { StyleSheet, Text, View } from "@react-pdf/renderer";

export type TPdfTimetableCard = {
  course: string;
  venue: string;
  time: string;
  style?: {
    backgroundColor: string;
    color: string;
  };
};

const styles = StyleSheet.create({
  cardText: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    opacity: 1,
  },
});


export function PdfTimetableCard(props: TPdfTimetableCard) {
    const { course, venue, time, style } = props;
    return (
      <View
        style={{
          ...style,
          padding: 6,
          height: "100%",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            {course}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontWeight: 300,
            fontSize: "11px",
          }}
        >
          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgb(0,0,0)",
              opacity: 0.25,
              overflow: "hidden",
            }}
          >
            <View style={styles.cardText}>
              <Text>{time}</Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgb(0,0,0)",
              opacity: 0.25,
              overflow: "hidden",
            }}
          >
            <View style={styles.cardText}>
              <Text>{venue}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }