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
  description: String;
  way_of_booking: String;
  sport_id: String;
  sport: Sport;
}
export interface ZoneBookingDetails {
  zone_booking_id: String;
  status: String;
  created_at: String;
  canceled_at: String;
  rate: Number;
  date: String;
  time: String;
  participant_count: Number;
  user: User;
  zone: Zone;
}

export interface Coach {
  coach_id: String;
  rate: Number;
  coach_rating: Number;
  short_desctiption: String;
  user: User;
  sport: Sport;
  coachFeedbacks: CoachFeedbacks;
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
  Phone: UserPhone;
  userPhotos: UserPhoto;
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
  arcade_id: String;
  arcade_name: String;
  arcade_email: String;
  arcade_location: String;
  distription: String;
  manager_id: String;
  opening_time: String;
  closing_time: String;
  arcade_address: String;
  arcade_image: String;
  arcadefeedbacks: ArcadeFeedbacks[];
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