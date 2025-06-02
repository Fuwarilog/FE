export const addEventToGoogleCalendar = async (accessToken, eventData) => {
  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      summary: eventData.title,
      description: eventData.description || "",
      start: {
        date: eventData.startDate, // 'YYYY-MM-DD' 형식
      },
      end: {
        date: eventData.endDate,   // 'YYYY-MM-DD' 형식
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Google Calendar 등록 실패: ${error.error.message}`);
  }

  const result = await response.json();
  return result; // event id, htmlLink 등 반환됨
};
