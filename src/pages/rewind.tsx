"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import DomeGallery from "@/components/DomeGallery/DomeGallery.jsx";

// --- CURATED FILTER TAGS ---
const FILTER_TAGS: {
  label: string;
  icon: string;
}[] = [
  {
    label: "Innovation",
    icon: "🔬",
  },
  {
    label: "Tech",
    icon: "💻",
  },
  {
    label: "Arts",
    icon: "💃",
  },
  {
    label: "Wellness",
    icon: "💚",
  },
  {
    label: "Society",
    icon: "🌍",
  },
  {
    label: "Leadership",
    icon: "👔",
  },
  {
    label: "Perspectives",
    icon: "🧠",
  },
];

// --- DATA OBJECT (All Years) ---
const yearContent: {
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
        image: "/rewind/QuoVadis/Aditya_Bhandari.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=N2Xnkg4OP2w",
      },
      {
        name: "As We Keep Searching",
        topic: "Musical Performance",
        category: "Arts",
        image: "/rewind/QuoVadis/aswekeepsearching.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Chameli Debnath",
        topic: "Kathak",
        category: "Arts",
        image: "/rewind/QuoVadis/Chameli_Debnath.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=aCQv_A2wxrw",
      },
      {
        name: "Manoj Keshwar",
        topic: "Life Lessons",
        category: "Perspectives",
        image: "/rewind/QuoVadis/manoj_keshwar.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Manraj Singh & Arpit Vyas",
        topic: "What Goes Around",
        category: "Perspectives",
        image: "/rewind/QuoVadis/msingh_avyas.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=JeH9v7ohjWc",
      },
      {
        name: "Shalin IPS",
        topic: "Connected by Consumption",
        category: "Society",
        image: "/rewind/QuoVadis/shalin_IPS.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=sSqYNOIvoI8",
      },
      {
        name: "Sugata Mitra",
        topic: "Future of Work",
        category: "Innovation",
        image: "/rewind/QuoVadis/Sugata_mitra.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=jrH3_NANVJA",
      },
      {
        name: "Sushruthi Krishna",
        topic: "Success story",
        category: "Leadership",
        image: "/rewind/QuoVadis/Sushruthi-Krishna.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=3YOpdfr-agQ",
      },
      {
        name: "Tirthak Saha",
        topic: "Sustainability",
        category: "Society",
        image: "/rewind/QuoVadis/Tirthak_Saha.webp",
        tedTalkUrl: "https://www.youtube.com/watch?v=GBplgW4c3gY",
      },
      {
        name: "Zoe Modgill",
        topic: "Strength is an Inside Job",
        category: "Wellness",
        image: "/rewind/QuoVadis/Zoe_Modgill.webp",
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

// --- Flatten all speakers with year info ---
type FlatSpeaker = {
  name: string;
  topic: string;
  category: string;
  image: string;
  tedTalkUrl: string;
  imagePosition?: string;
  year: number;
  theme: string;
};

const getAllSpeakers = (): FlatSpeaker[] => {
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

// --- Check if a speaker matches a tag ---
const speakerMatchesTag = (
  speaker: FlatSpeaker,
  tag: (typeof FILTER_TAGS)[0],
): boolean => {
  return speaker.category === tag.label;
};

// --- COMPONENT: SEARCH PANEL ---
const SearchPanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSpeakers = useMemo(() => getAllSpeakers(), []);
  const allYears = useMemo(
    () =>
      Object.keys(yearContent)
        .map(Number)
        .sort((a, b) => b - a),
    [],
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSelectedTags([]);
      setSelectedYears([]);
    }
  }, [isOpen]);

  const toggleTag = (tagLabel: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel],
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const filteredSpeakers = useMemo(() => {
    let results = allSpeakers;

    if (selectedYears.length > 0) {
      results = results.filter((s) => selectedYears.includes(s.year));
    }

    if (selectedTags.length > 0) {
      results = results.filter((speaker) => {
        const matchingTags = FILTER_TAGS.filter((tag) =>
          selectedTags.includes(tag.label),
        );
        return matchingTags.some((tag) => speakerMatchesTag(speaker, tag));
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q) ||
          s.theme.toLowerCase().includes(q) ||
          s.year.toString().includes(q),
      );
    }

    return results;
  }, [allSpeakers, searchQuery, selectedTags, selectedYears]);

  const hasActiveFilters =
    searchQuery.trim() || selectedTags.length > 0 || selectedYears.length > 0;

  const clearAll = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedYears([]);
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FILTER_TAGS.forEach((tag) => {
      let pool = allSpeakers;
      if (selectedYears.length > 0) {
        pool = pool.filter((s) => selectedYears.includes(s.year));
      }
      counts[tag.label] = pool.filter((s) => speakerMatchesTag(s, tag)).length;
    });
    return counts;
  }, [allSpeakers, selectedYears]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-2 top-2 bottom-2 sm:inset-x-8 sm:top-8 sm:bottom-8 md:inset-x-[18%] md:top-[12%] md:bottom-[12%] lg:inset-x-[22%] bg-neutral-950 border border-white/[0.08] rounded-xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 space-y-3">
              {/* Search Input */}
              <div className="relative flex items-center">
                <svg
                  className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search speakers..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-16 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
                    >
                      ✕
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-gray-600 bg-white/[0.04] border border-white/[0.08] rounded font-mono">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-2">
                {/* Years */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium shrink-0 mr-0.5">
                    Year
                  </span>
                  <div className="flex overflow-x-auto gap-1.5 no-scrollbar -mr-4 pr-4 sm:mr-0 sm:pr-0 sm:flex-wrap">
                    {allYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          selectedYears.includes(year)
                            ? "bg-white text-black"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Tags */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium shrink-0 mr-0.5">
                    Topic
                  </span>
                  <div className="flex overflow-x-auto gap-1.5 no-scrollbar -mr-4 pr-4 sm:mr-0 sm:pr-0 sm:flex-wrap">
                    {FILTER_TAGS.map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => toggleTag(tag.label)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
                          selectedTags.includes(tag.label)
                            ? "bg-white text-black"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="text-xs">{tag.icon}</span>
                        {tag.label}
                        <span
                          className={`text-[10px] ${
                            selectedTags.includes(tag.label)
                              ? "text-black/50"
                              : "text-gray-700"
                          }`}
                        >
                          {tagCounts[tag.label]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results count + clear */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                  <p className="text-xs text-gray-500">
                    <span className="text-white font-medium">
                      {filteredSpeakers.length}
                    </span>{" "}
                    result{filteredSpeakers.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {!hasActiveFilters ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 px-6">
                  <p className="text-sm">Type to search or use filters above</p>
                  <p className="text-xs mt-1 text-gray-700">
                    {allSpeakers.length} speakers · {allYears.length} years
                  </p>
                </div>
              ) : filteredSpeakers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 px-6">
                  <p className="text-sm">No results found</p>
                  <p className="text-xs mt-1 text-gray-700">
                    Try different filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {filteredSpeakers.map((speaker, idx) => {
                    const matchedTags = FILTER_TAGS.filter((tag) =>
                      speakerMatchesTag(speaker, tag),
                    );

                    return (
                      <motion.div
                        key={`${speaker.year}-${speaker.name}-${idx}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.02, 0.2) }}
                        className="group"
                      >
                        {/* Image */}
                        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-white/[0.03] mb-2">
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{
                              objectPosition: speaker.imagePosition || "center",
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <span className="absolute top-1.5 right-1.5 text-[9px] sm:text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded">
                            {speaker.year}
                          </span>

                          {speaker.tedTalkUrl && (
                            <a
                              href={speaker.tedTalkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-1.5 right-1.5 text-[10px] sm:text-[11px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                            >
                              Watch →
                            </a>
                          )}
                        </div>

                        {/* Info */}
                        <div className="px-0.5">
                          <h4 className="font-medium text-white text-xs sm:text-sm leading-tight truncate">
                            {speaker.name}
                          </h4>
                          <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 truncate">
                            {speaker.topic}
                          </p>
                          {matchedTags.length > 0 && (
                            <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                              {matchedTags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag.label}
                                  className="text-[9px] sm:text-[10px] text-gray-600"
                                >
                                  {tag.icon}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 flex items-center justify-center rounded-md text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-colors text-sm"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- COMPONENT: YEAR SECTION ---
const YearSection = ({
  year,
  data,
  onInView,
  imageRef,
}: {
  year: number;
  data: (typeof yearContent)[number];
  onInView: (year: number) => void;
  imageRef?: React.RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      onInView(year);
    }
  }, [isInView, year, onInView]);

  return (
    <section
      id={`year-section-${year}`}
      ref={ref}
      className="min-h-[100svh] py-24 relative border-b border-white/5 z-10"
    >
      <div className="w-full px-4 relative md:container md:mx-auto relative md:ml-20 flex flex-col items-center md:block md:items-start">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-end mb-16 w-full">
          <div
            ref={imageRef}
            className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border-2 border-cyan-500/20 shadow-2xl group"
          >
            <Image
              src={data.themeImage}
              alt={data.theme}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={data.themeImage.startsWith("http")}
              className="object-cover transition-transform duration-700 group-hover:scale-105 scale-[var(--theme-scale)]"
              style={
                {
                  "--theme-scale": data.themeImageScale || 1,
                } as React.CSSProperties
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">
                {year}
              </h2>
              <h3 className="text-2xl md:text-3xl text-cyan-400 font-light">
                {data.theme}
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-6">
            <p className="text-xl md:text-2xl text-cyan-100/80 italic border-l-4 border-cyan-500 pl-6">
              &ldquo;{data.description}&rdquo;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 place-items-center md:place-items-start">
          {data.speakers.map((speaker, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group w-[280px] flex flex-col items-center md:items-start !mx-auto md:mx-0"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 280px, 33vw"
                  unoptimized={speaker.image.startsWith("http")}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    objectPosition: speaker.imagePosition || "center",
                  }}
                />
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-bold text-white text-xl mb-1">
                  {speaker.name}
                </h4>
                <p className="text-cyan-400 text-sm mb-2">{speaker.topic}</p>
                {speaker.tedTalkUrl && (
                  <a
                    href={speaker.tedTalkUrl}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-white underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors"
                  >
                    Watch Talk &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function RewindPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(2025);
  const [searchOpen, setSearchOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom =
          heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsSticky(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const sortedYears = Object.keys(yearContent)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <main className="relative bg-black text-white min-h-screen">
        {/* SEARCH PANEL */}
        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* FLOATING SEARCH BUTTON - mobile: bottom-24 to clear safe area, z-[60] above everything */}
        <motion.button
          onClick={() => setSearchOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-[60] w-12 h-12 sm:w-14 sm:h-14 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400/60 rounded-full flex items-center justify-center text-cyan-300 hover:text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Search speakers (Ctrl+K)"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {/* Hide keyboard shortcut tooltip on mobile */}
          <span className="absolute -top-10 right-0 px-2 py-1 bg-black/90 border border-white/10 rounded-md text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            ⌘K
          </span>
        </motion.button>

        {/* HERO SECTION */}
        <div
          ref={heroRef}
          className="relative h-[80vh] w-full overflow-hidden bg-black flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <DomeGallery
              fit={0.7}
              minRadius={800}
              grayscale={false}
              overlayBlurColor="rgba(0,0,0,0.5)"
            />
          </div>

          <div className="relative z-10 text-center px-6 pointer-events-none">
            <motion.h1
              className="text-6xl md:text-8xl font-bold leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              TEDx <span className="text-[#FF3A3A]">Rewind</span>
            </motion.h1>
          </div>
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="relative z-10 w-full flex flex-col items-center md:flex-row md:items-start gap-12 px-6 md:px-12">
          {/* MOBILE YEAR SELECTOR - now includes inline search button */}
          <div className="md:hidden w-full mb-2 sticky top-[66px] z-40">
            <div className="flex items-center gap-2 py-3 no-scrollbar bg-black/80 backdrop-blur-xl border-b border-white/10 -mx-6 px-4">
              {/* Inline search button for mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 active:scale-95 transition-all"
                aria-label="Search speakers"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Divider between search and year pills */}
              <div className="w-px h-6 bg-white/10 shrink-0" />

              {/* Scrollable year pills */}
              <div className="flex overflow-x-auto gap-2 no-scrollbar">
                {sortedYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0
                      ${
                        activeYear === year
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                          : "text-gray-400 hover:text-white border border-transparent"
                      }
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: Main Content (Tab View) */}
          <div className="flex-1 min-h-[60vh] max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <YearSection
                  year={activeYear}
                  data={yearContent[activeYear]}
                  onInView={() => {}}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Desktop Year Selector */}
          <div className="hidden md:flex flex-col w-32 lg:w-48 relative shrink-0 ml-12 md:ml-24 mr-8 md:mr-32 min-h-[200px]">
            <AnimatePresence>
              {isSticky && !footerVisible && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: 50,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed top-32 lg:top-40 right-8 md:right-32 z-50 w-32 lg:w-48"
                >
                  <div className="relative flex flex-col gap-1.5 px-6 py-14 bg-black/60 backdrop-blur-2xl border-2 border-white/60 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />

                    {sortedYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`relative flex items-center justify-center p-1.5 text-xl lg:text-[1.75rem] font-bold tracking-wide transition-all duration-300 w-full group font-serif
                          ${
                            activeYear === year
                              ? `text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`
                              : `text-gray-500 hover:text-gray-300 hover:scale-105`
                          }
                        `}
                      >
                        {activeYear === year && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        {year}
                      </button>
                    ))}

                    <div className="border-t border-white/20 mt-2 pt-3">
                      <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-white/5 hover:bg-cyan-500/15 text-gray-400 hover:text-cyan-300 transition-all text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        Search
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
