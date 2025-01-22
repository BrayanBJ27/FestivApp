import { StyleSheet } from "react-native";

const MainStyles = StyleSheet.create({

  //NAVBAR
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9',
    position: 'absolute',
    bottom: 20,
    width: '100%',
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
    fontFamily: 'System',  // System font for iOS-like appearance
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
  titleTextHS: {
    height: 39,
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '600',
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
    marginLeft: 20.893,
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
    marginTop: 1,
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
  },
  ratingIconHS: {
    width: 16,
    height: 16,
  },
  otherFestivitiesContainerHS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginLeft: 20.893,
  },
  otherFestivityHS: {
    width: 146,
    height: 200,
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
});

export default MainStyles;
