import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const MaisonButton = () => {
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
                    d="M1.9539999961853027,-13.718999862670898 C1.9539999961853027,-13.718999862670898 2.128999948501587,-13.555000305175781 2.128999948501587,-13.555000305175781 C2.128999948501587,-13.555000305175781 15.201000213623047,-0.7129999995231628 15.201000213623047,-0.7129999995231628 C15.201000213623047,-0.7129999995231628 13.798999786376953,0.7129999995231628 13.798999786376953,0.7129999995231628 C13.798999786376953,0.7129999995231628 11.99899959564209,-1.0549999475479126 11.99899959564209,-1.0549999475479126 C11.99899959564209,-1.0549999475479126 12,12.5 12,12.5 C12,13.553999900817871 11.184000015258789,14.418000221252441 10.14900016784668,14.494000434875488 C10.14900016784668,14.494000434875488 10,14.5 10,14.5 C10,14.5 -10,14.5 -10,14.5 C-11.053999900817871,14.5 -11.918000221252441,13.684000015258789 -11.994999885559082,12.64900016784668 C-11.994999885559082,12.64900016784668 -12,12.5 -12,12.5 C-12,12.5 -12.00100040435791,-1.0540000200271606 -12.00100040435791,-1.0540000200271606 C-12.00100040435791,-1.0540000200271606 -13.798999786376953,0.7129999995231628 -13.798999786376953,0.7129999995231628 C-13.798999786376953,0.7129999995231628 -15.201000213623047,-0.7129999995231628 -15.201000213623047,-0.7129999995231628 C-15.201000213623047,-0.7129999995231628 -2.1429998874664307,-13.541999816894531 -2.1429998874664307,-13.541999816894531 C-1.0299999713897705,-14.678000450134277 0.7649999856948853,-14.741000175476074 1.9539999961853027,-13.718999862670898z M-0.6320000290870667,-12.21500015258789 C-0.6320000290870667,-12.21500015258789 -0.7279999852180481,-12.128000259399414 -0.7279999852180481,-12.128000259399414 C-0.7279999852180481,-12.128000259399414 -10.00100040435791,-3.0190000534057617 -10.00100040435791,-3.0190000534057617 C-10.00100040435791,-3.0190000534057617 -10,12.5 -10,12.5 C-10,12.5 -5.000999927520752,12.49899959564209 -5.000999927520752,12.49899959564209 C-5.000999927520752,12.49899959564209 -5,2.5 -5,2.5 C-5,1.4459999799728394 -4.184000015258789,0.5820000171661377 -3.1489999294281006,0.5049999952316284 C-3.1489999294281006,0.5049999952316284 -3,0.5 -3,0.5 C-3,0.5 3,0.5 3,0.5 C4.053999900817871,0.5 4.918000221252441,1.315999984741211 4.994999885559082,2.3510000705718994 C4.994999885559082,2.3510000705718994 5,2.5 5,2.5 C5,2.5 4.999000072479248,12.49899959564209 4.999000072479248,12.49899959564209 C4.999000072479248,12.49899959564209 10,12.5 10,12.5 C10,12.5 9.99899959564209,-3.0199999809265137 9.99899959564209,-3.0199999809265137 C9.99899959564209,-3.0199999809265137 0.699999988079071,-12.156000137329102 0.699999988079071,-12.156000137329102 C0.335999995470047,-12.512999534606934 -0.23199999332427979,-12.53499984741211 -0.6320000290870667,-12.21500015258789z M3,2.5 C3,2.5 -3,2.5 -3,2.5 C-3,2.5 -3.000999927520752,12.49899959564209 -3.000999927520752,12.49899959564209 C-3.000999927520752,12.49899959564209 2.999000072479248,12.49899959564209 2.999000072479248,12.49899959564209 C2.999000072479248,12.49899959564209 3,2.5 3,2.5z"/>
              </G>
            </G>
          </G>
        </Svg>
        <Text style={styles.title}>Maison</Text>
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

export default MaisonButton;
