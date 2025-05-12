import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const SCOPES = "https://www.googleapis.com/auth/calendar";
const GOOGLE_CLIENT_ID = "576830676465-5mvhgqpg37v3r42koutvn0shpq1uio51.apps.googleusercontent.com";
const GOOGLE_API_KEY = "AIzaSyACg5ZHyy0AN5H22cgrfRAZCUH5XzQ5Nvs";

function useGoogleCalendar() {
    const [gapiLoaded, setGapiLoaded] = useState(false);

    useEffect(() => {
        function start() {
            gapi.client
                .init({
                    apiKey: GOOGLE_API_KEY,
                    clientId: GOOGLE_CLIENT_ID,
                    scope: SCOPES,
                })
                .then(() => {
                    setGapiLoaded(true);
                })
                .catch((error) => {
                    console.error("❌ gapi 초기화 실패:", error);
                });
        }

        gapi.load("client:auth2", start);
    }, []);

    const signIn = async () => {
        if (!gapiLoaded) {
            throw new Error("❗ gapi 초기화가 아직 완료되지 않았습니다.");
        }
        return await gapi.auth2.getAuthInstance().signIn();
    };

    const listEvents = async () => {
        if (!gapiLoaded) {
            throw new Error("❗ gapi 초기화가 아직 완료되지 않았습니다.");
        }
        const res = await gapi.client.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
        });
        return res.result.items;
    };

    return { gapiLoaded, signIn, listEvents };
}

export default useGoogleCalendar;