export interface RelationshipMilestone {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  narrative: string;
  quote: string;
  iconName: 'Sparkles' | 'Heart' | 'Flame' | 'Home' | 'Infinity';
}

export interface LoveStoryConfig {
  meta: {
    siteTitle: string;
    recipientName: string;
    senderSignoff: string;
    subtitle: string;
  };
  intro: {
    smallHeading: string;
    mainHeading: string;
    description: string;
    openButtonText: string;
    skipButtonText: string;
    letterImageUrl: string;
  };
  hero: {
    editionKicker: string;
    mainHeading: string;
    supportingText: string;
    handwrittenNote: string;
    scrollHint: string;
    heroImageUrl: string;
  };
  milestones: RelationshipMilestone[];
  chapters: {
    chapter1: {
      number: string;
      title: string;
      heading: string;
      message: string;
      handwrittenNote: string;
      reflection: string;
    };
    chapter2: {
      number: string;
      title: string;
      heading: string;
      message: string;
      couplePhotoUrl: string;
      photoCaption: string;
    };
    chapter3: {
      number: string;
      title: string;
      heading: string;
      message: string;
      littleThings: Array<{
        title: string;
        text: string;
      }>;
    };
    chapter4: {
      number: string;
      title: string;
      heading: string;
      message: string;
      sanctuaryQuote: string;
      sanctuaryHighlight: string;
    };
    chapter5: {
      number: string;
      title: string;
      heading: string;
      message: string;
      loveLetterSnippet: string;
      reasons: string[];
    };
    chapter6: {
      number: string;
      title: string;
      heading: string;
      message: string;
      promises: Array<{
        title: string;
        text: string;
      }>;
    };
    chapter7: {
      number: string;
      title: string;
      heading: string;
      supportingMessage: string;
      finalButtonLabel: string;
      finalRevealedMessage: string;
      replayButtonLabel: string;
    };
  };
  loveNotes: Array<{
    id: string;
    text: string;
    author: string;
  }>;
}

