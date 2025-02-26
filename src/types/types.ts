export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  FestivityScreen: { festivityId: number };
  ScheduleScreen: { festivityId: number };
  Calendar: { festivityId: number };
  Map: undefined;
  Account: undefined;
  GuarandaEvent: undefined;
  Notification: undefined;
  History: undefined;
  TermsScreen: undefined;
  HelpCenterScreen: undefined;
  AdminDashboard: undefined;
  AddFestivityScreen: undefined;
  CurrencyScreen: undefined
  EditFestivityScreen: {
    festivityId: number;
  };
  AddEventFScreen: {
    festivityId: number;
    festivalStartDate: string;
    festivalEndDate: string;
    festivalName: string;
  };
  EventsXFestivityScreen: undefined;
  EditEventFestivityScreen: {
    eventId: number;
    festivityId: number;
    festivalName: string;
    festivalStartDate: string;
    festivalEndDate: string;
  };
};
