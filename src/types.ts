export interface Discount {
  discount_id: String;
  discount_percentage: Number;
  description: String;
  discount_image: String;
  zone: Zone;
}
export interface Zone {
  zone_name: String;
  zone_id: String;
  rate: Number;
  arcade_location: String;
  manager_id: String;
  open_time: String;
  close_time: String;
  arcade_address: String;
  zone_image: String;
  arcade: Arcade;
  capacity: Number;
  time_Step: Number;
  description: String;
  way_of_booking: String;
  sport_id: String;
  sport: Sport;
  zoneBookingDetails: ZoneBookingDetails[];
  coachBookingDetails: CoachBookingDetails[];
  package: Package[];
  discount: Discount;
  full_zone_rate: Number;
  zoneRejectDateAndTime: ZoneRejectDateAndTime[];
  zoneRejectDayAndTime: ZoneRejectDayAndTime[];
}
export interface Package {
  package_id: String;
  package_name: String;
  description: String;
  package_image: String;
  rate_per_person: Number;
  created_at: String;
  canceled_at: String;
  status: String;
  arcade_id: String;
  zone_id: String;
  percentageForCoach: Number;
  discount: Discount[];
  arcade: Arcade;
  zone: Zone;
  coachApplyDetailsForPackage: String;
  playerPackageEnrollDetails: String;
  packageDayAndTime: PackageDayAndTime[];
}
export interface PackageEnroolDetailsForPlayer {
  player_id: String;
  package_id: String;
  status: String;
  enrolled_date: String;
  canceled_at: String;
  rate: Number;
  duration: Number;
  player: Player;
  package: Package;
}
export interface PackageEnrollDetailsForCoach {
  coach_id: String;
  package_id: String;
  status: String;
  enrolled_date: String;
  canceled_at: String;
  rate: Number;
  duration: Number;
  coach: Coach;
  package: Package;
}
export interface PackageDayAndTime {
  package_id: string;
  day: string;
  time: string;
}
export interface ZoneBookingDetails {
  zone_booking_id: String;
  status: String;
  created_at: String;
  canceled_at: String;
  full_amount: Number;
  date: String;
  time: String;
  participant_count: Number;
  user: User;
  zone: Zone;
  way_of_booking: String;
  booking_type: String;
}

export interface CoachBookingDetails {
  booking_id: String;
  status: String;
  created_at: String;
  canceled_at: String;
  participant_count: Number;
  date: String;
  time: String;
  full_amount: Number;
  coach_id: String;
  arcade_id: String;
  player_id: String;
  zone_id: String;
  rate: Number;
  player: Player;
  coach: Coach;
  zone: Zone;
  arcade: Arcade;
  way_of_booking: String;
}
export interface Player {
  player_id: String;
  coachBookingDetails: CoachBookingDetails[];
  user: User;
}
export interface Coach {
  coach_id: String;
  rate: Number;
  coach_rating: Number;
  short_desctiption: String;
  user: User;
  sport: Sport;
  coachFeedbacks: CoachFeedbacks;
  coachApplyDetailsForPackage: CoachEnrollDetailsForPackages[];
}
export interface User {
  user_id: String;
  role: String;
  firstname: String;
  lastname: String;
  email: String;
  DOB: String;
  gender: String;
  accountNumber: String;
  address: String;
  city: String;
  country: String;
  user_image: String;
  Phone: UserPhone[];
  userPhotos: UserPhoto;
  player: Player;
  natificationForUser: NotificationForUser[];
}
export interface UserPhone {
  user_id: String;
  phone_number: String;
}
export interface CoachAssignDetails {
  coach_id: String;
  arcade_id: String;
  duration: String;
  description: String;
  assigned_date: Date;
  status: String;
  created_at: Date;
  canceled_at: Date;
  coach: Coach;
  arcade: Arcade;
}

export interface ArcadeBookings {
  id: number;
  booking_date: String;
  booking_time: String;
  participant_count: number;
  created_at: String;
  zone: String;
  cancel_by_arcade: boolean;
  cancel_by_player: boolean;
  cancel_by_admin: boolean;
}

export interface Arcade {
  packageDayAndTime: any;
  lng: number | (() => number);
  lat: number | (() => number);
  map(arg0: (booking: any) => any): unknown;
  arcade_id: String;
  arcade_name: String;
  arcade_email: String;
  location: string;
  distription: String;
  manager_id: String;
  open_time: String;
  close_time: String;
  address: String;
  arcade_image: String;
  arcadefeedbacks: ArcadeFeedbacks[];
  zone: Zone[];
  package: Package[];
  notificationForArcade: NotificationForArcade[];
  manager: ArcadeManager;
}

export interface ArcadeManager {
  manager_id: String;
  user: User;
  arcade: Arcade;
}

export interface ArcadeFeedbacks {
  arcade_feedback_id: String;
  rate: Number;
  arcade: Arcade;
}
export interface Sport {
  sport_id: String;
  sport_name: String;
}

export interface CoachFeedbacks {
  coach_feedback_id: String;
  rate: Number;
}

export interface UserPhoto {
  user_id: String;
  image: String;
}
export interface Report {
  report_id: String;
  description: String;
  report_reason: String;
  reporter_user_id: String;
  victim_user_id: String;
  reporter_user: User;
  victim_user: User;
}

export interface ReportArcade {
  report_id: String;
  description: String;
  report_reason: String;
  reporter_user_id: String;
  victim_arcade_id: String;
  reporter_user: User;
  victim_arcade: Arcade;
}

export interface CoachFeedback {
  coach_feedback_id: string;
  rate: number;
  coach_id: string;
  feedback: {
    feedbacks_id: string;
    user_id: string;
    user: {
      user_id: string;
      role: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      DOB: string;
      gender: string;
      accountNumber: string;
      is_active: string;
      user_image: string;
      address: string;
      city: string;
      country: string;
      description: string;
    };
    feedbackComments: {
      feedback_id: string;
      comment: string;
    };
  };
}

export interface ArcadeFeedback {
  arcade_feedback_id: string;
  rate: number;
  arcade_id: string;
  feedback: {
    feedbacks_id: string;
    user_id: string;
    user: {
      user_id: string;
      role: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      DOB: string;
      gender: string;
      accountNumber: string;
      is_active: string;
      user_image: string;
      address: string;
      city: string;
      country: string;
      description: string;
    };
    feedbackComments: {
      feedback_id: string;
      comment: string;
    };
  };
}

export interface CoachEnrollDetailsForPackages {
  coach_id: String;
  package_id: String;
  duration: Number;
  desCription: String;
  applied_date: String;
  status: String;
  created_at: String;
  canceled_at: String;
  coach: Coach;
  package: Package;
}

export interface ZoneRejectDateAndTime {
  zone_id: String;
  date: String;
  time: String;
  zone: Zone;
}

export interface ZoneRejectDayAndTime {
  zone_id: String;
  day: String;
  time: String;
  zone: Zone;
}

export interface NotificationForUser {
  notification_id: String;
  message: String;
  is_read: Boolean;
  created_at: String;
  user_id: String;
  user: User;
}

export interface NotificationForArcade {
  notification_id: String;
  message: String;
  is_read: Boolean;
  created_at: String;
  arcade_id: String;
  arcade: Arcade;
}
