import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";

export function PDFTh({ children, last }: { children: ReactNode; last?: boolean }) {
    return (
      <View
        style={{
          width: "16.67%",
          borderBottomWidth: 2,
          borderRightWidth: last ? 0 : 2,
          borderBottomColor: "rgb(0,0,0,)",
          opacity: 0.25,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingVertical: 6,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "#000000",
            opacity: 1,
          }}
        >
          {children}
        </View>
      </View>
    );
  }
  