import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Reservation } from '@/services';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ReservationBottomSheetProps {
  reservation: Reservation;
  onClose: () => void;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ reservation, onClose }: ReservationBottomSheetProps) => {
  const snapPoints = useMemo(() => ['25%', '40%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetModalRef.current?.collapse();
    setRefresh(refresh + 1);
  };
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
  }, [])

  return (
    <View>

   
<TouchableOpacity onPress={handlePresentModalPress} >
          <Text >Contacter le client</Text>
        </TouchableOpacity>
    <BottomSheetModal ref={bottomSheetModalRef}  snapPoints={snapPoints} index={1}  onChange={handleSheetChanges}>
      <BottomSheetView  style={styles.contentContainer}>
      <Text>Réservation</Text>
      <Text>Client: {reservation?.guest}</Text>
      <Text>Check-in: {reservation?.checkIn}</Text>
      <Text>Check-out: {reservation?.checkOut}</Text>
      <Text>Contact: {reservation?.contact}</Text>
      <View>
        <TouchableOpacity onPress={handlePresentModalPress} >
          <Text >Contacter le client</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text>Voir les tâches</Text>
        </TouchableOpacity>
      </View>
      {/* </BottomSheetView> */}
      </BottomSheetView>
      </BottomSheetModal>
      </View>
  );
};

const styles = StyleSheet.create({
 
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ListingsBottomSheet;