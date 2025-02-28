import { Text, Pressable, View, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

export default function DatePicker({ onChangeDate }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    
    if (Platform.OS === "android") {
      if (event?.type === "dismissed") {
        setShowPicker(false);
        return;
      }
      
      if (mode === "date") {
        setMode("time");
        setDate(currentDate);
        DateTimePickerAndroid.open({
          value: currentDate,
          mode: "time",
          is24Hour: true,
          onChange,
        });
      } else {
        setShowPicker(false);
        setDate(currentDate);
        onChangeDate(currentDate);
      }
    } else {
      setShowPicker(false);
      setDate(currentDate);
      onChangeDate(currentDate);
    }
  };

  const showPickerHandler = (currentMode) => {
    setMode(currentMode);
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        mode: currentMode,
        is24Hour: true,
        onChange,
      });
    } else {
      setShowPicker(true);
    }
  };

  return (
    <View >
      {/* Sélecteur de date */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => showPickerHandler("date")}
      >
        <MaterialIcons name="calendar-today" size={20} color="#2A7FDE" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.dateText}>
            {date.toLocaleDateString("fr-FR", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>
      </Pressable>

      {/* Sélecteur d'heure */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => showPickerHandler("time")}
      >
        <MaterialIcons name="access-time" size={20} color="#2A7FDE" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Heure</Text>
          <Text style={styles.dateText}>
            {date.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </Pressable>

      {showPicker && Platform.OS === "ios" && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="spinner"
          onChange={onChange}
          textColor="#2A7FDE"
          is24Hour={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
 
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  buttonPressed: {
    backgroundColor: "#E3F2FD",
  },
  textContainer: {
    marginLeft: 15,
  },
  label: {
    color: "#757575",
    fontSize: 12,
  },
  dateText: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
  },
});