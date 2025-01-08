import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/meetings?properties=hs_meeting_title,hs_meeting_start_time,hs_meeting_end_time,hubspot_owner_id`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch meetings data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
