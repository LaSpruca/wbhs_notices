import axios from "axios";
import parser from "fast-xml-parser";

export const get = async (req, res, next) => {
    // let today = new Date("11-03-2020");

    let params = new URLSearchParams();
    params.append("Command", "GetNotices");
    params.append("Key", "vtku");
    // params.append("Date", `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`)
    params.append("Date", `11/03/2020`)

    let noticesRequest = await axios.post("https://portal.wbhs.school.nz/api/api.php", params, {
        headers: {
            "User-Agent": "KAMAR/ CFNetwork/ Darwin/",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(parser.parse(noticesRequest.data)["NoticesResults"]));
}