export interface Discount {
  discount_id: String;
  discount_percentage: Number;
  description: String;
  discount_image: String;
  zone_name: String;
  arcade_name: String;
  zone: Zone;
}
export interface Zone{
  zone_name: String;
  zone_id: String;
  arcade_name: String;
  arcade_email: String;
  rate: Number;
  arcade_location: String;
  manager_id: String;
  opening_time: String;
  closing_time: String;
  arcade_address: String;
  arcade_image: String;
}
export interface ZoneBookingDetails {
  zone_booking_id: String;
  status: String;
  created_at: String;
  canceled_at: String;
  rate:Number;
  date: String;
  time: String;
  participant_count: Number;
  user: User;
  zone: Zone;
}

export interface Coach {
  coach_image: String;
  rate: Number;
  coach_rating: Number;
  short_desctiption: String;
  user: User;
}
export interface User {
  user_id: String;
  firstname: String;
  lastname: String;
  user_email: String;
  user_address: String;
  user_image: String;
  user_rating: Number;
}
export interface CoachAssignDetails {
  assign_id: Number;
  description: String;
  duration: String;
  state: String;
  rate: string;
  coach_image: String;
  coach: Coach;
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

export interface ArcadeRating {
  discription: string;
  rate: Number;
}

export interface Arcade {
  arcade_id: String;
  arcade_name: String;
  arcade_email: String;
  arcade_location: String;
  manager_id: String;
  opening_time: String;
  closing_time: String;
  arcade_address: String;
  arcade_image: String;
}
