import { StyleSheet } from "react-native";

const MainStyles = StyleSheet.create({

  // NAVBAR STYLES
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9',
    position: 'absolute',
    bottom: 0, // Asegura que esté al fondo de la pantalla
    width: '100%', // Se ajusta al ancho de la pantalla
    paddingBottom: 10,
    paddingTop: 5,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'System', // Fuente para apariencia consistente
  },
  activeNavText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  inactiveNavText: {
    color: '#bcbcbc',
    fontWeight: '400',
  },
  activeIcon: {
    color: '#007AFF',
  },
  inactiveIcon: {
    color: '#bcbcbc',
  },

  
  //
  mainContainer: {
    width: 402,
    height: 870,
    backgroundColor: "#fff",
    marginHorizontal: "auto",
    overflow: "hidden",
  },
  logoContainer: {
    width: 28,
    height: 28,
    backgroundColor: "#ccc",
    marginTop: 74,
    marginLeft: 23,
  },

  // LOGIN SCREEN
  logoContainer: {
    width: "50%", // Ajusta el tamaño al 50% del ancho de la pantalla
    aspectRatio: 1, // Mantiene proporción 1:1 para evitar deformaciones
    backgroundColor: "#ffffff", // Fondo blanco puro opcional
    alignSelf: "center", // Centra horizontalmente
    marginTop: 50, // Espacio superior ajustado para mantener el logo dentro de la pantalla
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  logoIcon: {
    width: "100%", // La imagen ocupa todo el ancho del contenedor
    height: "100%", // La imagen ocupa todo el alto del contenedor
    resizeMode: "contain", // Asegura que no se deforme
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "98%", // Asegura el ancho total del contenedor
    paddingHorizontal: 15, // Añade algo de espacio a los lados
  },
  
  continueSIButton: {
    flex: 1, // Esto hará que cada botón tome el mismo ancho dentro del contenedor
    height: 50,// Ajusta el ancho al 48% del contenedor
    backgroundColor: "#0373f3",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5, // Espacio entre botones
  },

  titleL: {
    fontSize: 30,
    fontWeight: "600",
    color: "#1f1f1f",
    marginTop: 20,
    alignSelf: "center",
  },
  inputContainer: {
    width: 340,
    height: 50,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    marginTop: 18,
    marginLeft: 24,
    position: "relative",
    flexDirection: "row", // Alineación horizontal
    alignItems: "center", // Centrar el ícono y el campo de texto
    paddingHorizontal: 40,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  inputIcon: {
    position: "absolute",
    top: 14,
    left: 18,
    width: 22,
    height: 22,
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
    width: 403,
    height: 24,
  },
  divider: {
    width: 122,
    height: 1,
    backgroundColor: "#e8e8e8",
  },
  orText: {
    fontSize: 16,
    color: "#000",
  },
  appleButton: {
    width: 310,
    height: 54,
    backgroundColor: "#1f1f1f",
    borderRadius: 36,
    marginTop: 37,
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookButton: {
    width: 310,
    height: 54,
    backgroundColor: "#3b5896",
    borderRadius: 36,
    marginTop: 21,
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButton: {
    width: 310,
    height: 54,
    backgroundColor: "#fff9f9",
    borderRadius: 36,
    marginTop: 18,
    marginLeft: 24,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  buttonTextCwA: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextCwF: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  continueButton: {
    width: 340,
    height: 54,
    backgroundColor: "#0373f3",
    borderRadius: 36,
    marginTop: 45,
    marginLeft: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  // Estilos nuevos para SingInScreen
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 24,
  },
  termsText: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
  },
  termsLink: {
    color: "#0373f3",
    textDecorationLine: "underline",
  },
  signUpTitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#1f1f1f",
    marginTop: 20,
    alignSelf: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "white",
    borderRadius: 3,
    marginLeft: 8,
  },
  checkboxSelected: {
    backgroundColor: "#0373f3",
  }, 
  // boton sing in 
    
    container: {
      width: "100%", // Ancho completo del contenedor
      backgroundColor: "#4CAF50", // Color de fondo (verde en este caso)
      paddingVertical: 12, // Espaciado vertical interno
      borderRadius: 8, // Bordes redondeados
      alignItems: "center", // Centrar contenido horizontalmente
      marginTop: 10, // Espaciado superior
    },
    text: {
      color: "#fff", // Texto en blanco
      fontSize: 16, // Tamaño de fuente
      fontWeight: "bold", // Negrita
    },
    inputContainer: {
      width: "90%", // Se adapta al tamaño de la pantalla
      height: 50,
      borderRadius: 36,
      borderWidth: 1,
      borderColor: "#e9e9e9",
      marginTop: 18,
      alignSelf: "center", // Centrado en la pantalla
      flexDirection: "row", // Elementos en la misma línea
      alignItems: "center", // Alineados verticalmente
      paddingHorizontal: 15, // Espacio dentro del input
      backgroundColor: "#FFF", // Fondo blanco para visibilidad
    },
    
    textInput: {
      flex: 1, // Ocupa todo el espacio disponible
      height: "100%",
      fontSize: 16,
      color: "#000",
      paddingLeft: 45, // Espacio para el ícono de la izquierda
    },
    
    inputIcon: {
      position: "absolute",
      left: 15, // Ubicado en el lado izquierdo dentro del input
      zIndex: 10, // Para asegurarse de que esté encima del input
    },
    
    eyeIconContainer: {
      position: "absolute",
      right: 15, // Ubicado en el lado derecho dentro del input
      zIndex: 10,
    },
  

  //HoME SCREEN
  containerHS: {
    width: 404,
    height: 874,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 0,
    marginHorizontal: 'auto',
  },
  headerContainerHS: {
    width: 364,
    height: 66,
    position: 'relative',
    zIndex: 44,
    marginTop: 50,
    marginLeft: 20,
  },
  headerIconHS: {
    width: 70,
    height: 66,
    position: 'absolute',
    top: 0,
    left: 294,
    zIndex: 44,
  },
  headerTextHS: {
    width: 253,
    height: 48,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#818181',
    position: 'absolute',
    top: 10,
    textAlign: 'center',
  },
  headerImageHS: {
    width: 70,
    height: 66,
    position: 'relative',
    left: 280,
  },
  titleTextHS: {
    height: 39,
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 50,
    color: '#000000',
    position: 'relative',
    marginLeft: 15.893,
  },
  searchContainerHS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  searchIconHS: {
    width: 52,
    height: 52,
    position: 'absolute',
    top: 0,
    left: 304,
    zIndex: 19,
  },
  searchBoxHS: {
    width: 305,
    height: 48,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    position: 'absolute',
    top: 1,
    left: 0,
    zIndex: 13,
  },
  searchPlaceholderHS: {
    height: 24,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#a9a9a9',
    position: 'absolute',
    top: 11,
    left: 52,
  },
  searchImageHS: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
    left: 17,
  },
  searchButtonHS: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 15,
    left: 318,
  },
  sectionTitleHS: {
    height: 50,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 50,
    color: '#000000',
    marginTop: 10,
    marginLeft: 25.893,
  },
  sectionTitleOtherHS: {
    height: 50,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 50,
    color: '#000000',
    marginTop: -70,
    marginLeft: 25.893,
  },
  popularFestivityHS: {
    width: 230,
    height: 138,
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 20,
  },
  popularFestivityDetailsHS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 120,
    marginLeft: 18,
  },
  dateTextHS: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#ffffff',
  },
  ratingContainerHS: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTextHS: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#ffffff',
    marginRight: 5,
  },
  ratingIconHS: {
    marginRight: 5,
  },
  otherFestivitiesContainerHS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 120,
    marginLeft: 20,
  },
  otherFestivityHS: {
    width: 146,
    height: 230,
    marginRight: 10, // Aumentado para mayor separación 
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 15,
  },
  otherFestivityTitleHS: {
    fontFamily: 'Andika',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  otherFestivityDateHS: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#ffffff',
    marginTop: 180,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInputHS: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
    left: 40,
  },
  filterButtonHS: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF', // Azul del botón de filtro
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 315,
    top: 5,
  },
  // homescreen recuadros 
  horizontalScrollHS: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  popularFestivityHS: {
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  popularFestivityTextHS: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },


  //EVENT SCREEN
  safeAreaES: {
    flex: 1,
  },
  eventContainerES: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 60,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backgroundImageES: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButtonES: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  mainImageES: {
    position: "absolute", // Asegura que la imagen esté detrás de todo el contenido
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  eventTitleES: {
    fontSize: 32,
    fontFamily: "Andika",
    fontWeight: "400",
    color: "#fff",
    marginTop: 450,
    marginLeft: 20,
  },
  eventDescriptionES: {
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#fff",
    lineHeight: 21,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  reviewContainerES: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  ratingContainerES: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIconES: {
    marginRight: 5,
  },
  ratingTextES: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#fff",
    marginLeft: 10,
  },
  reviewTextES: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 10,
  },
  seeReviewsTextES: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#fff",
    marginLeft: 20,
    textDecorationLine: "underline",
  },
  buttonContainerES: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  primaryButtonES: {
    width: "48%",
    height: 40,
    backgroundColor: "#0373f3",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonTextES: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#fff",
  },
  secondaryButtonES: {
    width: "48%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryButtonTextES: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#000",
  },

  //MAP SCREEN
  safeAreaMS: {
    flex: 1,
  },
  mapContainerMS: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    top: -30,
  },
  headerContainerMS: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButtonMS: {
    top: 40,
    zIndex: 10,
    width: 40,
    height: 40,
    right: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBoxMS: {
    width: 290,
    height: 48,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#adadad',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 13,
  },
  textInputMS: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
    left: 40,
  },
  filterButtonMS: {
    top: 40,
    width: 40,
    height: 40,
    backgroundColor: "#0373f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    left: 40,
  },
  locationTitleMS: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    right: 20,
    marginTop: 370,
  },
  locationsContainerMS: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: -6,
    right: 40,
    height: "33%",
  },
  locationCardMS: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
    width: '50%',
    marginVertical: 8,
    justifyContent: "space-between",
  },
  locationImageMS: {
    width: '90%',
    height: 80,
    left: 10,
    top: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  locationDetailsMS: {
    padding: 12,
  },
  locationTitleTextMS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    top: -25,
  },
  ratingContainerMS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    top: -25,
  },
  priceTextMS: {
    fontSize: 14,
    color: '#aeaeae',
    top: -25,
  },
  footerContainerMS: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    backgroundColor: "#fff",
  },
  footerItemMS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTextMS: {
    fontSize: 12,
    color: "#bcbcbc",
    marginTop: 4,
  },
  activeFooterItemMS: {
    backgroundColor: "#e6f0ff",
    borderRadius: 20,
  },
  activeFooterTextMS: {
    color: "#0373f3",
  },
  mapViewMS: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute', // Asegura que el mapa ocupe toda la pantalla como fondo
    zIndex: -1, // Coloca el mapa detrás de los otros elementos
  },
  scrollContainerMS: {
    flex: 1,
    backgroundColor: 'transparent', // Asegura que el fondo sea visible
    padding: 16,
  },
  overlayContainerMS: {
    flex: 1,
    justifyContent: 'flex-end', // Asegura que el contenido se posicione en la parte inferior
    paddingHorizontal: 16,
    paddingBottom: 50, // Espacio para el footer // Fondo translúcido sobre el mapa
    borderTopLeftRadius: 20, // Bordes redondeados para el diseño
    borderTopRightRadius: 20,
  },
  
  //SCHEDULE SCREEN
  safeAreaSS: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewSS: {
    paddingHorizontal: 16,
  },
  containerSS: {
    flex: 1,
    paddingBottom: 20,
  },
  greetingTextSS: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6c6c6c",
    marginTop: 60,
    marginLeft: 10,
  },
  mainTitleSS: {
    fontSize: 26,
    fontWeight: "600",
    color: "#000",
    marginVertical: 5,
    marginLeft: 10,
  },
  profileIconSS: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    right: 16,
    top: 80,
  },
  sectionTitleSS: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginTop: 40,
    marginLeft: 10,
  },
  mainImageSS: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
  },
  overlayContainerSS: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  locationTextSS: {
    fontSize: 14,
    color: "#fff",
    marginRight: 'auto',
    left: 10,
  },
  buttonContainerSS: {
    backgroundColor: "#0373f3",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 140,
  },
  buttonTextSS: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  scheduleContainerSS: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  scheduleHeaderSS: {
    alignItems: "center",
    marginBottom: 10,
  },
  dragIndicatorSS: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginBottom: 10,
    alignSelf: "center"
  },
  scheduleTitleSS: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  scheduleItemSS: {
    flexDirection: "row",
    marginVertical: 5,
    top: 15,
  },
  timeTextSS: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginRight: 10,
  },
  timelineSS: {
    width: 2,
    height: 50,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  timelineActiveSS: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#0373f3",
    borderWidth: 3,
    position: "absolute",
    top: -10,
    left: -9,
  },
  timelineInactiveSS: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: "#ccc",
    position: "absolute",
    top: -7.5,
    left: -6,
  },
  locationNameSS: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  dateTextSS: {
    fontSize: 14,
    color: "#6c6c6c",
    left: 20,
  },
  scheduleIconSS: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    left: 20,
    top: 10,
  },
  weatherIconSS: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    left: 70,
    top: 10,
  },
  weatherTextSS: {
    fontSize: 14,
    color: "#0373f3", // Azul para el texto del clima
    right: -20,
    fontWeight: "500",
    top: -5,
  },
  
  errorTextSS: {
    fontSize: 14,
    color: "red", // Rojo para errores
    marginLeft: 5, // Separación del ícono
    fontWeight: "500",
  },
  

  //CALENDAR SCREEN
  containerCS: {
    width: 404,
    height: 874,
    backgroundColor: '#ffffff',
    marginHorizontal: 'auto',
    top: -60,
  },
  headerCS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 71,
    marginHorizontal: 18,
  },
  backButtonCS: {
    width: 28,
    height: 28,
  },
  headerTextCS: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 33,
    color: '#000',
    right: 150,
  },
  imageBannerCS: {
    width: 345,
    height: 92,
    borderRadius: 4,
    marginTop: 5,
    marginHorizontal: 20,
  },
  eventTitleCS: {
    fontFamily: 'Andika',
    fontSize: 24,
    lineHeight: 38,
    color: '#fff',
    position: 'absolute',
    top: 42,
    left: 11,
  },
  calendarHeaderCS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 27,
    marginHorizontal: 24,
  },
  calendarTitleCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  monthTextCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  calendarCS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    marginHorizontal: 24,
  },
  dateCS: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#a5a5a5',
  },
  shareTitleCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginHorizontal: 25,
    color: '#000',
  },
  contactInputCS: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: 25,
    marginTop: 9,
    marginHorizontal: 24,
    padding: 10,
    width: 350,
  },
  selectContactCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#a9a9a9',
  },
  sendEmailCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 20,
    marginHorizontal: 24,
    color: '#1e1e1e',
  },
  buttonCS: {
    backgroundColor: '#0373f3',
    borderRadius: 36,
    marginTop: 10,
    marginHorizontal: 20,
    height: 54,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextCS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    justifyContent: 'center',
  },

  // ACCOUNT SCREEN
  containerAS: {
    width: 404,
    height: 874,
    backgroundColor: '#ffffff',
    marginTop: 0,
    marginHorizontal: 'auto',
  },
  headerAS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 71,
    marginHorizontal: 18,
  },
  backButtonAS: {
    width: 28,
    height: 28,
  },
  titleTextAS: {
    fontSize: 24, // Tamaño del texto del título
    fontWeight: 'bold', // Negrita para el título
    color: '#000', // Color del texto
    textAlign: 'center', // Centrar el texto horizontalmente
    marginVertical: 8, // Reducir el margen vertical
    marginTop: -75,
  },
  subTitleTextAS: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  opTextAS: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 45,
    marginHorizontal: 24,
    color: '#1e1e1e',
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  opButtonAS: {
    width: 28,
    height: 28,
    top: 40,
    left: '150',
  },
  

  //HISTORY SCREEN
  safeAreaHiS: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerHiS: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerHiS: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButtonHiS: {
    padding: 8,
  },
  headerTextHiS: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  filterScrollHiS: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  cityFilterHiS: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  cityFilterActiveHiS: {
    backgroundColor: '#0373F3',
  },
  cityFilterTextHiS: {
    fontSize: 14,
    color: '#666666',
  },
  cityFilterTextActiveHiS: {
    color: '#FFFFFF',
  },
  dayTabsContainerHiS: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  dayTabHiS: {
    marginRight: 24,
  },
  dayTabActiveHiS: {
    borderBottomWidth: 2,
    borderBottomColor: '#0373F3',
  },
  dayTabTextHiS: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 8,
  },
  timelineContainerHiS: {
    paddingHorizontal: 16,
  },
  destinationItemHiS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  timelineLeftHiS: {
    alignItems: 'center',
    width: 60,
  },
  timeTextHiS: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  timelineDotHiS: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  visitedDotHiS: {
    backgroundColor: '#0373F3',
    borderColor: '#0373F3',
  },
  unvisitedDotHiS: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
  },
  destinationContentHiS: {
    flex: 1,
    marginLeft: 12,
  },
  destinationNameHiS: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  destinationLocationHiS: {
    fontSize: 14,
    color: '#666666',
  },
  mapIconHiS: {
    marginLeft: 16,
  },
  buttonHiS: {
    backgroundColor: '#0373F3',
    borderRadius: 28,
    marginHorizontal: 16,
    marginVertical: 24,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextHiS: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  //NOTIFICATIONS SCREEN
  containerNS: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewNS: {
    flex: 1,
  },
  headerNS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonNS: {
    padding: 8,
  },
  titleTextNS: {
    fontSize: 24,
    fontWeight: "600",
  },
  viewAllTextNS: {
    fontSize: 14,
    color: "#007AFF",
  },
  festivalContainerNS: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconContainerNS: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#cefffe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainerNS: {
    flex: 1,
  },
  mainContentNS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nameAndDateNS: {
    flex: 1,
  },
  festivalNameNS: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  festivalDateNS: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainerNS: {
    alignItems: 'flex-end',
  },
  ratingLabelNS: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  starsContainerNS: {
    flexDirection: 'row',
  },
  festivalDescriptionNS: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  starNS: {
    color: '#00CEC9',
    fontSize: 16,
    marginLeft: 2,
  },
  inactiveStarNS: {
    color: '#e0e0e0',
    fontSize: 16,
    marginLeft: 2,
  },
  // TermsscreenStyles 
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Se asegura que el título esté centrado
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  //  HelpCenterStyles 
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  //AccountStyles 
  buttonContainerASS: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  iconTextContainerASS: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTextASS: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "400",
  },
  separatorASS: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
  },
  safeAreaASS: {
    flex: 1,
  },
  containerASS: {
    flex: 1,
  },
  headerASS: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonASS: {
    padding: 8,
  },
  titleTextASS: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: -10,
    textAlign: 'center',
    width: '100%',
  },

  //ADMIN SCREEN
  safeAreaADS: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  containerADS: { 
    padding: 16,
  },
  titleADS: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitleADS: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 10
  },
  horizontalScrollADS: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 160 // Altura fija para los cards
  },
  popularFestivityADS: {
    width: 280,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: 'space-between'
  },
  popularFestivityTextADS: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  searchSectionADS: {
    marginVertical: 1
  },
  searchContainerADS: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  searchInputADS: { 
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff'
  },
  buttonnADS: {
    backgroundColor: '#0373F3',
    borderRadius: 20,
    height: 40,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextADS: {
    color: '#fff',
    fontWeight: '600'
  },
  tableContainerADS: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    minWidth: 600,
  },
  tableHeaderADS: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4",
    padding: 12,
  },
  tableHeaderTextADS: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
    textAlign: "center"
  },
  tableRowADS: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  eventImageADS: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  tableTextADS: {
    flex: 1,
    textAlign: "center",
    fontSize: 14
  },
  actionsContainerADS: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButtonADS: {
    padding: 10,
  },
  popularFestivityDetailsADS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  dateTextADS: {
    color: '#fff',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  ratingContainerADS: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingTextADS: {
    color: '#fff',
    marginRight: 5,
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  ratingIconADS: {
    marginRight: 5,
  },

  //ADD FESTIVITY SCREEN
  safeAreaAFS: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewAFS: {
    flex: 1,
  },
  containerAFS: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  titleAFS: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  labelAFS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputAFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  textAreaAFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerAFS: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imagePreviewAFS: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholderAFS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderTextAFS: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  buttonContainerAFS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 20,
  },
  cancelButtonAFS: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 36,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonTextAFS: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  createButtonAFS: {
    flex: 1,
    backgroundColor: '#0373F3',
    padding: 15,
    borderRadius: 36,
    marginLeft: 10,
    alignItems: 'center',
  },
  createButtonTextAFS: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateContainerAFS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputAFS: {
    flex: 1,
    marginRight: 5,
  },
  datePickerFieldAFS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationInputAFS: {
    position: 'relative',
    width: '100%',
  },
  iconInputAFS: {
    position: 'absolute',
    right: 15,
  },
  inputWithIconAFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingLeft: 50, // Espacio para el ícono a la izquierda
    paddingRight: 15, 
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconInsideInputAFS: {
    position: 'absolute',
    left: 15, // Coloca el ícono dentro del input
    top: 15,
  },
  festivalTypeContainerAFS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerContainerAFS: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
  },
  pickerAFS: {
    height: 50,
  },
  addTypeButtonAFS: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainerAFS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationDropdownContainerAFS: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdownContainerAFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },

  //EDIT EVENT SCREEN
  safeAreaEFS: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewEFS: {
    flex: 1,
  },
  containerEFS: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    top: 40,
  },
  titleEFS: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  labelEFS: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputEFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  textAreaEFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  imagePickerEFS: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imagePreviewEFS: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholderEFS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderTextEFS: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  buttonContainerEFS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 20,
  },
  cancelButtonEFS: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 36,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonTextEFS: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButtonEFS: {
    flex: 1,
    backgroundColor: '#00CEC9',
    padding: 15,
    borderRadius: 36,
    marginLeft: 10,
    alignItems: 'center',
  },
  updateButtonTextEFS: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateContainerEFS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputEFS: {
    flex: 1,
    marginRight: 5,
  },
  datePickerFieldEFS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationInputEFS: {
    position: 'relative',
    width: '100%',
  },
  iconInputEFS: {
    position: 'absolute',
    right: 15,
  },
  inputWithIconEFS: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingLeft: 50, // Espacio para el ícono a la izquierda
    paddingRight: 15, 
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconInsideInputEFS: {
    position: 'absolute',
    left: 15, // Coloca el ícono dentro del input
    top: 15,
  },
