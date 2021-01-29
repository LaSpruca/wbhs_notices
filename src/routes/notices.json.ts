import axios from "axios";
import parser from "fast-xml-parser";

type NoticesResults = {
    apiversion: string,
    portalversion: string,
    AccessLevel: number,
    ErrorCode: number,
    NoticeDate: string,
    NumberRecords: number,
    MeetingNotices: MeetingNotices,
    GeneralNotices: GeneralNotices,
}

type MeetingNotices = {
    NumberMeetingRecords: number,
    Meeting: Array<Meeting>,
}

type Meeting = {
    Index: number,
    Level: string,
    Subject: string,
    Body: string,
    Teacher: string,
    PlaceMeet: string,
    DateMeet: string,
    TimeMeet: string,
}

type GeneralNotices = {
    NumberGeneralRecords: number,
    General: General[],
}

type General = {
    Index: number,
    Level: string,
    Subject: string,
    Body: string,
    Teacher: string,
}

export const get = async (req, res, next) => {
    let today = new Date();

    let params = new URLSearchParams();
    params.append("Command", "GetNotices");
    params.append("Key", "vtku");
    params.append("Date", `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`)
    // If you want to use a day with notices, for development purposes when there is no notices, comment out previous line and uncomment next line
    // params.append("Date", `11/03/2020`)

    let noticesRequest = await axios.post("https://portal.wbhs.school.nz/api/api.php", params, {
        headers: {
            "User-Agent": "KAMAR/ CFNetwork/ Darwin/",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let notices: NoticesResults = parser.parse(noticesRequest.data)["NoticesResults"];

    res.end(JSON.stringify(notices));
}
