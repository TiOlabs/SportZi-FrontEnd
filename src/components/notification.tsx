import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Menu, Button } from "antd";
import { BellOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import io from "socket.io-client";
import axios from "axios";

interface NotificationProps {
  userType: "arcade" | "coach" | "player";
  id: string;
}

interface Notification {
  message: string;
  read: boolean;
  // Add any other fields your notification object might have
}

const socket = io("http://localhost:8000");

const Notification: React.FC<NotificationProps> = ({ userType, id }) => {
  console.log("userType", userType);
  console.log("id", id);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    socket.emit("joinRoom", { userType, id });

    socket.on("newNotification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    const fetchNotifications = async () => {
      console.log("id", id);
      try {
        if (userType === "player") {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}api/player/notifications/${id}`
          );
          const fetchedNotifications: Notification[] = response.data;
          setNotifications(fetchedNotifications);
          setUnreadCount(
            fetchedNotifications.filter((notif) => !notif.read).length
          );
        } else if (userType === "coach") {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}api/${userType}/notifications/${id}`
          );
          const fetchedNotifications: Notification[] = response.data;
          setNotifications(fetchedNotifications);
          setUnreadCount(
            fetchedNotifications.filter((notif) => !notif.read).length
          );
        } else if (userType === "arcade") {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}api/${userType}/notifications/${id}`
          );
          const fetchedNotifications: Notification[] = response.data;
          setNotifications(fetchedNotifications);
          setUnreadCount(
            fetchedNotifications.filter((notif) => !notif.read).length
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    return () => {
      socket.off("newNotification");
    };
  }, [userType, id]);

  const handleMenuClick = async () => {
    setUnreadCount(0);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/${userType}/notifications/markAsRead`,
        { id }
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const menu = (
    <Menu>
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>
          {" "}
          <hr />
          <CheckCircleTwoTone twoToneColor="#52c41a" /> {notification.message}
          <hr />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Badge count={unreadCount}>
        <Button
          icon={<BellOutlined />}
          shape="circle"
          onClick={handleMenuClick}
          style={{
            border:"none"
          }}
        />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