// profile


  // Contenedor principal
  containerPS: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  darkContainerPS: { 
    backgroundColor: "#121212", // Un negro menos agresivo
  },
  scrollViewPS: {
    flex: 1,
    paddingHorizontal: 23,
    padding: 20,
  },

  // Header y perfil
  profileHeaderPS: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfoPS: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  profileNamePS: {
    color: "#000000",
    fontSize: 26,
    textAlign: "center",
  },
  darkTextPS: { 
    color: "#FFFFFF", // Mejor contraste en modo oscuro
  },

  // Imagen de perfil y cámara
  profileImageContainerPS: { 
    position: "relative", 
    alignItems: "center", 
    justifyContent: "center", 
  },
  profileImagePS: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainerPS: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 5,
  },

  // Estilos de etiqueta (Nick name, Email, Password)
  labelPS: {
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "#333" 
  },
  darkLabelPS: { 
    color: "#ddd" // Texto gris claro para modo oscuro
  },

  // Inputs
  inputContainerPS: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E9E9E9",
    borderRadius: 36,
    borderWidth: 1,
    paddingHorizontal: 19,
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
  },
  darkInputContainerPS: { 
    backgroundColor: "#333", // En lugar de negro puro
    borderColor: "#555", // Borde más visible
  },
  inputPS: { 
    flex: 1, 
    fontSize: 16, 
    color: "#000" 
  },
  darkInputPS: { 
    color: "#FFF" // Mejor legibilidad en modo oscuro
  },

  // Botón de guardar
  saveButtonPS: {
    alignItems: "center",
    backgroundColor: "#0373F3",
    borderRadius: 36,
    paddingVertical: 19,
  },
  darkButtonPS: { 
    backgroundColor: "#0044CC" // Azul más oscuro en modo dark
  },
  saveButtonTextPS: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  darkButtonTextPS: { 
    color: "#FFF" 
  },
