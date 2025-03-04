import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const ChambreButton = ({onPressB, isSelected}) => {
  return (
    <TouchableOpacity onPress={onPressB} style={[styles.button, isSelected && styles.selectedButton]} activeOpacity={0.8}>
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
d=" M5,14.5 C5,14.5 -5,14.5 -5,14.5 C-5,14.5 -5,12.5 -5,12.5 C-5,12.5 5,12.5 5,12.5 C5,12.5 5,14.5 5,14.5z M3,8.5 M3,10.5 C3,10.5 -3,10.5 -3,10.5 C-3,10.5 -3,8.5 -3,8.5 C-3,8.5 3,8.5 3,8.5 C3,8.5 3,10.5 3,10.5z M13,-14.5 C13,-14.5 13,-11.5 13,-11.5 C13,-11.5 15,-11.5 15,-11.5 C15,-11.5 15,-9.5 15,-9.5 C15,-9.5 13,-9.5 13,-9.5 C13,-9.5 13,5.5 13,5.5 C13,6.013000011444092 12.61400032043457,6.435999870300293 12.116999626159668,6.493000030517578 C12.116999626159668,6.493000030517578 12,6.5 12,6.5 C12,6.5 -12,6.5 -12,6.5 C-12.512999534606934,6.5 -12.935999870300293,6.113999843597412 -12.993000030517578,5.617000102996826 C-12.993000030517578,5.617000102996826 -13,5.5 -13,5.5 C-13,5.5 -13,-9.5 -13,-9.5 C-13,-9.5 -15,-9.5 -15,-9.5 C-15,-9.5 -15,-11.5 -15,-11.5 C-15,-11.5 11,-11.5 11,-11.5 C11,-11.5 11,-14.5 11,-14.5 C11,-14.5 13,-14.5 13,-14.5z M11,-9.5 C11,-9.5 -11,-9.5 -11,-9.5 C-11,-9.5 -11,4.5 -11,4.5 C-11,4.5 -4,4.5 -4,4.5 C-4,4.5 -4,-3.5 -4,-3.5 C-4,-4.013000011444092 -3.614000082015991,-4.435999870300293 -3.117000102996826,-4.493000030517578 C-3.117000102996826,-4.493000030517578 -3,-4.5 -3,-4.5 C-3,-4.5 3,-4.5 3,-4.5 C3.513000011444092,-4.5 3.936000108718872,-4.113999843597412 3.993000030517578,-3.617000102996826 C3.993000030517578,-3.617000102996826 4,-3.5 4,-3.5 C4,-3.5 4,4.5 4,4.5 C4,4.5 11,4.5 11,4.5 C11,4.5 11,-9.5 11,-9.5z M2,-2.5 C2,-2.5 -2,-2.5 -2,-2.5 C-2,-2.5 -2,4.5 -2,4.5 C-2,4.5 2,4.5 2,4.5 C2,4.5 2,-2.5 2,-2.5z M8,-7.5 C8.552000045776367,-7.5 9,-7.052000045776367 9,-6.5 C9,-5.947999954223633 8.552000045776367,-5.5 8,-5.5 C7.447999954223633,-5.5 7,-5.947999954223633 7,-6.5 C7,-7.052000045776367 7.447999954223633,-7.5 8,-7.5z"/>   
           </G>
            </G>
          </G>
        </Svg>
      </View>
      <Text style={styles.title}>Maison d'hôte</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '42%',

    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    
  },
  selectedButton: {
    backgroundColor: '#e0f7fa', // Couleur de fond différente pour les éléments sélectionnés
    borderColor: '#007BFF',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  svgContainer: {
    marginBottom: 8,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
});


export default ChambreButton;
