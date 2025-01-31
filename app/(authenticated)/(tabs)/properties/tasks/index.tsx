import React, { useCallback, useRef, useState , forwardRef, useImperativeHandle} from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import  { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import MaisonButton from "@/app/buttons/properties/maison";
import AppartementButton from "@/app/buttons/properties/appartment";
import ChambreButton from "@/app/buttons/properties/chambrehote";
import Cabane from "@/app/buttons/properties/cabane";
import Caravane from "@/app/buttons/properties/caravane";
import Ferme from "@/app/buttons/properties/Ferme";
import Tente from "@/app/buttons/properties/tente";
import Hotel from "@/app/buttons/properties/hotel";
import Riad from "@/app/buttons/properties/riad";
import AddStep1 from "./add1";
import ConfirmAddress from "./add2";
import PropertyDetails from "./add3";
import EquipmentsPage from "./Add4";
import PhotosPage from "./Add5";
import AddTitlePage from "./Add6";
import DescriptionPage from "./Add7";
import PricePage from "./add8";
import DiscountsPage from "./add9";
import SecurityInfoPage from "./add10";
import ShowTasks from "./add1";
import AddTaskScreen from "./add2";

const ManageTasks = forwardRef((props, ref) => {
  const [step, setStep] = useState(0); // Étape actuelle
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyAddress: "",
    ownerName: "",
    contactNumber: "",
  });

  const nextStep = () => {
    if (step < 10) {
      setStep(step + 1);
    } else {
      console.log("Données finales : ", formData);
      // Traitez les données finales ici (exemple : appel API)
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
          
  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.content}>
                    <ShowTasks/>
                        <Button title="Ajouter une tâche" onPress={nextStep} />
          </View>

        );
      case 1:
        return (
          <View style={styles.content}>
            <AddTaskScreen  onNext={nextStep}/>
          </View>
        );
      case 2:
        return (
          <View style={styles.content}>
            <ConfirmAddress onNext={nextStep}/>
          </View>
        );
        case 3:
          return (
            <View style={styles.content}>
              <PropertyDetails onNext={nextStep}/>
            </View>
          );
        case 4:
          return (
            <View style={styles.content}>
              <EquipmentsPage />
              <Button title="Suivant" onPress={nextStep} />
            </View>
          );
        case 5:
        return (
          <View style={styles.content}>
            <PhotosPage />
            <Button title="Suivant" onPress={nextStep} />
          </View>
        );
        case 6:
        return (
          <View style={styles.content}>
            <AddTitlePage />
            <Button title="Suivant" onPress={nextStep} />
          </View>
        );
        case 7:
        return (
          <View style={styles.content}>
            <DescriptionPage />
            <Button title="Suivant" onPress={nextStep} />
          </View>
        );
        case 8:
          return (
            <View style={styles.content}>
              <PricePage />
              <Button title="Suivant" onPress={nextStep} />
            </View>
          );
        case 9:
        return (
          <View style={styles.content}>
            <DiscountsPage />
            <Button title="Suivant" onPress={nextStep} />
          </View>
        );
        case 10:
        return (
          <View style={styles.content}>
            <SecurityInfoPage />
            <Button title="Suivant" onPress={()=> bottomSheetModalRef.current?.close()} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheetModal
        index={1} // Fermer par défaut
        snapPoints={["50%", "98%"]}
        ref={bottomSheetModalRef}
        onChange={()=>{setStep(0)}}
      >
         <BottomSheetView  style={styles.contentContainer}>
        {renderContent()}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row", // Pour mettre les boutons sur une ligne
    justifyContent: "space-between", // Espacer les boutons uniformément
    flexWrap: 'wrap', // Si les boutons dépassent, les mettre sur la ligne suivante
    marginTop: 20,
    padding: 20,
  },
});

export default ManageTasks;
