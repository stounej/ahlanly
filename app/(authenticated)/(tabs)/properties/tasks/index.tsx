import React, { useCallback, useRef, useState , forwardRef, useImperativeHandle} from "react";
import { View, StyleSheet } from "react-native";
import  { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import ShowTasks from "./ShowTasks";
import AddTaskScreen from "./AddTaskScreen";

interface ChildRef {
  handlePresentModalPress: () => void; // Define the methods you want to expose
}

interface ManageTasksProps {
  step: number;
  propertyId?: string; // Optional if not always provided
  tasks: any;
  selectedCateg:any
}

const ManageTasks = forwardRef<ChildRef, ManageTasksProps>(({ step, propertyId, tasks, selectedCateg }, ref) => {
  const [currentStep, setStep] = useState(step ?? 0); // Current step
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  console.log('propertyId');
  console.log(propertyId);
  

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyAddress: "",
    ownerName: "",
    contactNumber: "",
  });

  const nextStep = () => {
    if (currentStep < 10) {
      setStep(currentStep + 1);
    } else {
      // Handle final data processing here (e.g., API call)
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));
  const prevStep = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };
          
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.content}>
          
              <ShowTasks categories={tasks} selectedCateg={selectedCateg} propertyId= {propertyId}/>
          </View>

        );
      case 1:
        return (
          <View style={styles.content}>
            <AddTaskScreen  propertyId={propertyId}/>
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
        // onChange={()=>{setStep(0)}}
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
    width: '100%',
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
