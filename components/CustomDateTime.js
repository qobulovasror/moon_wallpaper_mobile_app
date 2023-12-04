import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
const CustomTimePicker = ({ date, setDate, mode, fetchData }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    fetchData()
  };

  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={() => setShow(true)}>
          <Feather name="edit-2" size={25} color="#fff" />
        </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: "#fff",
    minHeight: 40,
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginTop: 20,
  },
  btn: {
    position: 'absolute',
    backgroundColor: "#00f",
    height: 40,
    padding: 8,
    borderRadius: 10,
    marginTop: -40,
    right: '10%',
    zIndex: 10
  },
});

export default CustomTimePicker;
