<script lang="ts">
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

    export let notices: NoticesResults;


    // Scroll to next notices every 5 seconds
    let index = 0;
    // tslint:disable-next-line
    if (process.browser === true) {
        // setInterval(() => {
        //     if (index < notices.NumberRecords && (window.innerHeight + window.scrollY) <= document.body.offsetHeight) {
        //         index++;
        //         window.location.href = "#" + index;
        //     } else {
        //         index = 0;
        //         window.location.href = "#0";
        //     }
        // }, 1500);

        // Refresh the page between 5am and 6am every day
        setInterval(() => {
            if (new Date().getHours() > 4 && new Date().getHours() < 7) {
                window.location.reload();
            }
        }, 3_600_000);
    }
</script>

<script context="module" lang="ts">
    export async function preload() {
        let data = await this.fetch("notices.json");
        let json_data = await data.json();

        for (let notice in json_data.MeetingNotices.Meeting) {
            json_data.MeetingNotices.Meeting[notice].Index = parseInt(notice) + 1;
            json_data.MeetingNotices.Meeting[notice].Body = json_data.MeetingNotices.Meeting[notice].Body.replace(/&amp;/g, "&");
        }

        for (let notice in json_data.GeneralNotices.General) {
            json_data.GeneralNotices.General[notice].Index = parseInt(notice) + 1 + json_data.MeetingNotices.NumberMeetingRecords;
            json_data.GeneralNotices.General[notice].Body = json_data.GeneralNotices.General[notice].Body.replace("&amp;", "&");
        }

        return {
            notices: json_data
        };
    }
</script>

<style lang="scss">
  .notice-wrapper {
    padding: 30px;
    margin: 10px 10%;
  }

  .meeting .info {
    grid-template-columns: 65% 10% 5% 10% 10%;
  }

  .general .info {
    grid-template-columns: 85% 10% 5%;
  }

  .notice {
    padding: 40px 30px;

    .info {
      text-align: center;
      padding: 10px;
      display: grid;
      align-items: center;

      .i-ele.sub {
        color: white;
        font-size: 20pt;
        font-weight: bold;
        text-align: left;
      }

      .i-ele {
        color: #f1f1f1;
      }
    }

    .content {
      font-size: 15pt;
    }

    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.5);
    }

    &:nth-child(odd) {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &:first-child {
      border-radius: 20px 20px 0 0;
    }

    &:last-child {
      border-radius: 0 0 20px 20px;
    }
  }

  h1, h3, .date {
    text-align: center;
  }

  h1 {
    font-size: 60pt;
    font-weight: 900;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  h3 {
    padding-top: 5rem;
    font-size: 30pt;
    font-weight: 900;
  }

  .date {
    font-size: 20pt;
    color: #E8E8E8;
  }
</style>

<svelte:head>
    <title>WBHS Notices</title>
</svelte:head>

<h1 id="0">WBHS Notices</h1>

<p class="date">{new Date().toDateString()}</p>

<h3>Meeting Notices</h3>
<div class="meeting notice-wrapper">
    {#if notices.MeetingNotices.NumberMeetingRecords !== 0 }
        {#each notices.MeetingNotices.Meeting as meetingNotice}
            <div class="notice" id="{meetingNotice.Index}">
                <div class="info">
                    <div class="i-ele sub">
                        <p>{meetingNotice.Subject}</p>
                    </div>
                    <div class="i-ele">
                        <p>{meetingNotice.Level}</p>
                    </div>
                    <div class="i-ele">
                        <p>{meetingNotice.Teacher}</p>
                    </div>
                    <div class="i-ele">
                        <p>{meetingNotice.DateMeet} {meetingNotice.TimeMeet}</p>
                    </div>
                    <div class="i-ele">
                        <p>{meetingNotice.PlaceMeet}</p>
                    </div>
                </div>
                <p class="content">
                    {meetingNotice.Body}
                </p>
            </div>
        {/each}
    {:else}
        <div class="notice">
            No Meeting Notices Today :)
        </div>
    {/if}
</div>

<h3>General Notices</h3>
<div class="general notice-wrapper">
    {#if notices.GeneralNotices.NumberGeneralRecords !== 0 }
        {#each notices.GeneralNotices.General as generalNotice}
            <div class="notice" id="{generalNotice.Index}">
                <div class="info">
                    <div class="i-ele sub">
                        <p>{generalNotice.Subject}</p>
                    </div>
                    <div class="i-ele">
                        <p>{generalNotice.Level}</p>
                    </div>
                    <div class="i-ele">
                        <p>{generalNotice.Teacher}</p>
                    </div>
                </div>
                <p class="content">
                    {generalNotice.Body}
                </p>
            </div>
        {/each}
    {:else}
        <div class="notice">
            No Meeting Notices Today :)
        </div>
    {/if}
</div>