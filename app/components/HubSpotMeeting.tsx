"use client";

import { useEffect } from "react";

export default function HubSpotMeeting() {
  useEffect(() => {
    // スクリプトを動的に読み込む
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // クリーンアップ: コンポーネントがアンマウントされた場合にスクリプトを削除
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* 埋め込み用のdiv */}
      <div
        className="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/rion-kairi-yuuri-1banme?embed=true"
      ></div>
    </div>
  );
}
