import { UserInfo, Rank } from "../constants/user";

export const getRandom = <T>(set: Array<T>): T =>
  set[Math.floor(Math.random() * set.length)];

export const randomNum = (maxValue: number): number =>
  Math.floor(Math.random() * (maxValue + 1));

export const randomString = (): string =>
  Math.random().toString(36).substr(2, 50);

export const randomBool = (): boolean => Math.random() < 0.5;

export const User: UserInfo[] = [
  {
    tag: "Spongebob",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fsmashbroslawlorigins%2Fimages%2F4%2F47%2FSpongebob.png%2Frevision%2Flatest%3Fcb%3D20181103164034&f=1&nofb=1",
    rank: Rank.User,
  },
  {
    tag: "Patrick",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fen.spongepedia.org%2Fimages%2Fthumb%2Ff%2Ff3%2FPatrick_als_Kind.jpg%2F175px-Patrick_als_Kind.jpg&f=1&nofb=1",
    rank: Rank.User,
  },
  {
    tag: "Squidward",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fbadcreepypasta%2Fimages%2F9%2F99%2FSquidward1.png%2Frevision%2Flatest%2Fscale-to-width-down%2F180%3Fcb%3D20160204012416&f=1&nofb=1",
    rank: Rank.Developer,
  },
  {
    tag: "Sandy Cheeks",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg2.wikia.nocookie.net%2F__cb20170427235459%2Fanimatedmusclewomen%2Fimages%2Fthumb%2Fd%2Fdc%2FSandy_in_SBSP_Season_10.png%2F130px-234%252C1049%252C0%252C720-Sandy_in_SBSP_Season_10.png&f=1&nofb=1",
    rank: Rank.Developer,
  },
  {
    tag: "Mr. Krabs",
    profileImg:
      "https://vignette.wikia.nocookie.net/nickelodeon/images/e/e2/SpongeBob-Mr-Krabs.jpg/revision/latest/scale-to-width-down/150?cb=20180104021929",
    rank: Rank.Manager,
  },
  {
    tag: "Plankton",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmaincircle.s149435.gridserver.com%2Fwp-content%2Fuploads%2Fsites%2F5%2F2013%2F09%2F32.png&f=1&nofb=1",
    rank: Rank.Manager,
  },
  {
    tag: "Gary the Snail",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2Fgary_the_snail_reval_6504.jpg&f=1&nofb=1",
    rank: Rank.Admin,
  },
  {
    tag: "Karen",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fspongebob%2Fimages%2F5%2F57%2FFriend_or_Foe_36.png%2Frevision%2Flatest%2Fscale-to-width-down%2F180%3Fcb%3D20130908170922&f=1&nofb=1",
    rank: Rank.Admin,
  },
];

export const Status: string[] = ["resolved", "work-in-progress", "new"];
