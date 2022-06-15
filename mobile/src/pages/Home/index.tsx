import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface IBGEUFResponse {
  id: number;
  sigla: string;
}

interface IBGECityResponse {
  id: number;
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        setUfs(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      setCities([]);
      return;
    }

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {});
  }, [selectedUf]);

  function handleNavigateToPoints() {
    const uf = selectedUf;
    const city = selectedCity;

    if (uf === "0" || city === "0") {
      return Alert.alert("Alerta", "UF e Cidade são campos obrigatórios.");
    }

    navigation.navigate("Points", { uf, city });
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
      <View style={styles.footer}>
        <Picker
          style={styles.select}
          selectedValue={selectedUf}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedUf(String(itemValue))
          }
          mode="dialog"
        >
          <Picker.Item label="Selecionar UF" value="0" />
          {ufs.map((uf) => (
            <Picker.Item key={uf.id} label={uf.sigla} value={uf.sigla} />
          ))}
        </Picker>
        <Picker
          style={styles.select}
          selectedValue={selectedCity}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCity(String(itemValue))
          }
          mode="dialog"
        >
          <Picker.Item label="Selecionar cidade" value="0" />
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.nome} value={city.nome} />
          ))}
        </Picker>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#fff" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    backgroundColor: "#FFF",
    marginBottom: 8,
    color: "#6C6C80",
  },

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export { Home };
