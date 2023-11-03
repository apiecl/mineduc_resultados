import { getColors, mineducNivoTheme } from "../theme/mineduc_theme";
import { useTheme } from "../ThemeContext";
import { useState, useEffect } from "react";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveTreeMap } from "@nivo/treemap";

function CustomTreemap({ variant, data, height }) {
  return (
    <div style={{ height: `${height}px` }}>
      <ThemedTreeMap data={data} variant={variant} />
    </div>
  );
}

const ThemedTreeMap = ({ data, variant }) => {
  const [fills, setFills] = useState(null);
  const [colors, setColors] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setColors(getColors(theme.darkTheme));
  }, [theme]);

  useEffect(() => {
    setFills([
      linearGradientDef("redFill", [
        { offset: 0, color: colors?.red },
        { offset: 100, color: colors?.red },
      ]),
      linearGradientDef("blueFill", [
        { offset: 0, color: colors?.blue },
        { offset: 100, color: colors?.blue },
      ]),
    ]);
  }, [colors]);

  const truncate = (label, max) => {
    return label.length > max ? label.substring(0, max - 3) + "..." : label;
  };

  return (
    <ResponsiveTreeMap
      theme={mineducNivoTheme}
      enableParentLabel={false}
      value="loc"
      identity="name"
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      colors={{ scheme: "reds" }}
      data={data}
      labelSkipSize={120}
      nodeOpacity={1}
      borderColor={"white"}
      label={(e) => {
        return `${truncate(e.id, 30)} - ${e.formattedValue}`;
      }}
      labelTextColor={"white"}
      defs={fills}
      orientLabel={true}
      fill={[{ match: "*", id: variant === "red" ? "redFill" : "blueFill" }]}
    />
  );
};

export default CustomTreemap;
