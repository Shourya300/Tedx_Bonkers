export type FlatSpeaker = {
  name: string;
  topic: string;
  category: string;
  image: string;
  tedTalkUrl: string;
  imagePosition?: string;
  year: number;
  theme: string;
};

export const FILTER_TAGS = [
  { label: "Innovation", icon: "🔬" },
  { label: "Tech", icon: "💻" },
  { label: "Arts", icon: "💃" },
  { label: "Wellness", icon: "💚" },
  { label: "Society", icon: "🌍" },
  { label: "Leadership", icon: "👔" },
  { label: "Perspectives", icon: "🧠" },
] as const;

export const yearContent: {
  [key: number]: {
    theme: string;
    description: string;
    themeImage: string;
    speakers: Array<{
      name: string;
      topic: string;
      category: string;
      image: string;
      tedTalkUrl: string;
      imagePosition?: string;
    }>;
    themeImageScale?: number;
  };
} = {
  2025: {
    theme: "Inverso Clesiddra",
    description: "As time folds, perspectives unfold.",
    themeImage: "/rewind/25.webp",
    themeImageScale: 1.65,
    speakers: [
      {
        name: "Tirth Parsana",
        topic: "Aham Brahmasmi",
        category: "Perspectives",
        image: "/rewind/25/tirth.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=5CAXlKPZTHA",
      },
      {
        name: "Sneha Chakraborty",
        topic: "Flow over Fear",
        category: "Wellness",
        image: "/rewind/25/sneha.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=KGWfQHL1HmY",
      },
      {
        name: "Palakh Khanna",
        topic: "Flipping the narrative",
        category: "Perspectives",
        image: "/rewind/25/palakh.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=B3raZ8P1frI",
      },
      {
        name: "Nainika Mukherjee",
        topic: "Trust the Process: The Power of Movement",
        category: "Arts",
        image: "/rewind/25/nainika.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=NYocIjAxXl4",
      },
      {
        name: "Manas Chopra",
        topic: "Why Community Building is the Key to Personal Growth",
        category: "Leadership",
        image: "/rewind/25/manas.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=SUU0WteEYus",
      },
      {
        name: "Humaira Mushtaq",
        topic: "Architect of Her Own Reality",
        category: "Leadership",
        image: "/rewind/25/humaira.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=wA-Pmcz8HvI",
      },
      {
        name: "Dr. Gajendra Purohit",
        topic: "The Timeless Equation",
        category: "Innovation",
        image: "/rewind/25/gajendra.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=2WmABjM2gSw",
      },
      {
        name: "Dr. Mitali Rathod",
        topic: "Navigating Adulthood",
        category: "Wellness",
        image: "/rewind/25/uterus.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=PfxqMAC-39A",
      },
      {
        name: "Amit Dubey",
        topic: "Whispers of the Web",
        category: "Tech",
        image: "/rewind/25/amit.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=6MHYtNKaC1k",
      },
      {
        name: "Aiman Khan",
        topic: "Timeless Influence",
        category: "Leadership",
        image: "/rewind/25/aiman.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=gjecwTZgvo0",
      },
      {
        name: "Dr. L Venakata Subramaniam",
        topic: "India's Time",
        category: "Society",
        image: "/rewind/25/venkata.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=JYlIMogFDi8",
      },
    ],
  },
  2024: {
    theme: "Saptaranga",
    description: "Where Spectrums Unite",
    themeImage: "/rewind/24.webp",
    speakers: [
      {
        name: "Nikita Sharma",
        topic: "You Are It",
        category: "Perspectives",
        image: "/rewind/24/nikita.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=goCrg3YuQmA",
        imagePosition: "10% 10%",
      },
      {
        name: "Dr Vijender Chauhan",
        topic: "No Success is Monocolor",
        category: "Leadership",
        image: "/rewind/24/vijender.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=LdK_eQExh1M",
      },
      {
        name: "Gaurav Juyal",
        topic: "Drapery and How It is Awesome",
        category: "Arts",
        image: "/rewind/24/Gaurav.webp",
        tedTalkUrl: "",
      },
      {
        name: "Siddharth Jain",
        topic: "Finding Your Superpower",
        category: "Perspectives",
        image: "/rewind/24/sid.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=l7w3bUkyFb0",
      },
      {
        name: "Devyani Sharma",
        topic: "Life Driven by Dance",
        category: "Arts",
        image: "/rewind/24/devyani.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=WHZBHGE7b-g",
      },
      {
        name: "Akshay Chopra",
        topic: "From Nothing to Something",
        category: "Leadership",
        image: "/rewind/24/akshay.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=vkTNMjEYoh0",
      },
      {
        name: "Navin Reddy",
        topic: "The New Way of Learning Tech",
        category: "Tech",
        image: "/rewind/24/navin.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=YBe4EE8QIAU",
      },
      {
        name: "Vipin Mishra",
        topic: "In The Zone",
        category: "Wellness",
        image: "/rewind/24/vipin.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=YIO37VZ8Zvg",
      },
      {
        name: "Padamjeet Sehrawat",
        topic: "You Are Your Best Answer",
        category: "Perspectives",
        image: "/rewind/24/pad.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=pQF-tUolRGc",
      },
      {
        name: "Nirbhik Datta",
        topic: "Unveiling the Subconscious",
        category: "Wellness",
        image: "/rewind/24/nirbhik.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=zAKyzgdkOA4",
      },
      {
        name: "Aditya Goela CFA",
        topic: "How CFA Course Changed my Life",
        category: "Leadership",
        image: "/rewind/24/aditya.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=thR82rUg8VI",
      },
      {
        name: "Dr Kausar Shah",
        topic: "Dark Sides of Confident Leadership",
        category: "Leadership",
        image: "/rewind/24/kausar.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=Y7MdhKjFCOk",
      },
      {
        name: "Shivani Kalra",
        topic: "Because I Said No",
        category: "Society",
        image: "/rewind/24/shi.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=mKexuy238zA",
      },
    ],
  },
  2023: {
    theme: "T.H.I.N.C",
    description: "Transform, Hustle, Introspect, Nurture and Create",
    themeImage: "/rewind/23.webp",
    speakers: [
      {
        name: "Aastha Tiwari",
        topic: "The Heart Way or the Hard Way",
        category: "Perspectives",
        image: "/rewind/THINC/11.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=xZzVeKW_3yU",
      },
      {
        name: "Dr. Aqsa Shaikh",
        topic: "The White Coat Has A Rainbow",
        category: "Society",
        image: "/rewind/THINC/12.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=1ckPQR64wwM",
      },
      {
        name: "Anuranjita Kumar",
        topic: "Can I Have It All",
        category: "Leadership",
        image: "/rewind/THINC/8.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=frWC8qmCuOQ",
      },
      {
        name: "Deepak Pareek",
        topic: "No Guts, No Glory!",
        category: "Leadership",
        image: "/rewind/THINC/9.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=kdIOiNHyDyM",
      },
      {
        name: "Ganesh Sahai",
        topic: "P-3 Way To Innovation",
        category: "Innovation",
        image: "/rewind/THINC/3.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=FZS-RSRl73w",
      },
      {
        name: "Harsh Goela",
        topic: "Stories in Stock Markets",
        category: "Leadership",
        image: "/rewind/THINC/10.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=6DItV7xFDSQ",
      },
      {
        name: "Nishtha Khushu",
        topic: "The Dancing Dream",
        category: "Arts",
        image: "/rewind/THINC/6.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=M2fb3S9DTj8",
      },
      {
        name: "Pravishi Das",
        topic: "Be the Sun",
        category: "Perspectives",
        image: "/rewind/THINC/1.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=cuoNArh218Y",
      },
      {
        name: "Sanghamitra Bose",
        topic: "The Invisible Children",
        category: "Society",
        image: "/rewind/THINC/2.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=nd6vtdczD04",
      },
      {
        name: "Sushma Gaikwad",
        topic: "Awaken The Warrior Within",
        category: "Wellness",
        image: "/rewind/THINC/7.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=_pXgXRKmpXE",
      },
      {
        name: "Tapesh Kumar",
        topic: "Stories of Failure",
        category: "Perspectives",
        image: "/rewind/THINC/4.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=4hafBaWCifU",
      },
      {
        name: "Vijay Prakash Sharma",
        topic: "Music is my passion",
        category: "Arts",
        image: "/rewind/THINC/5.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=TGNYCxoUQWU",
      },
    ],
  },
  2022: {
    theme: "Parvaaz",
    description: "Azaad. Aagaaz. Aseem",
    themeImage: "/rewind/22.webp",
    speakers: [
      {
        name: "Kevin Missal",
        topic: "Space Exploration",
        category: "Innovation",
        image: "/rewind/Parvaaz/kevin_missal.webp",
        tedTalkUrl: "",
      },
      {
        name: "Harish Mehta",
        topic: "Joy of Failing",
        category: "Perspectives",
        image: "/rewind/Parvaaz/Harish_Mehta.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=u4KNmBXKe-4",
      },
      {
        name: "Supreet Singh Arora",
        topic: "Personal Identity",
        category: "Perspectives",
        image: "/rewind/Parvaaz/Author_sherry.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=cxGsANXP3OQ",
      },
      {
        name: "Lakshay Jangid",
        topic: "Patience on one wheel",
        category: "Wellness",
        image: "/rewind/Parvaaz/lakshay.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=7sXgpj_Co9I",
      },
      {
        name: "Major General D.Bipin Bakshi",
        topic: "Seeking new horizons",
        category: "Society",
        image: "/rewind/Parvaaz/maj.webp",
        tedTalkUrl: "",
      },
      {
        name: "Rakshit Tandon",
        topic: "Blockchain",
        category: "Tech",
        image: "/rewind/Parvaaz/Rakshit_Tandon.webp",
        tedTalkUrl: "",
      },
      {
        name: "Ridhi Khakhar",
        topic: "Carving your own path",
        category: "Perspectives",
        image: "/rewind/Parvaaz/ridhi.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=fA6ady8Xrq8",
      },
      {
        name: "Sagar Lalwani",
        topic: "Take the risk",
        category: "Leadership",
        image: "/rewind/Parvaaz/Sagar_Lalwani.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=Fg9ixhDzPEo",
      },
      {
        name: "Sangeeta Sindhi Bahl",
        topic: "Become who you aspire",
        category: "Leadership",
        image: "/rewind/Parvaaz/sangeeta.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=7-8v_IM7OKs",
      },
      {
        name: "Srikanth Velamakanni",
        topic: "Magic behind AI",
        category: "Tech",
        image: "/rewind/Parvaaz/srikant.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=PuyKr-jnguA",
      },
      {
        name: "Yoga Bhabagna Jonala",
        topic: "Classical Dancing",
        category: "Arts",
        image: "/rewind/Parvaaz/yoga.webp",
        tedTalkUrl: "",
      },
    ],
  },
  2021: {
    theme: "Swadhyaya",
    description: "An interview with oneself",
    themeImage: "/rewind/21.webp",
    speakers: [
      {
        name: "Aabir Vyas",
        topic: "Hard Work",
        category: "Perspectives",
        image: "/rewind/Swadhyaya/aabir_vyas.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=ftMj6E4wX60",
      },
      {
        name: "Abhash Jha",
        topic: "I Helped Myself",
        category: "Perspectives",
        image: "/rewind/Swadhyaya/Abhash_Jha.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=k_FdxLP2qIk",
      },
      {
        name: "Anirban Bhattacharyya",
        topic: "Morning Raaga",
        category: "Arts",
        image: "/rewind/Swadhyaya/anirban_bhattacharyya.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=jsX0MMr35lk",
      },
      {
        name: "Avinash Singh",
        topic: "Prosper. Or Perish",
        category: "Perspectives",
        image: "/rewind/Swadhyaya/Avinash_Singh.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=IiVl2UgszFc",
      },
      {
        name: "EPR Iyer",
        topic: "Hip Hop Empowers",
        category: "Arts",
        image: "/rewind/Swadhyaya/EPR_Iyer.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=IaHkabRhBq4",
      },
      {
        name: "Richie Mehta",
        topic: "The Meaning of...",
        category: "Perspectives",
        image: "/rewind/Swadhyaya/Richie_Mehta.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=N_8CsLScgKg",
      },
      {
        name: "Vanndana Vaadera",
        topic: "Mental Workouts",
        category: "Wellness",
        image: "/rewind/Swadhyaya/vanndana_vaadera.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=bB97hvh-7sI",
      },
    ],
  },
  2020: {
    theme: "Quo Vadis",
    description: "Where are we headed?",
    themeImage: "/rewind/20.webp",
    speakers: [
      {
        name: "Aditya Bhandari",
        topic: "Young India",
        category: "Society",
        image: "/rewind/Quovadis/Aditya_Bhandari.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=N2Xnkg4OP2w",
      },
      {
        name: "As We Keep Searching",
        topic: "Musical Performance",
        category: "Arts",
        image: "/rewind/Quovadis/aswekeepsearching.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Chameli Debnath",
        topic: "Kathak",
        category: "Arts",
        image: "/rewind/Quovadis/Chameli_Debnath.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=aCQv_A2wxrw",
      },
      {
        name: "Manoj Keshwar",
        topic: "Life Lessons",
        category: "Perspectives",
        image: "/rewind/Quovadis/manoj_keshawar.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Manraj Singh & Arpit Vyas",
        topic: "What Goes Around",
        category: "Perspectives",
        image: "/rewind/Quovadis/msingh_avyas.jpg",
        tedTalkUrl: "https://www.youtube.com/watch?v=JeH9v7ohjWc",
      },
      {
        name: "Shalin IPS",
        topic: "Connected by Consumption",
        category: "Society",
        image: "/rewind/Quovadis/shalin_IPS.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=sSqYNOIvoI8",
      },
      {
        name: "Sugata Mitra",
        topic: "Future of Work",
        category: "Innovation",
        image: "/rewind/Quovadis/Sugata_mitra.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=jrH3_NANVJA",
      },
      {
        name: "Sushruthi Krishna",
        topic: "Success story",
        category: "Leadership",
        image: "/rewind/Quovadis/Sushruthi-Krishna.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Tirthak Saha",
        topic: "Sustainability",
        category: "Society",
        image: "/rewind/Quovadis/Tirthak_Saha.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=GBplgW4c3gY",
      },
      {
        name: "Zoe Modgill",
        topic: "Strength is an Inside Job",
        category: "Wellness",
        image: "/rewind/Quovadis/Zoe_Modgill.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=_JAWKCanBTA",
      },
    ],
  },
  2019: {
    theme: "Sparking Metanoia",
    description: "",
    themeImage: "/rewind/19.webp",
    speakers: [
      {
        name: "Atif Khan",
        topic: "Drones",
        category: "Innovation",
        image: "/rewind/Sparking/atif_khan.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=VaegXWjUhN0",
      },
      {
        name: "Digital Gandhi",
        topic: "Love",
        category: "Perspectives",
        image: "/rewind/Sparking/digital-gandhi.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=umH9yka1siY",
      },
      {
        name: "Salman Khurshid",
        topic: "Mind of a Judge",
        category: "Leadership",
        image: "/rewind/Sparking/Salman_Khurshid.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=ZljJEjJ7n_g",
      },
      {
        name: "Richard Rekhy",
        topic: "Leading from Heart",
        category: "Leadership",
        image: "/rewind/Sparking/Richard_Rekhy.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=PjrM3G8PCb8",
      },
      {
        name: "Sangeeta Sindhi Bahl",
        topic: "Setbacks",
        category: "Perspectives",
        image: "/rewind/Sparking/sangeeta-bahl.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=ysYik6Ptfy4",
      },
      {
        name: "Nidhi Lauria",
        topic: "Generosity",
        category: "Perspectives",
        image: "/rewind/Sparking/Nidhi_Lauria.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=umH9yka1siY",
      },
      {
        name: "Sanchit Batra",
        topic: "Illusion",
        category: "Perspectives",
        image: "/rewind/Sparking/Sanchit_Batra.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=0qsQpUJv-Ck",
      },
      {
        name: "Kamal Morya",
        topic: "Dance",
        category: "Arts",
        image: "/rewind/Sparking/Kamal_Morya.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=B8QRhZi_PVk",
      },
      {
        name: "Siya Jain",
        topic: "Kathak",
        category: "Arts",
        image: "/rewind/Sparking/siya-jain.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=1i2Fruw4Vf4",
      },
      {
        name: "Lt Gen Vinod Bhatia",
        topic: "Who Dares Wins",
        category: "Society",
        image: "/rewind/Sparking/Vinod_Bhatia.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=4wa3XDh72lE",
      },
    ],
  },
  2018: {
    theme: "The Precipice",
    description: "On the brink of change",
    themeImage: "/rewind/18.webp",
    speakers: [
      {
        name: "Prasanth Nori",
        topic: "Education",
        category: "Society",
        image: "/rewind/Precipice/Prasanth_Nori.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=zxusiA7UsHI",
      },
      {
        name: "Nimisha Verma",
        topic: "Isolation",
        category: "Perspectives",
        image: "/rewind/Precipice/Nimisha_Verma.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=RsqOdZepzVs",
      },
      {
        name: "Anuv Jain",
        topic: "Sadness",
        category: "Arts",
        image: "/rewind/Precipice/anuv_jain.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=fAYaSIMsxQs",
      },
      {
        name: "Dr Ananta Singh",
        topic: "Leadership",
        category: "Leadership",
        image: "/rewind/Precipice/Ananta_Singhi.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=BjRjuQnmJLY",
      },
      {
        name: "Sushant Kalra",
        topic: "Child Abuse",
        category: "Society",
        image: "/rewind/Precipice/sushant_kalra.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=tZoxCmda56I",
      },
      {
        name: "Maj Gen. Umang Sethi",
        topic: "We Before I",
        category: "Society",
        image: "/rewind/Precipice/Umang_Sethi.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=nZkhF12fO8c",
      },
      {
        name: "Narayani Gupta",
        topic: "Past",
        category: "Perspectives",
        image: "/rewind/Precipice/narayanai-gupta.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=yc8-XT-awzY",
      },
      {
        name: "Pankhuri Gidwani",
        topic: "Stereotypes",
        category: "Society",
        image: "/rewind/Precipice/pankhuri_gidwani.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=XmE4mk8x00s",
      },
      {
        name: "Dr Prem Atreja",
        topic: "Health",
        category: "Wellness",
        image: "/rewind/Precipice/Prem_Atreja.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=531nxrBke88",
      },
    ],
  },
};

export const getAllSpeakers = (): FlatSpeaker[] => {
  const speakers: FlatSpeaker[] = [];
  Object.entries(yearContent).forEach(([year, data]) => {
    data.speakers.forEach((speaker) => {
      speakers.push({
        ...speaker,
        year: Number(year),
        theme: data.theme,
      });
    });
  });
  return speakers.sort((a, b) => b.year - a.year);
};

export const speakerMatchesTag = (
  speaker: FlatSpeaker,
  tag: (typeof FILTER_TAGS)[number],
): boolean => {
  return speaker.category === tag.label;
};
