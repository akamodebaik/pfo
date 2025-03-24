export interface Friend {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  social: {
    tiktok?: string;
    github?: string;
  };
}

export const friendsData: Friend[] = [
  {
    id: 1,
    name: "Youso",
    role: "sesepuh",
    description: "my good friend, who taught me a lot and is a senior programmer ",
    image: "https://nauval.mycdn.biz.id/download/1741883430170.jpeg",
    social: {
      tiktok: "https://www.tiktok.com/@youu_soo?_t=ZS-8ugHFmyX78H&_r=1",
    }
  },
  {
    id: 2,
    name: "Hydra",
    role: "developer bot WhatsApp",
    description: "a WhatsApp bot expert and very kind, friendly d",
    image: "https://nauval.mycdn.biz.id/download/1741970090491.jpeg",
    social: {
      tiktok: "https://www.tiktok.com/@genzo_am?_t=ZS-8ugI0eDEwia&_r=1",
    }
  },
  {
    id: 3,
    name: "Raol",
    role: "full stack enginer",
    description: "a peer of mine who has extraordinary skills in programming",
    image: "https://nauval.mycdn.biz.id/download/1741970484973.jpeg",
    social: {
      github: "https://github.com/latesturl"
    }
  }
];
