import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const Hotel = () => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <View style={styles.svgContainer}>
        <Svg
          viewBox="0 0 45 45"
          width={45}
          height={45}
        >
          <Defs>
            <ClipPath id="clipPath">
              <Rect width="45" height="45" x="0" y="0" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#clipPath)">
            <G transform="matrix(1,0,0,1,0.875,8)" opacity="1">
              <G transform="matrix(1,0,0,1,16,14.5)" opacity="1">
                <Path
                  fill="#222222"
d=" M12,-14 C13.053999900817871,-14 13.918000221252441,-13.184000015258789 13.994999885559082,-12.14900016784668 C13.994999885559082,-12.14900016784668 14,-12 14,-12 C14,-12 14,12 14,12 C14,13.053999900817871 13.184000015258789,13.918000221252441 12.14900016784668,13.994000434875488 C12.14900016784668,13.994000434875488 12,14 12,14 C12,14 -12,14 -12,14 C-13.053999900817871,14 -13.918000221252441,13.184000015258789 -13.994999885559082,12.14900016784668 C-13.994999885559082,12.14900016784668 -14,12 -14,12 C-14,12 -14,-12 -14,-12 C-14,-13.053999900817871 -13.184000015258789,-13.918000221252441 -12.14900016784668,-13.994999885559082 C-12.14900016784668,-13.994999885559082 -12,-14 -12,-14 C-12,-14 12,-14 12,-14z M0,-9.085000038146973 C0,-9.085000038146973 -3.0859999656677246,-6 -3.0859999656677246,-6 C-3.0859999656677246,-6 -12,-6 -12,-6 C-12,-6 -12,12 -12,12 C-12,12 -4,12 -4,12 C-4,12 -4,7 -4,7 C-4,5.946000099182129 -3.184000015258789,5.081999778747559 -2.1489999294281006,5.005000114440918 C-2.1489999294281006,5.005000114440918 -2,5 -2,5 C-2,5 2,5 2,5 C3.053999900817871,5 3.9179999828338623,5.815999984741211 3.994999885559082,6.85099983215332 C3.994999885559082,6.85099983215332 4,7 4,7 C4,7 4,12 4,12 C4,12 12,12 12,12 C12,12 12,-6 12,-6 C12,-6 3.0859999656677246,-6 3.0859999656677246,-6 C3.0859999656677246,-6 0,-9.085000038146973 0,-9.085000038146973z M2,7 C2,7 -2,7 -2,7 C-2,7 -2,12 -2,12 C-2,12 2,12 2,12 C2,12 2,7 2,7z M8,5 C8.552000045776367,5 9,5.447999954223633 9,6 C9,6.552000045776367 8.552000045776367,7 8,7 C7.447999954223633,7 7,6.552000045776367 7,6 C7,5.447999954223633 7.447999954223633,5 8,5z M-8,5 C-7.447999954223633,5 -7,5.447999954223633 -7,6 C-7,6.552000045776367 -7.447999954223633,7 -8,7 C-8.552000045776367,7 -9,6.552000045776367 -9,6 C-9,5.447999954223633 -8.552000045776367,5 -8,5z M8,1 C8.552000045776367,1 9,1.4479999542236328 9,2 C9,2.552000045776367 8.552000045776367,3 8,3 C7.447999954223633,3 7,2.552000045776367 7,2 C7,1.4479999542236328 7.447999954223633,1 8,1z M-8,1 C-7.447999954223633,1 -7,1.4479999542236328 -7,2 C-7,2.552000045776367 -7.447999954223633,3 -8,3 C-8.552000045776367,3 -9,2.552000045776367 -9,2 C-9,1.4479999542236328 -8.552000045776367,1 -8,1z M8,-3 C8.552000045776367,-3 9,-2.552000045776367 9,-2 C9,-1.4479999542236328 8.552000045776367,-1 8,-1 C7.447999954223633,-1 7,-1.4479999542236328 7,-2 C7,-2.552000045776367 7.447999954223633,-3 8,-3z M0,-3 C0.5519999861717224,-3 1,-2.552000045776367 1,-2 C1,-1.4479999542236328 0.5519999861717224,-1 0,-1 C-0.5519999861717224,-1 -1,-1.4479999542236328 -1,-2 C-1,-2.552000045776367 -0.5519999861717224,-3 0,-3z M-8,-3 C-7.447999954223633,-3 -7,-2.552000045776367 -7,-2 C-7,-1.4479999542236328 -7.447999954223633,-1 -8,-1 C-8.552000045776367,-1 -9,-1.4479999542236328 -9,-2 C-9,-2.552000045776367 -8.552000045776367,-3 -8,-3z M12,-8 C12,-8 12,-12 12,-12 C12,-12 -12,-12 -12,-12 C-12,-12 -12,-8 -12,-8 C-12,-8 -3.9159998893737793,-8 -3.9159998893737793,-8 C-3.9159998893737793,-8 -1.4140000343322754,-10.5 -1.4140000343322754,-10.5 C-0.6740000247955322,-11.239999771118164 0.5009999871253967,-11.279000282287598 1.2869999408721924,-10.616999626159668 C1.2869999408721924,-10.616999626159668 1.4140000343322754,-10.5 1.4140000343322754,-10.5 C1.4140000343322754,-10.5 3.9149999618530273,-8 3.9149999618530273,-8 C3.9149999618530273,-8 12,-8 12,-8z"/>
</G>
                  </G>

          </G>
        </Svg>
        <Text style={styles.title}>Hotel</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {

    width: "48%",

    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
  svgContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
});

export default Hotel;
