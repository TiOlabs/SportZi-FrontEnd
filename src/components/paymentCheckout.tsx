import React, { useContext, useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import { Button, message } from "antd";
import axios from "axios";
import { ZoneBookingsContext } from "../context/zoneBookings.context";
import { full } from "@cloudinary/url-gen/qualifiers/fontHinting";

declare global {
  interface Window {
    payhere: any;
  }
}

const PaymentModal = (props: any): JSX.Element | null => {
  console.log(props);
  const zoneBookings = useContext(ZoneBookingsContext);
  console.log(zoneBookings);
  console.log(zoneBookings.zoneBookings.date);
  console.log(props.first);
  console.log(props.first_name + " " + props.last_name)

  // Put the payment variables here
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const orderId = props.orderId;
  const name = props.item;
  const amount = props.amount;
  const merchantId = "1226243";
  const merchantSecret = "MTAwNjUyOTg1MTY5MDY1NjIyNjE3MzMzOTk1MzEzOTAzNjI3NTAw";

  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  let amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const currency = props.currency || "LKR";

  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: "1226243", // Replace your Merchant ID
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

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(paymentId: string) {
    console.log("-----------befoe");
    console.log(zoneBookings);
    console.log(zoneBookings.zoneBookings.date);
    console.log(zoneBookings.zoneBookings.time);
    console.log(zoneBookings.zoneBookings.participant_count);
    console.log(zoneBookings.zoneBookings.user_id);
    console.log(zoneBookings.zoneBookings.zone_id);
    console.log(zoneBookings.zoneBookings.way_of_booking);
    console.log(zoneBookings.zoneBookings.booking_type);
    console.log(props.first_name + " " + props.last_name)
    axios
      .post("http://localhost:8000/api/addarcadebooking", {
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
        reservation_type:props.reservation_type,
        zone_name: props.zone_name,
        user_name:props.first_name + " " + props.last_name,
        email:props.email,
      })
      .then((res) => {
        console.log("Payment completed.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(`-------error is ${error}`);
      });
    console.log(zoneBookings.zoneBookings.date);
    console.log(zoneBookings.zoneBookings.time);
    console.log(zoneBookings.zoneBookings.participant_count);
    console.log(zoneBookings.zoneBookings.user_id);
    console.log(zoneBookings.zoneBookings.zone_id);
    console.log(props.coach_id);
    console.log(props.arcadeId);
    console.log(zoneBookings.zoneBookings.created_at);

    axios
      .post("http://localhost:8000/api/addCoachBooking", {
        status: "success",
        date: zoneBookings.zoneBookings.date,
        time: zoneBookings.zoneBookings.time,
        full_amount: props.amount,
        participant_count: zoneBookings.zoneBookings.participant_count,
        player_id: zoneBookings.zoneBookings.user_id,
        zone_id: zoneBookings.zoneBookings.zone_id,
        coach_id: props.coach_id,
        arcade_id: props.arcadeId,
        created_at: zoneBookings.zoneBookings.created_at,
        coach_email: props.coach_email,
        coach_name: props.coach_name,
        role: props.role,
        reservation_type:props.reservation_type,
        zone_name: props.zone_name,
        user_name:props.first_name + " " + props.last_name,
        email:props.email,
        arcade_name:props.arcade_name,
      })
      .then((res) => {
        console.log("Payment completed.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(`-------error is ${error}`);
      });
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
      .then((res) => {
        console.log("Payment completed.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(`-------error is ${error}`);
      });

    console.log("-----------After");
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error: string) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  function pay() {
    console.log("before");
    window.payhere.startPayment(payment);
    console.log("after");
  }
  const isDay = props.date;
  const isTime = props.time;
  const isParticipantCount = props.pcount;
  const isUserId = props.userId;
  const isZoneId = props.zoneId;
  const isReservationType = props.reservation_type;

  const handlePayment = () => {
    console.log(props.avaiableParticipantCount);
    console.log(props.pcount);
    if (props.item === "Zone Booking") {
      if (isDay === null) {
        message.warning("Please select a Day.");
      } else if (isReservationType === "") {
        message.warning("Please select Reservatin Type.");
      } else if (isTime === "") {
        message.warning("Please select a Time Slot.");
      } else if (isParticipantCount === "") {
        message.warning("Please select Participant Count.");
      } else if (isUserId === "") {
        message.warning("Please Login First.");
      } else if (isZoneId === "") {
        message.warning("Please select a zone.");
      } else if (props.pcount > props.avaiableParticipantCount) {
        message.warning(
          "Participant count is more than available participant count."
        );
      } else {
        pay();
      }
    } else if (props.item === "Coach Booking") {
      if (isDay === null) {
        message.warning("Please select a Day.");
      } else if (isUserId === "") {
        message.warning("Please Login First.");
      } else if (isZoneId === "") {
        message.warning("Please select a zone.");
      } else if (isTime === "") {
        message.warning("Please select a Time Slot.");
      } else if (isParticipantCount === "") {
        message.warning("Please select Participant Count.");
      } else if (isReservationType === "") {
        message.warning("Please select Reservatin Type.");
      } else if (props.pcount > props.avaiableParticipantCount) {
        message.warning(
          "Participant count is more than available participant count."
        );
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
        // disabled={
        //   props.sportId === ""
        //     ? props.date === "" ||
        //       props.time === "" ||
        //       props.pcount === "" ||
        //       props.userId === "" ||
        //       props.zoneId === "" ||
        //       props.pcount > props.avaiableParticipantCount ||
        //       props.reservation_type === ""
        //     : props.date === "" ||
        //       props.time === "" ||
        //       props.pcount === "" ||
        //       props.userId === "" ||
        //       props.zoneId === "" ||
        //       props.pcount > props.avaiableParticipantCount ||
        //       props.reservation_type === ""
        // }
        onClick={handlePayment}
        // onClick={pay}
      >
        Pay with Payhere
      </Button>
    </>
  );
};

export default PaymentModal;
