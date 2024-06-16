import React, { useContext, useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import { Button, message } from "antd";
import axios from "axios";
import { ZoneBookingsContext } from "../context/zoneBookings.context";
import { Arcade } from "../types";

declare global {
  interface Window {
    payhere: any;
  }
}

const PaymentModalForZoneBooking = (props: any): JSX.Element | null => {
  const zoneBookings = useContext(ZoneBookingsContext);
  const [arcadesofCoache, setarcadesofCoache] = useState<Arcade>();
  const [isZoneIntheArcade, setIsZoneIntheArcade] = useState(false);
  const [
    isZonehasSelectedReservationType,
    setIsZonehasSelectedReservationType,
  ] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const orderId = props.orderId;
  const name = props.item;
  const amount = props.amount;
  const merchantId = "1226243";
  const merchantSecret = "MTAwNjUyOTg1MTY5MDY1NjIyNjE3MzMzOTk1MzEzOTAzNjI3NTAw";

  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const currency = props.currency || "LKR";

  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();
  console.log(props.arcadeId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetailsByArcadeId/${props.arcadeId}`
        );
        const data = await res.json();
        setarcadesofCoache(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.arcadeId]);

  const payment = {
    sandbox: true,
    merchant_id: "1226243",
    return_url: "http://localhost:3000/bookings",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: orderId,
    items: name,
    amount: amount,
    currency: currency,
    first_name: props.first_name,
    last_name: props.last_name,
    email: props.email,
    phone: props.phone,
    address: props.address,
    city: props.city,
    country: props.country,
    hash: hash,
  };

  window.payhere.onCompleted = function onCompleted(paymentId: string) {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/addarcadebooking`, {
        status: "success",
        date: zoneBookings.zoneBookings.date,
        time: zoneBookings.zoneBookings.time,
        full_amount: props.amount,
        participant_count: zoneBookings.zoneBookings.participant_count,
        user_id: zoneBookings.zoneBookings.user_id,
        zone_id: zoneBookings.zoneBookings.zone_id,
        way_of_booking: zoneBookings.zoneBookings.way_of_booking,
        booking_type: zoneBookings.zoneBookings.booking_type,
        created_at: zoneBookings.zoneBookings.created_at,
        arcade_email: props.arcade_email,
        arcade_name: props.arcade_name,
        role: props.role,
        reservation_type: props.reservation_type,
        zone_name: props.zone_name,
        user_name: props.first_name + " " + props.last_name,
        email: props.email,
        arcadeId: props.arcadeId,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .post(`${process.env.REACT_APP_API_URL}api/addCoachBooking`, {
    //     status: "success",
    //     date: zoneBookings.zoneBookings.date,
    //     time: zoneBookings.zoneBookings.time,
    //     full_amount: props.amount,
    //     participant_count: zoneBookings.zoneBookings.participant_count,
    //     player_id: zoneBookings.zoneBookings.user_id,
    //     zone_id: zoneBookings.zoneBookings.zone_id,
    //     coach_id: props.coach_id,
    //     arcade_id: props.arcadeId,
    //     created_at: zoneBookings.zoneBookings.created_at,
    //     coach_email: props.coach_email,
    //     coach_name: props.coach_name,
    //     role: props.role,
    //     reservation_type: props.reservation_type,
    //     zone_name: props.zone_name,
    //     user_name: props.first_name + " " + props.last_name,
    //     email: props.email,
    //     arcade_name: props.arcade_name,
    //   })
    //   .then(() => {
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/addPackageEnrollmentPlayerDetails`,
        {
          player_id: props.userId,
          package_id: props.package_id,
          status: "success",
          rate: props.amount,
          duration: props.duration,
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
  };

  window.payhere.onError = function onError(error: string) {
    console.log("Error:" + error);
  };

  const pay = () => {
    window.payhere.startPayment(payment);
  };

  const handlePayment = () => {
    console.log(props);
    console.log(props.pcount);
    console.log(props.avaiableParticipantCount);
    if (props.item === "Zone Booking") {
      if (!props.date) {
        message.warning("Please select a Day.");
      } else if (!props.reservation_type) {
        message.warning("Please select Reservation Type.");
      } else if (!props.time) {
        message.warning("Please select a Time Slot.");
      } else if (!props.pcount) {
        message.warning("Please select Participant Count.");
      } else if (props.pcount > props.avaiableParticipantCount) {
        message.warning(
          "Participant count is more than available participant count."
        );
      } else if (!props.userId) {
        message.warning("Please Login First.");
      } else if (!props.zoneId) {
        message.warning("Please select a zone.");
      } else if (props.pcount > props.avaiableParticipantCount) {
        message.warning(
          "Participant count is more than available participant count."
        );
      } else {
        pay();
      }
    } else if (props.item === "Coach Booking") {
      if (!props.date) {
        message.warning("Please select a Day.");
      } else if (!props.userId) {
        message.warning("Please Login First.");
      } else if (!props.zoneId) {
        message.warning("Please select a zone.");
      } else if (!props.time) {
        message.warning("Please select a Time Slot.");
      } else if (!props.pcount) {
        message.warning("Please select Participant Count.");
      } else if (!props.reservation_type) {
        message.warning("Please select Reservation Type.");
      } else {
        pay();
      }
    }
  };

  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          width: "90%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handlePayment}
      >
        Pay with Payhere
      </Button>
    </>
  );
};

export default PaymentModalForZoneBooking;
