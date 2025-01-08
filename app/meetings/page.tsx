"use client";

import { useEffect, useState } from "react";
import HubSpotMeeting from "../components/HubSpotMeeting";

interface Meeting {
  id: string;
  properties: {
    hs_meeting_title: string;
    hs_meeting_start_time: string;
    hs_meeting_link: string;
  };
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("/api/meetings");
        if (!response.ok) {
          throw new Error("Failed to fetch meetings data");
        }
        const data = await response.json();
        setMeetings(data.results || []); // データが `results` 内に格納されている場合
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchMeetings();
  }, []);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  if (meetings.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Meeting Schedule
      </h1>
      <ul className="space-y-6">
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className="relative p-6 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* アイコン */}
            <div className="absolute top-4 left-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* メイン情報 */}
            <div className="ml-10">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {meeting.properties.hs_meeting_title}
              </h2>
              <p className="text-gray-600 mb-3">
                Start:{" "}
                {new Date(
                  parseInt(meeting.properties.hs_meeting_start_time, 10)
                ).toLocaleString()}
              </p>
              <a
                href={meeting.properties.hs_meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Join Meeting
              </a>
            </div>

            {/* バッジ */}
            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              予約済み
            </span>
          </li>
        ))}
      </ul>
      <HubSpotMeeting />
    </div>
  );
}