// visited destinations 


  safeAreaHiS: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  darkSafeAreaHiS: {
    backgroundColor: "#121212",
  },
  containerHiS: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  darkContainerHiS: {
    backgroundColor: "#121212",
  },

  // **FILTRO DE CIUDADES**
  cityFilterContainerHiS: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
  cityFilterHiS: {
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  darkCityFilterHiS: {
    backgroundColor: "#333",
    borderColor: "#555",
  },
  cityFilterTextHiS: {
    fontSize: 14,
    color: "#000",
  },
  darkCityFilterTextHiS: {
    color: "#FFF",
  },

  // **TABS DE DÍAS**
  dayTabsContainerHiS: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 15,
  },
  darkDayTabsContainerHiS: {
    backgroundColor: "transparent",
  },
  dayTabHiS: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#EAEAEA",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  darkDayTabHiS: {
    backgroundColor: "#555",
    borderColor: "#777",
  },
  dayTabTextHiS: {
    fontSize: 14,
    color: "#000",
  },
  darkDayTabTextHiS: {
    color: "#FFF",
  },

  // **LÍNEA DE TIEMPO DESTINOS**
  timelineContainerHiS: {
    marginTop: 20,
  },
  destinationItemHiS: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  darkDestinationItemHiS: {
    backgroundColor: "#333",
    borderColor: "#555",
    borderWidth: 1,
  },
  destinationContentHiS: {
    flex: 1,
  },
  destinationNameHiS: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  darkDestinationNameHiS: {
    color: "#FFF",
  },
  destinationLocationHiS: {
    fontSize: 14,
    color: "#666",
  },
  darkDestinationLocationHiS: {
    color: "#CCC",
  },

  // **HORA DEL DESTINO**
  timeTextHiS: {
    fontSize: 14,
    color: "#666",
  },
  darkTimeTextHiS: {
    color: "#BBB",
  },

  // **INDICADOR DE VISITADO/NO VISITADO**
  timelineDotHiS: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    marginTop: 5,
  },
  visitedDotHiS: {
    backgroundColor: "#28A745",
  },
  unvisitedDotHiS: {
    backgroundColor: "#DC3545",
  },

  // **BOTÓN PRINCIPAL**
  buttonHiS: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  darkButtonPS: {
    backgroundColor: "#005FCC",
  },
  buttonTextHiS: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  darkButtonTextPS: {
    color: "#FFF",
  },

  // **HEADER**
