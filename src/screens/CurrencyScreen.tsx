import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome6";

const CurrencyScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [convertedValues, setConvertedValues] = useState<{ [key: string]: string }>({});
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  // Lista de monedas soportadas
  const currencies = ["EUR", "GBP", "JPY", "CAD", "CHF", "AUD", "CNY", "MXN"];

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://cdn.dinero.today/api/latest.json");
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        Alert.alert("Error", "No se pudieron obtener los tipos de cambio. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Función para convertir el monto ingresado a todas las monedas
  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Error", "Por favor, ingresa una cantidad válida.");
      return;
    }

    if (!rates[fromCurrency]) {
      Alert.alert("Error", "Moneda de origen no soportada.");
      return;
    }

    const amountInUSD = parseFloat(amount) / rates[fromCurrency];
    const newConvertedValues: { [key: string]: string } = {};

    currencies.forEach((currency) => {
      if (rates[currency]) {
        newConvertedValues[currency] = (amountInUSD * rates[currency]).toFixed(2);
      }
    });

    setConvertedValues(newConvertedValues);
  };

  return (
    <View style={[MainStyles.container, isDarkMode ? MainStyles.darkContainer : null]}>
      <Text style={[MainStyles.title, isDarkMode ? MainStyles.darkTitle : null]}>
        Currency Exchange
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? "#FFF" : "#000"} />
      ) : (
        <>
          <View style={[MainStyles.inputContainer, isDarkMode ? MainStyles.darkInputContainer : null]}>
            <Icon name="money-bill" size={20} color={isDarkMode ? "#FFF" : "#000"} style={MainStyles.icon} />
            <TextInput
              style={[MainStyles.input, isDarkMode ? MainStyles.darkInput : null]}
              placeholder="Enter amount"
              placeholderTextColor={isDarkMode ? "#BBB" : "#666"}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Botón para realizar la conversión */}
          <TouchableOpacity
            style={[MainStyles.button, isDarkMode ? MainStyles.darkButton : null]}
            onPress={convertCurrency}
          >
            <Text style={[MainStyles.buttonText, isDarkMode ? MainStyles.darkButtonText : null]}>
              Convert to All
            </Text>
          </TouchableOpacity>

          {/* Resultados de la conversión */}
          {Object.keys(convertedValues).length > 0 && (
           <View style={[
            MainStyles.resultsContainer, 
            isDarkMode ? MainStyles.darkResultsContainer : null
          ]}>
            <Text style={[
              MainStyles.resultTitle, 
              isDarkMode ? MainStyles.darkResultTitle : null
            ]}>
              Converted Amounts:
            </Text>
          
            {currencies.map((currency) => (
              <View key={currency} style={MainStyles.resultRow}>
                <Text style={[
                  MainStyles.resultText, 
                  isDarkMode ? MainStyles.darkResultText : null
                ]}>
                  {currency}:
                </Text>
                <Text style={[
                  MainStyles.resultValue, 
                  isDarkMode ? MainStyles.darkResultValue : null
                ]}>
                  {convertedValues[currency]}
                </Text>
              </View>
            ))}
          </View>
          )}
        </>
      )}
    </View>
  );
};

export default CurrencyScreen;
