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
</script>

<script context="module" lang="ts">
    export async function preload() {
        let data = await this.fetch("notices.json");
        let json_data = await data.json();

        return {
            notices: json_data
        };
    }
</script>

<style lang="scss">
  :global(*) {
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background: linear-gradient(to bottom, blue, cyan);
    color: black;
  }

  .notice-wrapper {
    padding: 30px;
    margin: 10%;
  }

  .meeting .notice {
    .info {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        * {
          width: fit-content;
        }
      }
    }
  }


  .notice {
    padding: 30px;
    margin: 1rem 0;
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));

    border-radius: 30px;
  }
</style>

<h1>WBHS Notices</h1>

<h3>Meeting Notices</h3>
<div class="meeting notice-wrapper">
    {#if notices.MeetingNotices.NumberMeetingRecords !== 0 }
        {#each notices.MeetingNotices.Meeting as notice}
            <div class="notice">
                <div class="info">
                    <div>
                        <p>{notice.Level}</p>
                        <p>{notice.Subject}</p>
                        <p>{notice.Teacher}</p>
                    </div>
                    <div class="e">
                        <p>{notice.PlaceMeet}</p>
                        <p>{notice.DateMeet}</p>
                        <p>{notice.TimeMeet}</p>
                    </div>
                </div>
                <p class="content">
                    {notice.Body}
                </p>
            </div>
        {/each}
    {/if}
</div>

<h3>General Notices</h3>
<div class="general notice-wrapper">
    {#if notices.GeneralNotices.NumberGeneralRecords !== 0 }
        {#each notices.GeneralNotices.General as notice}
            <div class="notice">
                <div class="info">
                    <p>{notice.Level}</p>
                    <p>{notice.Subject}</p>
                    <p>{notice.Teacher}</p>
                </div>
                <p class="content">
                    {notice.Body}
                </p>
            </div>
        {/each}
    {/if}
</div>