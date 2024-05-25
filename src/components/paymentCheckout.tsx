import React, { useContext, useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import { Button, message } from "antd";
import axios from "axios";
import { ZoneBookingsContext } from "../context/zoneBookings.context";

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
    axios
      .post("http://localhost:8000/api/addarcadebooking", {
        status: "success",
        date: zoneBookings.zoneBookings.date,
        time: zoneBookings.zoneBookings.time,
        participant_count: zoneBookings.zoneBookings.participant_count,
        user_id: zoneBookings.zoneBookings.user_id,
        zone_id: zoneBookings.zoneBookings.zone_id,
        way_of_booking: zoneBookings.zoneBookings.way_of_booking,
        booking_type: zoneBookings.zoneBookings.booking_type,
        created_at: zoneBookings.zoneBookings.created_at,
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
        participant_count: zoneBookings.zoneBookings.participant_count,
        player_id: zoneBookings.zoneBookings.user_id,
        zone_id: zoneBookings.zoneBookings.zone_id,
        coach_id: props.coach_id,
        arcade_id: props.arcadeId,
        created_at: zoneBookings.zoneBookings.created_at,
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
        disabled={
          props.sportId === ""
            ? props.date === "" ||
              props.time === "" ||
              props.pcount === "" ||
              props.userId === "" ||
              props.zoneId === "" ||
              props.pcount > props.avaiableParticipantCount ||
              props.reservation_type === ""
            : props.date === "" ||
              props.time === "" ||
              props.pcount === "" ||
              props.userId === "" ||
              props.zoneId === "" ||
              props.pcount > props.avaiableParticipantCount ||
              props.reservation_type === ""
        }
        onClick={pay}
      >
        Pay with Payhere
      </Button>
    </>
  );
};

export default PaymentModal;
