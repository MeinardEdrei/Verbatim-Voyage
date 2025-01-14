"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const notification = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 1, 2025",
    "action": "started following you",
    "type": "follow",
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 2, 2025",
    "action": "liked your story",
    "type": "like",
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 3, 2025",
    "action": "commented on your story",
    "type": "response",
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "email": "bob.brown@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 4, 2025",
    "action": "started following you",
    "type": "follow",
  },
  {
    "id": 5,
    "name": "Charlie Davis",
    "email": "charlie.davis@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 5, 2025",
    "action": "liked your story",
    "type": "like",
  },
  {
    "id": 6,
    "name": "Diana Wilson",
    "email": "diana.wilson@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 6, 2025",
    "action": "commented on your story",
    "type": "response",
  },
  {
    "id": 7,
    "name": "Ethan Martinez",
    "email": "ethan.martinez@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 7, 2025",
    "action": "started following you",
    "type": "follow",
  },
  {
    "id": 8,
    "name": "Fiona Taylor",
    "email": "fiona.taylor@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 8, 2025",
    "action": "liked your story",
    "type": "like",
  },
  {
    "id": 9,
    "name": "George Harris",
    "email": "george.harris@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 9, 2025",
    "action": "commented on your story",
    "type": "response",
  },
  {
    "id": 10,
    "name": "Hannah Lee",
    "email": "hannah.lee@example.com",
    "image": "https://github.com/shadcn.png",
    "date": "January 15, 2025",
    "action": "started following you",
    "type": "follow",
  },
];

const page = () => {
  const [activeButton, setActiveButton] = useState("All");
  const [sortedNotification, setSortedNotification] = useState([]);
  const [showOlderNotification, setShowOlderNotification] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (activeButton === "All" && !showOlderNotification) {
      setSortedNotification(notification.filter(a => a.date === today).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (activeButton === "response") {
      setSortedNotification(notification.filter(a => a.type === activeButton && a.date === today).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      setSortedNotification(notification.sort((a, b) => new Date(b.date ) - new Date( a.date )));
    }
  }, [notification, activeButton, showOlderNotification]);

  return (
    <div className="flex justify-center">
      <section className="w-[60%] mt-10">
        <div>
          <h2 className="text-3xl font-semibold">Notifications</h2>
        </div>
        <div className="flex gap-2 mt-5">
          <button 
            onClick={() => setActiveButton("All")}
            className={`${activeButton === "All" ? "bg-[var(--button-selected)] font-semibold" : ""} px-7 py-2 rounded-full`}>All</button>
          <button 
            onClick={() => setActiveButton("response")}
            className={`${activeButton === "response" ? "bg-[var(--button-selected)] font-semibold" : ""} px-7 py-2 rounded-full`}>Responses</button>
        </div>
        <div className="flex flex-col gap-7 mt-10">
          {sortedNotification.map((user) => (
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
                    <h2 className="text-base font-semibold">{user.name}</h2>
                    <p className="">{user.action}</p>
                  </div>
                  <div>
                    <p className="text-[var(--published-date)] text-sm">{user.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Older Notifications */}
        {sortedNotification.length > 0 && 
          <div className="mt-10 mb-[30vh]">
            <button 
              onClick={() => setShowOlderNotification(true)}
              className="text-[var(--green-color)] font-medium">
              Older Notifications
            </button>
          </div>
        }
      </section>
    </div>
  )
}

export default page
