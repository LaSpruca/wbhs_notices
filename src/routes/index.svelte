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
        NumberMeetingRecords: string,
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

    console.log(notices);
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

</style>

<h1>WBHS Notices</h1>

<div class="general">
    {#if notices.GeneralNotices.NumberGeneralRecords !== 0 }
        {#each notices.GeneralNotices.General as notice}
            <div class="info">
                <p>{notice.Level}</p>
                <p>{notice.Subject}</p>
                <p>{notice.Teacher}</p>
            </div>
            <p class="content">
                {notice.Body}
            </p>
        {/each}
    {/if}
</div>