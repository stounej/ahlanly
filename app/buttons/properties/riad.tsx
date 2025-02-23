import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const Riad = ({onPressB, isSelected}) => {
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
d=" M1.347000002861023,-13.701000213623047 C1.347000002861023,-13.701000213623047 1.5260000228881836,-13.602999687194824 1.5260000228881836,-13.602999687194824 C1.5260000228881836,-13.602999687194824 11.508999824523926,-7.703999996185303 11.508999824523926,-7.703999996185303 C11.508999824523926,-7.703999996185303 10.491000175476074,-5.98199987411499 10.491000175476074,-5.98199987411499 C10.491000175476074,-5.98199987411499 9,-6.863999843597412 9,-6.863999843597412 C9,-6.863999843597412 9,-1.843000054359436 9,-1.843000054359436 C9,-1.7640000581741333 8.991000175476074,-1.687999963760376 8.972999572753906,-1.6139999628067017 C8.972999572753906,-1.6139999628067017 15.600000381469727,3.3570001125335693 15.600000381469727,3.3570001125335693 C15.600000381469727,3.3570001125335693 14.399999618530273,4.956999778747559 14.399999618530273,4.956999778747559 C14.399999618530273,4.956999778747559 13,3.9059998989105225 13,3.9059998989105225 C13,3.9059998989105225 13,13.156999588012695 13,13.156999588012695 C13,13.668999671936035 12.61400032043457,14.092000007629395 12.116000175476074,14.149999618530273 C12.116000175476074,14.149999618530273 12,14.156999588012695 12,14.156999588012695 C12,14.156999588012695 -12,14.156999588012695 -12,14.156999588012695 C-12.512999534606934,14.156999588012695 -12.935999870300293,13.770999908447266 -12.993000030517578,13.27299976348877 C-12.993000030517578,13.27299976348877 -13,13.156999588012695 -13,13.156999588012695 C-13,13.156999588012695 -13,3.9059998989105225 -13,3.9059998989105225 C-13,3.9059998989105225 -14.399999618530273,4.956999778747559 -14.399999618530273,4.956999778747559 C-14.399999618530273,4.956999778747559 -15.600000381469727,3.3570001125335693 -15.600000381469727,3.3570001125335693 C-15.600000381469727,3.3570001125335693 -8.973999977111816,-1.6139999628067017 -8.973999977111816,-1.6139999628067017 C-8.973999977111816,-1.6139999628067017 -8.993000030517578,-1.7269999980926514 -8.993000030517578,-1.7269999980926514 C-8.993000030517578,-1.7269999980926514 -9,-1.843000054359436 -9,-1.843000054359436 C-9,-1.843000054359436 -9,-6.863999843597412 -9,-6.863999843597412 C-9,-6.863999843597412 -10.491000175476074,-5.98199987411499 -10.491000175476074,-5.98199987411499 C-10.491000175476074,-5.98199987411499 -11.508999824523926,-7.703999996185303 -11.508999824523926,-7.703999996185303 C-11.508999824523926,-7.703999996185303 -1.5260000228881836,-13.602999687194824 -1.5260000228881836,-13.602999687194824 C-0.6439999938011169,-14.125 0.4390000104904175,-14.156999588012695 1.347000002861023,-13.701000213623047z M-7,4.156000137329102 C-7,4.156000137329102 -11,4.1570000648498535 -11,4.1570000648498535 C-11,4.1570000648498535 -11,12.156999588012695 -11,12.156999588012695 C-11,12.156999588012695 -7,12.156000137329102 -7,12.156000137329102 C-7,12.156000137329102 -7,4.156000137329102 -7,4.156000137329102z M5,4.1570000648498535 C5,4.1570000648498535 -5,4.1570000648498535 -5,4.1570000648498535 C-5,4.1570000648498535 -5,12.156999588012695 -5,12.156999588012695 C-5,12.156999588012695 -3,12.156000137329102 -3,12.156000137329102 C-3,12.156000137329102 -3,7.1570000648498535 -3,7.1570000648498535 C-3,6.644000053405762 -2.614000082015991,6.2210001945495605 -2.117000102996826,6.163000106811523 C-2.117000102996826,6.163000106811523 -2,6.1570000648498535 -2,6.1570000648498535 C-2,6.1570000648498535 2,6.1570000648498535 2,6.1570000648498535 C2.513000011444092,6.1570000648498535 2.934999942779541,6.543000221252441 2.993000030517578,7.039999961853027 C2.993000030517578,7.039999961853027 3,7.1570000648498535 3,7.1570000648498535 C3,7.1570000648498535 3,12.156000137329102 3,12.156000137329102 C3,12.156000137329102 5,12.156999588012695 5,12.156999588012695 C5,12.156999588012695 5,4.1570000648498535 5,4.1570000648498535z M11,4.1570000648498535 C11,4.1570000648498535 7,4.156000137329102 7,4.156000137329102 C7,4.156000137329102 7,12.156000137329102 7,12.156000137329102 C7,12.156000137329102 11,12.156999588012695 11,12.156999588012695 C11,12.156999588012695 11,4.1570000648498535 11,4.1570000648498535z M1,8.156999588012695 C1,8.156999588012695 -1,8.156999588012695 -1,8.156999588012695 C-1,8.156999588012695 -1,12.156999588012695 -1,12.156999588012695 C-1,12.156999588012695 1,12.156999588012695 1,12.156999588012695 C1,12.156999588012695 1,8.156999588012695 1,8.156999588012695z M10.666999816894531,2.1559998989105225 C10.666999816894531,2.1559998989105225 6.666999816894531,-0.8429999947547913 6.666999816894531,-0.8429999947547913 C6.666999816894531,-0.8429999947547913 4.764999866485596,-0.843999981880188 4.764999866485596,-0.843999981880188 C4.764999866485596,-0.843999981880188 6.565000057220459,2.1559998989105225 6.565000057220459,2.1559998989105225 C6.565000057220459,2.1559998989105225 10.666999816894531,2.1559998989105225 10.666999816894531,2.1559998989105225z M-10.666999816894531,2.1559998989105225 C-10.666999816894531,2.1559998989105225 -6.565999984741211,2.1559998989105225 -6.565999984741211,2.1559998989105225 C-6.565999984741211,2.1559998989105225 -4.765999794006348,-0.843999981880188 -4.765999794006348,-0.843999981880188 C-4.765999794006348,-0.843999981880188 -6.666999816894531,-0.8429999947547913 -6.666999816894531,-0.8429999947547913 C-6.666999816894531,-0.8429999947547913 -10.666999816894531,2.1559998989105225 -10.666999816894531,2.1559998989105225z M2.434999942779541,-0.8429999947547913 C2.434999942779541,-0.8429999947547913 -2.434000015258789,-0.8429999947547913 -2.434000015258789,-0.8429999947547913 C-2.434000015258789,-0.8429999947547913 -4.234000205993652,2.1559998989105225 -4.234000205993652,2.1559998989105225 C-4.234000205993652,2.1559998989105225 4.234000205993652,2.1559998989105225 4.234000205993652,2.1559998989105225 C4.234000205993652,2.1559998989105225 2.434999942779541,-0.8429999947547913 2.434999942779541,-0.8429999947547913z M-4,-6.843999862670898 C-4,-6.843999862670898 -7,-6.8429999351501465 -7,-6.8429999351501465 C-7,-6.8429999351501465 -7,-2.8429999351501465 -7,-2.8429999351501465 C-7,-2.8429999351501465 -4,-2.8440001010894775 -4,-2.8440001010894775 C-4,-2.8440001010894775 -4,-6.843999862670898 -4,-6.843999862670898z M2,-6.843999862670898 C2,-6.843999862670898 -2,-6.843999862670898 -2,-6.843999862670898 C-2,-6.843999862670898 -2,-2.8440001010894775 -2,-2.8440001010894775 C-2,-2.8440001010894775 2,-2.8440001010894775 2,-2.8440001010894775 C2,-2.8440001010894775 2,-6.843999862670898 2,-6.843999862670898z M7,-6.8429999351501465 C7,-6.8429999351501465 4,-6.843999862670898 4,-6.843999862670898 C4,-6.843999862670898 4,-2.8440001010894775 4,-2.8440001010894775 C4,-2.8440001010894775 7,-2.8429999351501465 7,-2.8429999351501465 C7,-2.8429999351501465 7,-6.8429999351501465 7,-6.8429999351501465z M-0.3880000114440918,-11.942000389099121 C-0.3880000114440918,-11.942000389099121 -0.5090000033378601,-11.880999565124512 -0.5090000033378601,-11.880999565124512 C-0.5090000033378601,-11.880999565124512 -5.64900016784668,-8.843999862670898 -5.64900016784668,-8.843999862670898 C-5.64900016784668,-8.843999862670898 5.6479997634887695,-8.843999862670898 5.6479997634887695,-8.843999862670898 C5.6479997634887695,-8.843999862670898 0.5090000033378601,-11.880999565124512 0.5090000033378601,-11.880999565124512 C0.23399999737739563,-12.043000221252441 -0.0989999994635582,-12.064000129699707 -0.3880000114440918,-11.942000389099121z"/>
</G>
                  </G>

          </G>
        </Svg>
        <Text style={styles.title}>Riad</Text>
      </View>
     
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


export default Riad;
