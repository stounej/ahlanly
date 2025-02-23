import React, { useCallback, useRef, useState , forwardRef, useImperativeHandle, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import  { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import ChooseStyle from "./ChooseStyle";
import ConfirmAddress from "./ConfirmAddress";
import PropertyDetails from "./PropertyDetails";
import EquipmentsPage from "./EquipmentsPage";
import PhotosPage from "./PhotosPage";
import AddTitlePage from "./TitlePage";
import DescriptionPage from "./DescriptionPage";
import PricePage from "./PricePage";
import ChooseType from "./ChooseType";
import TasksPage from "./TasksPage";
import usePropertyStore from "@/app/store/addProperty";
import { propertiesService } from "@/services";
import ImportOptionsScreen from "./add";

const AddProperty = forwardRef((props, ref) => {
  const [step, setStep] = useState( -1); // Étape actuelle
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {property} = usePropertyStore()

  const nextStep = async () => {
    if (step < 9) {
      setStep(step + 1);
    } else {      // Traitez les données finales ici (exemple : appel API)
      await propertiesService.create({...property})
      
    }
  };

  useEffect(()=> {
    setStep(props.step)

  }, [props.step])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));
  const prevStep = () => {
    if (step > -1) {
      setStep(step - 1);
    }
  };
          
  const renderContent = () => {
    switch (step) {
      case -1:
        return (
          <View style={styles.content}>
           <ImportOptionsScreen setStep={(s:number)=> setStep(s)}/>
          </View>
        );
      case 0:
        return (
          <View style={styles.content}>
            <ChooseType  onNext={nextStep}  />
          </View>
        );
      case 1:
        return (
          <View style={styles.content}>
            <ChooseStyle  onNext={nextStep} onPrev={prevStep}/>
          </View>
        );
      case 2:
        return (
          <View style={styles.content}>
            <ConfirmAddress onNext={nextStep} onPrev={prevStep}/>
          </View>
        );
        case 3:
          return (
            <View style={styles.content}>
              <PropertyDetails onNext={nextStep} onPrev={prevStep}/>
            </View>
          );
        case 4:
          return (
            <View style={styles.content}>
              <EquipmentsPage onNext={nextStep} onPrev={prevStep}/>
            </View>
          );
        case 5:
        return (
          <View style={styles.content}>
            <PhotosPage onNext={nextStep}
             onPrev={prevStep}
              isEdit={props.isEdit}
              onClose={handleCloseModalPress}/>
          </View>
        );
        case 6:
        return (
          <View style={styles.content}>
            <AddTitlePage onNext={nextStep} onPrev={prevStep}/>
          </View>
        );
        case 7:
        return (
          <View style={styles.content}>
            <DescriptionPage onNext={nextStep} onPrev={prevStep}/>
          </View>
        );
        case 8:
          return (
            <View style={styles.content}>
              <PricePage onNext={nextStep} onPrev={prevStep}/>
            </View>
          );
        case 9:
        return (
          <View style={styles.content}>
            <TasksPage onNext={nextStep} onPrev={prevStep}/>
          </View>
        );
      default:
        return null;
    }
  };

  return (
      <BottomSheetModal
        index={1} // Fermer par défaut
        snapPoints={["50%", "98%"]}
        ref={bottomSheetModalRef}
      >
         <BottomSheetView  style={styles.contentContainer}>
        {renderContent()}
        </BottomSheetView>
      </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
      },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'

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

export default AddProperty;
