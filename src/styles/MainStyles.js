import { StyleSheet } from "react-native";

const MainStyles = StyleSheet.create({

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

//log
mainContainer: {
  flex: 1, // Asegura que ocupe todo el espacio disponible
  backgroundColor: "#ffffff", // Fondo blanco puro
  justifyContent: "center", // Centra el contenido verticalmente
  alignItems: "center", // Centra el contenido horizontalmente
  paddingTop: 5, // Espacio adicional en la parte superior
  paddingBottom: 10, // Espacio adicional en la parte inferior
},

logoContainer: {
  width: "50%", // Ajusta el tamaño al 50% del ancho de la pantalla
  aspectRatio: 1, // Mantiene proporción 1:1 para evitar deformaciones
  backgroundColor: "#ffffff", // Fondo blanco puro opcional
  alignSelf: "center", // Centra horizontalmente
  marginTop: 20, // Espacio superior ajustado para mantener el logo dentro de la pantalla
},

logoIcon: {
  width: "100%", // La imagen ocupa todo el ancho del contenedor
  height: "100%", // La imagen ocupa todo el alto del contenedor
  resizeMode: "contain", // Asegura que no se deforme
},
continueSIButton: {
  width: 340,
  height: 54,
  backgroundColor: "#0373f3",
  borderRadius: 36,
  marginTop: 30, // Reducido para que sea visible
  alignItems: "center",
  justifyContent: "center",
},

  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 27,
    marginLeft: 24,
    color: "#1f1f1f",
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
    width: 340,
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
    width: 340,
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
    width: 340,
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
  buttonText: {
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
  continueSIButton: {
    width: 340,
    height: 54,
    backgroundColor: "#0373f3",
    borderRadius: 36,
    marginTop: 20, // Reducido para posicionarlo mejor
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
    marginLeft: 24,
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
    marginTop: 56.377,
    marginLeft: 20.893,
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
    top: 4,
    left: 0,
    zIndex: 11,
    textAlign: 'left',
  },
  headerImageHS: {
    width: 70,
    height: 66,
    position: 'relative',
    marginTop: 0,
    marginLeft: 'auto',
  },
  titleTextHS: {
    height: 39,
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 39,
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
    height: 27,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
    marginTop: 43,
    marginLeft: 20.893,
  },
  popularFestivityHS: {
    width: 230,
    height: 138,
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 20,
  },
  popularFestivityTextHS: {
    height: 35,
    fontFamily: 'Andika',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 35,
    color: '#ffffff',
    marginTop: 67,
    marginLeft: 18,
  },
  popularFestivityDetailsHS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    marginTop: 14,
    marginLeft: 20,
  },
  otherFestivityHS: {
    width: 146,
    height: 230,
    borderRadius: 15,
  },
  otherFestivityTitleHS: {
    fontFamily: 'Andika',
    fontSize: 14,
    color: '#ffffff',
    marginTop: 128,
    marginLeft: 8,
  },
  otherFestivityDateHS: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#ffffff',
    marginTop: 8,
    marginLeft: 34,
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

  //EVENT SCREEN
  safeAreaES: {
    flex: 1,
  },
  eventContainerES: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
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
    marginTop: 630,
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
    height: 50,
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
    height: 50,
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
    backgroundColor: "#fff",
  },
  mapContainerMS: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  headerContainerMS: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButtonMS: {
    top: 10,
    zIndex: 10,
    width: 40,
    height: 40,
    right: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarMS: {
    width: 280,
    height: 48,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#adadad',
    backgroundColor: '#fff',
    position: 'relative',
    top: 10,
    zIndex: 1,
    left: -40,
  },
  searchIconMS: {
    position: "absolute",
    top: 14,
    left: 18,
    width: 22,
    height: 22,
  },
  searchTextMS: {
    fontSize: 16,
    color: "#aeaeae",
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
    left: 40,
    top: 17,
  },
  filterButtonMS: {
    top: 10,
    width: 40,
    height: 40,
    backgroundColor: "#0373f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    right: 30,
  },
  locationTitleMS: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    paddingHorizontal: 16,
    marginTop: 520,
  },
  locationsContainerMS: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  locationCardMS: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  locationImageMS: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  locationTitleTextMS: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  ratingContainerMS: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  priceTextMS: {
    fontSize: 14,
    color: "#aeaeae",
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
    left: 30,
    top: 10,
  },
  

  //CALENDAR SCREEN
  containerCS: {
    width: 404,
    height: 874,
    backgroundColor: '#ffffff',
    marginTop: 0,
    marginHorizontal: 'auto',
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
    marginTop: 39,
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
    marginTop: 38,
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
    marginTop: 31,
    marginHorizontal: 24,
    color: '#1e1e1e',
  },
  buttonCS: {
    backgroundColor: '#0373f3',
    borderRadius: 36,
    marginTop: 34,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
  containerHS: {
    width: 404,
    height: 874,
    backgroundColor: '#ffffff',
    marginTop: 0,
    marginHorizontal: 'auto',
  },
  headerHS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 71,
    marginHorizontal: 18,
  },
  backButtonHS: {
    width: 28,
    height: 28,
  },
  headerTextHS: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 33,
    color: '#000',
    right: 100,
  },
  buttonHS: {
    backgroundColor: '#0373f3',
    borderRadius: 36,
    marginTop: 34,
    marginHorizontal: 20,
    height: 54,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextHS: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    justifyContent: 'center',
  },

  //NOTIFICATIONS SCREEN
  containerNS: {
    width: 404,
    height: 874,
    backgroundColor: '#ffffff',
    marginTop: 0,
    marginHorizontal: 'auto',
  },
  headerNS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 71,
    marginHorizontal: 18,
  },
  backButtonNS: {
    width: 28,
    height: 28,
  },
  titleTextNS: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default MainStyles;