export const loveStoryConfig: LoveStoryConfig = {
  meta: {
    siteTitle: "A Little World Made Just for You, Wifey ❤️",
    recipientName: "Wifey",
    senderSignoff: "Always Yours",
    subtitle: "A Private Editorial Love Story",
  },
  intro: {
    smallHeading: "A Private Letter From My Heart 💌",
    mainHeading: "For My Wifey ❤️",
    description: "If I could give you one thing in this world, it would be the ability to see yourself through my eyes. Only then would you understand how incredibly special you are to me.",
    openButtonText: "Break the Wax Seal & Open ✦",
    skipButtonText: "Skip intro",
    letterImageUrl: "/src/assets/images/editorial_wax_seal_letter_1792150386093.jpg",
  },
  hero: {
    editionKicker: "MEMOIR D'AMOUR · PRIVATE EDITION",
    mainHeading: "Every Love Story Is Beautiful, But Ours Is My Favourite.",
    supportingText: "And somewhere in this beautiful, chaotic world, I found my favourite person. My comfort, my happiness, my Wifey.",
    handwrittenNote: "If home were a person, it would always be you. ❤️",
    scrollHint: "Scroll to unveil our story ↓",
    heroImageUrl: "/src/assets/images/editorial_couple_twilight_1792150386025.jpg",
  },
  milestones: [
    {
      id: "first-chapter",
      phase: "Milestone 01",
      title: "When Our Worlds Aligned",
      subtitle: "The Serendipitous Beginning",
      narrative: "Somewhere in this chaotic world, destiny crossed our paths. It wasn't loud or rushed—it was a quiet certainty that my life would never be the same again.",
      quote: "The day ordinary days began turning into unforgettable memories.",
      iconName: "Sparkles",
    },
    {
      id: "realizing-love",
      phase: "Milestone 02",
      title: "Falling in Love",
      subtitle: "The Quiet Realization",
      narrative: "Love didn't arrive all at once; it settled gently in the sound of your laughter, the comfort of your voice, and how naturally my heart learned to trust you.",
      quote: "You didn't just become someone I love—you became my favorite feeling.",
      iconName: "Heart",
    },
    {
      id: "our-sanctuary",
      phase: "Milestone 03",
      title: "Building Our Sanctuary",
      subtitle: "Finding Home in You",
      narrative: "Home ceased to be a place with walls and ceilings. Home became your presence, the warmth of your hand, and the peaceful exhale whenever we are together.",
      quote: "If home were a person, it would always be you.",
      iconName: "Home",
    },
    {
      id: "sacred-vows",
      phase: "Milestone 04",
      title: "The Sacred Promise",
      subtitle: "Choosing Each Other Every Day",
      narrative: "Not just on the golden, easy days, but especially on the quiet, challenging ones. The conscious, devoted choice to hold your hand and choose you over and over.",
      quote: "In every lifetime and every version of reality, I'd still choose you.",
      iconName: "Flame",
    },
    {
      id: "our-forever",
      phase: "Milestone 05",
      title: "Our Endless Tomorrow",
      subtitle: "An Everlasting Journey",
      narrative: "Every chapter written behind us is beautiful, but the pages ahead are filled with all the dreams, laughter, and sunsets we have yet to share.",
      quote: "My favourite person, my greatest blessing, my forever Wifey.",
      iconName: "Infinity",
    },
  ],
  chapters: {
    chapter1: {
      number: "01",
      title: "The Serendipity",
      heading: "Somehow, Everything Feels Better With You.",
      message: "Even the simplest moments become special when you're beside me. You make ordinary days feel like something worth remembering.",
      handwrittenNote: "A quiet glance, your hand in mine — that is all the luxury I will ever seek.",
      reflection: "In your presence, time softens into pure stillness.",
    },
    chapter2: {
      number: "02",
      title: "The Absolute Choice",
      heading: "If I Could Choose Again, I'd Still Choose You.",
      message: "Not because everything is always perfect, but because even on the imperfect days, you're still my favourite person.",
      couplePhotoUrl: "/src/assets/images/editorial_couple_moment_1792150387020.jpg",
      photoCaption: "My favourite person across every lifetime",
    },
    chapter3: {
      number: "03",
      title: "The Unspoken Magic",
      heading: "It's the Little Things That Make Me Love You More.",
      message: "Your smile, your voice, your presence, and the little things you do without even realizing it. They mean more to me than words can explain.",
      littleThings: [
        {
          title: "Your Radiant Smile",
          text: "The effortless warmth that immediately dispels any shadow in my day.",
        },
        {
          title: "Your Calming Presence",
          text: "The soothing calm that settles over my spirit the moment you walk into the room.",
        },
        {
          title: "Your Tender Grace",
          text: "The gentle, unspoken kindness with which you nurture everything around you.",
        },
      ],
    },
    chapter4: {
      number: "04",
      title: "The Safe Harbor",
      heading: "With You, My Heart Feels at Home.",
      message: "No matter how complicated the world gets, the thought of you brings me a kind of peace I never want to take for granted.",
      sanctuaryQuote: "You are the quiet harbor in the storm, the warm light in the evening window.",
      sanctuaryHighlight: "A fortress built of warmth, trust, and gentle devotion.",
    },
    chapter5: {
      number: "05",
      title: "A Thousand Reasons",
      heading: "If I Wrote Down Every Reason I Love You...",
      message: "I'd run out of paper long before I ran out of reasons. And somehow, every day, you give me another one.",
      loveLetterSnippet: "From your quiet resilience to the delicate laughter you share when no one else is watching, each breath with you is a gift.",
      reasons: [
        "The gentle courage with which you face every morning",
        "The way your eyes dance when something genuinely delights you",
        "How safe and complete my world feels whenever our hands meet",
        "The unconditional faith and kindness you offer so selflessly",
      ],
    },
    chapter6: {
      number: "06",
      title: "The Sacred Vows",
      heading: "No Matter What Life Brings...",
      message: "I want to keep choosing you, listening to you, growing with you, and finding new reasons to fall in love with you.",
      promises: [
        {
          title: "To Always Listen",
          text: "To listen deeply to your dreams and hold your hands through every doubt.",
        },
        {
          title: "To Stand Beside You",
          text: "To celebrate with you in joyous sunshine and protect you in heavy rain.",
        },
        {
          title: "To Cherish Every Chapter",
          text: "To honor and cherish you as my greatest gift, every single day.",
        },
      ],
    },
    chapter7: {
      number: "07",
      title: "The Eternal Letter",
      heading: "And If I Had To Choose Again... I'd Choose You. Every Single Time. ❤️",
      supportingMessage: "Thank you for being my favourite hello, my safest place, and the person I want beside me in every chapter of life.",
      finalButtonLabel: "Send One More Hug 🤗",
      finalRevealedMessage: "I LOVE YOU, WIFEY. Aaj, kal, aur har janam. 🌷❤️",
      replayButtonLabel: "Relive Our Story from the Beginning ↺",
    },
  },
  loveNotes: [
    {
      id: "note-1",
      text: "Agar waqt ko rok sakti, toh tumhare saath bitaaye har pal par rok deti.",
      author: "Forever Yours",
    },
    {
      id: "note-2",
      text: "You are the poetry I never knew how to write, and the life I always prayed for.",
      author: "With All My Love",
    },
  ],
};
