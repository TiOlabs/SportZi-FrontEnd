export interface Discount {
  discount_percentage: Number;
  description: String;
  discount_image: String;
  zone_name: String;
  arcade_name: String;
  zone: Zone;
}
export interface Zone{
  zone_name: String;
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
export interface CoachAssignDetails {
  assign_id: Number;
  description: String;
  duration: String;
  state: String;
  rate: string;
  coach_image: String;
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