headerHiS: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 15,
  paddingHorizontal: 10,
},
headerTextHiS: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#000",
},
darkHeaderTextHiS: {
  color: "#FFF", // Para que el texto del header sea blanco en modo oscuro
},
// **FILTRO DE CIUDADES**
filterScrollHiS: {
  paddingVertical: 10,
  backgroundColor: "#F5F5F5", // Color claro en modo normal
},
darkFilterScrollHiS: {
  backgroundColor: "#222", // Fondo oscuro en modo oscuro
},

//currency
  
currencyScrollCCS: {
  flexDirection: "row",
  marginVertical: 10,
},
currencyButtonCCS: {
  backgroundColor: "#EAEAEA",
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderRadius: 20,
  marginHorizontal: 5,
},
darkCurrencyButtonCCS: {
  backgroundColor: "#333", // Fondo oscuro en modo dark
},
currencyButtonActiveCCS: {
  backgroundColor: "#007AFF", // Color azul cuando está activo
},
currencyButtonTextCCS: {
  fontSize: 14,
  color: "#000",
},
darkCurrencyButtonTextCCS: {
  color: "#FFF", // Texto blanco en modo oscuro
},
currencyButtonTextActiveCCS: {
  color: "#FFF", // Texto blanco cuando está seleccionado
},
labelCCS: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000", // Color en modo claro
  marginBottom: 5,
},
darkLabelCCS: {
  color: "#FFF", // Color blanco en modo oscuro
},

