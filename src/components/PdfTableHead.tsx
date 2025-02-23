import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";

export function PDFTableHead({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 1,
      }}
    >
      {children}
    </View>
  );
}