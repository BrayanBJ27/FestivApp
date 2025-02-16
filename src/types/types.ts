export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Event: { eventId: number }; // Parámetro para EventScreen
  Schedule: undefined;
  Calendar: undefined;
  Map: undefined;
  Account: undefined;
  GuarandaEvent: undefined; // Esta entrada debe estar aquí
  Notification: undefined;
  History: undefined;
  TermsScreen: undefined; // Agrega la ruta para TermsScreen
  HelpCenterScreen: undefined;
  AdminDashboard: undefined;
  AddFestivityScreen: undefined;
  CurrencyScreen: undefined
  EditFestivityScreen: {
    festivityId: number;
  };
};