// currencyyyyy 
containerCCS: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  backgroundColor: "#FFFFFF",
},
darkContainerCCS: {
  backgroundColor: "#000000",
},

// **TÍTULO**
titleCCS: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
  color: "#000",
},
darkTitleCCS: {
  color: "#FFFFFF",
},

// **INPUT DE MONTO**
inputContainerCCS: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: 10,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "#ccc",
  backgroundColor: "#F5F5F5",
  marginBottom: 15,
},
darkInputContainerCCS: {
  borderColor: "#555",
  backgroundColor: "#222",
},
inputCCS: {
  flex: 1,
  height: 40,
  fontSize: 16,
  color: "#000",
},
darkInputCCS: {
  color: "#FFF",
},
iconCCS: {
  marginRight: 10,
},

// **BOTÓN PRINCIPAL**
buttonCCS: {
  width: "100%",
  paddingVertical: 15,
  borderRadius: 10,
  backgroundColor: "#007AFF",
  alignItems: "center",
  marginBottom: 15,
},
darkButtonCCS: {
  backgroundColor: "#444",
},
buttonTextCCS: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
},
darkButtonTextCCS: {
  color: "#FFFFFF",
},

// **RESULTADOS DE CONVERSIÓN**
resultsContainerCCS: {
  width: "100%",
  padding: 15,
  borderRadius: 10,
  backgroundColor: "#EAEAEA",
  marginTop: 15,
},
darkResultsContainerCCS: {
  backgroundColor: "#333",
},
resultTitleCCS: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
  color: "#000",
},
darkResultTitleCCS: {
  color: "#FFF",
},
resultRowCCS: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 5,
},
resultTextCCS: {
  fontSize: 16,
  color: "#000",
},
darkResultTextCCS: {
  color: "#FFF",
},
resultValueCCS: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
},
darkResultValueCCS: {
  color: "#FFF",
},
resultsContainerCCS: {
  width: "100%",
  padding: 15,
  borderRadius: 10,
  backgroundColor: "#EAEAEA", // Fondo claro en modo normal
  marginTop: 15,
},
darkResultsContainerCCS: {
  backgroundColor: "#222", // Cambia el fondo a un tono oscuro
  borderWidth: 1,
  borderColor: "#444",
},
resultTitleCCS: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
  color: "#000",
},
darkResultTitleCCS: {
  color: "#FFF",
},
resultRowCCS: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 5,
},
resultTextCCS: {
  fontSize: 16,
  color: "#000",
},
darkResultTextCCS: {
  color: "#FFF",
},
resultValueCCS: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
},
darkResultValueCCS: {
  color: "#FFF",
},

