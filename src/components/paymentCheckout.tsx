import React from "react";

import md5 from "crypto-js/md5";
import { Button, message } from "antd";

declare global {
  interface Window {
    payhere: any;
  }
}

const PaymentModal = (props: any): JSX.Element | null => {
  // Put the payment variables here
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const orderId = props.orderId;
  const name = props.item;
  const amount = props.amount;
  const merchantId = "1226118";
  const merchantSecret =
    "Mjk3NjYwMjU4MzIzNjcxODIzMTIyNTY5ODAzMTg1MjEzNjE5NDQzNw==";

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
    merchant_id: "1226118", // Replace your Merchant ID
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
  window.payhere.onCompleted = function onCompleted(orderId: string) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
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
    window.payhere.startPayment(payment);
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Booking Successfull!",
        duration: 2,
      });
    }, 1000);
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
        onClick={pay}
      >
        Pay with Payhere
      </Button>

      <p>{name}</p>
    </>
  );
};

export default PaymentModal;
