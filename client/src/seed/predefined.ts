import { UserInfo, Rank } from "../constants/user";

export const getRandom = <T>(set: Array<T>): T =>
  set[Math.floor(Math.random() * set.length)];

export const randomInt = (maxValue: number): number =>
  Math.floor(Math.random() * (maxValue + 1));

export const randomString = (length: number): string => {
  var str: string = "";
  while (str.length < length) {
    try {
      str += " " + Math.random().toString(36).substr(3, 50);
    } catch {}
  }
  return str;
};

export const randomBool = (): boolean => Math.random() < 0.5;

export const User: UserInfo[] = [
  {
    tag: "Patrick",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fen.spongepedia.org%2Fimages%2Fthumb%2Ff%2Ff3%2FPatrick_als_Kind.jpg%2F175px-Patrick_als_Kind.jpg&f=1&nofb=1",
    rank: Rank.User,
  },
  {
    tag: "Gary the Snail",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2Fgary_the_snail_reval_6504.jpg&f=1&nofb=1",
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
    tag: "Karen",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fspongebob%2Fimages%2F5%2F57%2FFriend_or_Foe_36.png%2Frevision%2Flatest%2Fscale-to-width-down%2F180%3Fcb%3D20130908170922&f=1&nofb=1",
    rank: Rank.Admin,
  },
  {
    tag: "Spongebob",
    profileImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fsmashbroslawlorigins%2Fimages%2F4%2F47%2FSpongebob.png%2Frevision%2Flatest%3Fcb%3D20181103164034&f=1&nofb=1",
    rank: Rank.Admin,
  },
];

export const titles: string[] = [
  "I need help with this bug...",
  "This is a Title",
  "Never gonna give you up",
  "Suggestion",
  "Issue about Data Generation",
  "Can we have cookies?",
  "Want build instructions? See the github repo /japraj/bugtracker :o",
  "Spongebob Squarepants Themed Data Generation!",
  "Bugtracker Random Title",
  "See the github repo for more!",
  "Once upon a time",
  "Please add this feature",
  "Random Sequence of Characters",
  "I like programming",
  "Are you ready kids?",
  "Built with C# and Typescript",
  "React, Redux, Routing?",
  "State Management Is Cool",
  "Dataflow problems",
  "Persistent Model not being Updated",
  "Hello World",
  "This application supports CRUDding of Posts, Users, and Comments!",
  "Over 11k lines!",
  "Lorem Ipsum Dolor",
];

export const comments: string[] = [
  "Hello",
  "I can't seem to figure it out :(",
  "This is a value",
  "The back-end uses cookie based sessions for authorization and .Net Core Identity for authentication.",
  "I tried to hack a toy car recently",
  "The front-end primarily consists of functional components with hooks and makes heavy use of Material-UI, an open-source React component library.",
  "Is this the Krusty Krab? No this is Patrick.",
  "Word.",
  "Sequence Of Filler Words",
  "Lorem Ipsum Dolor",
  "Placeholder text",
  "I can't seem to reproduce this",
  "Can you please provide some more details?",
  "Try deleting this ticket through the edit menu (bottom right)",
  "Take a look at the graphs in the dashboard menu!",
  "The logout button is disabled :(",
  "This application features authentication, authorization, and more!",
  "Its been 84 years",
  "Randomized Sequence of Characters",
  "Did you know, you can click on a username to get a popup??",
  "Did you know, you can click on a username to get a popup??",
  "There is even a searchbar in the home page!",
  "You can register an account and login, but that is disabled in the demo mode",
  "Pagination with Material UI",
  "React, redux, typescript, styled components for the front-end, and C#, ASP.NET, Entity Framework + Postgresql for the backend",
  "I write a comment!",
  "Insert Cool Easter Egg here",
  "Insert funny joke here",
  "This is a description",
  "TAKE A LOOK AT THE MOBILE VERSION, I SPENT A LONG TIME ON IT!",
  "I once spent 3 days looking for a bug that broke my app; it was an issue in case sensitivity!",
  "CSS is hard",
  "WELCOME TO THE PAGINATION STATION",
  "I worked on the app for 2 months over the summer, then took 4 months off for my first semester of university, and now I am finishing it 6 months after writing the first line of code!",
  "I completely redid the directory structure of the project 3 times! The project ended up being over hundreds of files, so it was worth it.",
];