//ADD EVENT SCREEN
safeAreaAEFS: {
  flex: 1,
  backgroundColor: '#fff',
},
scrollViewAEFS: {
  flex: 1,
},
containerAEFS: {
  flex: 1,
  padding: 15,
  backgroundColor: '#fff',
},
titleAEFS: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#333',
},
labelAEFS: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 8,
},
inputAEFS: {
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  fontSize: 16,
},
textAreaAEFS: {
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  fontSize: 16,
  height: 100,
  textAlignVertical: 'top',
},
buttonContainerAEFS: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  paddingBottom: 20,
},
cancelButtonAEFS: {
  flex: 1,
  backgroundColor: '#f5f5f5',
  padding: 15,
  borderRadius: 36,
  marginRight: 10,
  alignItems: 'center',
},
cancelButtonTextAEFS: {
  color: '#666',
  fontSize: 16,
  fontWeight: '600',
},
createButtonAEFS: {
  flex: 1,
  backgroundColor: '#0373F3',
  padding: 15,
  borderRadius: 36,
  marginLeft: 10,
  alignItems: 'center',
},
createButtonTextAEFS: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
dateContainerAEFS: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
dateInputAEFS: {
  flex: 1,
  marginRight: 5,
},
datePickerFieldAEFS: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 15,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  marginRight: 5,  // margen para separar del timePicker
},
dateTimeContainerAEFS: {
  flexDirection: 'row',
  marginBottom: 20,
},
timePickerFieldAEFS: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 15,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  marginLeft: 5,  // margen para separar del datePicker
},

});

export default MainStyles;
