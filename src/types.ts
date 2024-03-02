export interface Discount {
  discount_percentage: Number;
  description: String;
  discount_image: String;
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
  participant_count: Number;
  created_at: String;
  zone: String;
}
