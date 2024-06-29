import React, { useContext, useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import { Button, message } from "antd";
import axios from "axios";
declare global {
  interface Window {
    payhere: any;
  }
}

const PaymentModalForPackageBooking = (props: any): JSX.Element | null => {
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
  console.log(props);
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
    if (props.item === "Package Booking") {
        if (!props.duration) {
          message.warning("Please Enter Duration.");
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

export default PaymentModalForPackageBooking;
