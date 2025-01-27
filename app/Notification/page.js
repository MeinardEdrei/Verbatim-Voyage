"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserSession } from "../utils/SessionContext";

// const notification = [
//   {
//     "id": 1,
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 1, 2025",
//     "action": "started following you",
//     "type": "follow",
//   },
//   {
//     "id": 2,
//     "name": "Jane Smith",
//     "email": "jane.smith@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 2, 2025",
//     "action": "liked your story",
//     "type": "like",
//   },
//   {
//     "id": 3,
//     "name": "Alice Johnson",
//     "email": "alice.johnson@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 3, 2025",
//     "action": "commented on your story",
//     "type": "response",
//   },
//   {
//     "id": 4,
//     "name": "Bob Brown",
//     "email": "bob.brown@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 4, 2025",
//     "action": "started following you",
//     "type": "follow",
//   },
//   {
//     "id": 5,
//     "name": "Charlie Davis",
//     "email": "charlie.davis@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 5, 2025",
//     "action": "liked your story",
//     "type": "like",
//   },
//   {
//     "id": 6,
//     "name": "Diana Wilson",
//     "email": "diana.wilson@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 6, 2025",
//     "action": "commented on your story",
//     "type": "response",
//   },
//   {
//     "id": 7,
//     "name": "Ethan Martinez",
//     "email": "ethan.martinez@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 7, 2025",
//     "action": "started following you",
//     "type": "follow",
//   },
//   {
//     "id": 8,
//     "name": "Fiona Taylor",
//     "email": "fiona.taylor@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 8, 2025",
//     "action": "liked your story",
//     "type": "like",
//   },
//   {
//     "id": 9,
//     "name": "George Harris",
//     "email": "george.harris@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 9, 2025",
//     "action": "commented on your story",
//     "type": "response",
//   },
//   {
//     "id": 10,
//     "name": "Hannah Lee",
//     "email": "hannah.lee@example.com",
//     "image": "https://github.com/shadcn.png",
//     "date": "January 15, 2025",
//     "action": "started following you",
//     "type": "follow",
//   },
// ];

const page = () => {
  const [notification, setNotification] = useState(null);
  const session = useUserSession();

  const [activeButton, setActiveButton] = useState("All");
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [latestNotifications, setLatestNotifications] = useState(notification?.filter(a => a.date === today).sort((a, b) => new Date(b.date) - new Date(a.date)));
  const [responsesNotifications, setResponsesNotifications] = useState([]);

  const [sortedNotification, setSortedNotification] = useState([]);
  const [showOlderNotification, setShowOlderNotification] = useState(false);

  useEffect(() => {
    if (session.userSession) {
      const eventSource = new EventSource(`/api/notification/stream?userId=${session.userSession.id}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
      }

      eventSource.onerror = (error) => {
        console.error("SSE Notification error:", error);
        eventSource.close();
      };
    
      return () => {
        eventSource.close();
      };
    }
  }, [session])

  useEffect(() => {
    if (activeButton != "response") {setSortedNotification(latestNotifications);}
    setLatestNotifications(notification?.filter(a => a.date === today).sort((a, b) => new Date(b.date) - new Date(a.date)));
    setResponsesNotifications(notification?.filter(a => a.type === "response" && a.date === today).sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [])

  // All
  const handleAllNotifications = () => {
    setShowOlderNotification(false);

    if (latestNotifications?.length > 0) {
      setSortedNotification(latestNotifications);
    } else {
      setSortedNotification(latestNotifications);
      setShowOlderNotification(false);
    }
    setActiveButton("All");
  }
  // Responses
  const handleResponsesNotifications = () => {
    setShowOlderNotification(false);

    if (responsesNotifications?.length > 0) {
      setSortedNotification(responsesNotifications);
    } else {
      setSortedNotification(responsesNotifications);
      setShowOlderNotification(false);
    }
    setActiveButton("Responses");
  }
  // Older Notifications
  const handleShowOlderNotifications = () => {
    setShowOlderNotification(true);
    if (activeButton === "All") {
      setSortedNotification(notification.sort((a, b) => new Date(b.date ) - new Date( a.date )));
    } else {
      setSortedNotification(notification.filter(a => a.type === "response"));
    }
  }

  return (
    <div className="flex justify-center">
      <section className="w-11/12 xl:w-[60%] mt-10">
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold">Notifications</h2>
        </div>
        <div className="flex xl:gap-2 mt-5">
          <button 
            onClick={() => handleAllNotifications()}
            className={`${activeButton === "All" ? "bg-[var(--button-selected)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>All</button>
          <button 
            onClick={() => handleResponsesNotifications()}
            className={`${activeButton === "Responses" ? "bg-[var(--button-selected)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Responses</button>
        </div>
        <div className="flex flex-col gap-7 mt-10">
          {sortedNotification?.map((user) => (
            <div key={user.id} className="flex flex-col">
              <div className="flex items-center">
                <Image 
                  src={user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <div className="flex gap-1">
                    <h2 className="font-semibold text-sm xl:text-base">{user.name}</h2>
                    <p className="text-sm xl:text-base">{user.action}</p>
                  </div>
                  <div>
                    <p className="text-[var(--published-date)] text-xs xl:text-sm">{user.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Older Notifications */}
        { notification !== null ? (
          ((sortedNotification.length > 0 && !showOlderNotification) 
          || (responsesNotifications?.length === 0)) &&
          <div className="mt-10 mb-[30vh]">
            <button 
              onClick={() => handleShowOlderNotifications()}
              className="text-[var(--green-color)] text-sm xl:text-base font-medium">
              Older Notifications
            </button>
          </div>
        ) : (
          <p className="text-sm">No notifications this time.</p>
        )}
      </section>
    </div>
  )
}

export default page
