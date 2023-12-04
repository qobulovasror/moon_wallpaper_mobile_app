import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import CustomTimePicker from "./components/CustomDateTime";
import { useEffect, useState } from "react";
import defaultImg from "./assets/moon.jpg";
import { TouchableOpacity } from "react-native";
import setWallpaper from "./components/WallpaperChange";

const screenWidth = Dimensions.get("window").width - 30;

export default function App() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [img, setImg] = useState(defaultImg);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    const month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
    const day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay();
    const hour = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    const res = await fetch(
      `https://svs.gsfc.nasa.gov/api/dialamoon/${date.getFullYear()}-${month}-${day}T${hour}:00`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (res.status == 200) {
      res.json().then((data) => {
        setImg({
          uri: data?.image?.url,
        });
      });
      setLoad(false);
    } else {
      alert(res.statusText);
      setLoad(false);
    }
  };

  const setWallaper = async () => {
    try {
      // Fetch the image from the internet
      const response = await fetch(
        img.uri
          ? img.uri
          : "https://svs.gsfc.nasa.gov/vis/a000000/a005000/a005048/frames/730x730_1x1_30p/moon.7393.jpg"
      );
      const blob = await response.blob();

      // Convert the image to Base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      // Call the setWallpaper function with the Base64-encoded image
      setWallpaper(base64Image);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Moon phase wallpaper</Text>
      {load ? (
        <View style={styles.img}>
          <ActivityIndicator size="large" color="#00f" />
        </View>
      ) : (
        <Image style={styles.img} source={img} />
      )}
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Date: {date.toLocaleDateString()}</Text>
        <CustomTimePicker
          date={date}
          setDate={setDate}
          mode="date"
          fetchData={fetchData}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>
          Time: {date.getHours() + ":" + date.getMinutes()}
        </Text>
        <CustomTimePicker
          date={time}
          setDate={setTime}
          mode="time"
          fetchData={fetchData}
        />
      </View>
      <TouchableOpacity style={styles.setBtn} onPress={() => setWallaper()}>
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
          Set Wallpaper
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" backgroundColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    marginTop: "20%",
    fontSize: 28,
  },
  img: {
    width: screenWidth,
    height: screenWidth,
    marginTop: 50,
    marginHorizontal: 15,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  btn: {
    position: "absolute",
    backgroundColor: "#00f",
    height: 40,
    padding: 8,
    borderRadius: 10,
    marginTop: 40,
    right: "10%",
  },
  setBtn: {
    backgroundColor: "#00f",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
