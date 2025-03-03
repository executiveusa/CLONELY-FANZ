import { faker } from "@faker-js/faker";

type AvatarNiche =
  | "Fashion"
  | "Lifestyle"
  | "Tech"
  | "Gaming"
  | "Art"
  | "Fitness";

export interface GeneratedAvatar {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  niche: AvatarNiche;
  isNsfw: boolean;
  subscriberCount: number;
  messageCount: number;
  likeCount: number;
}

const niches: AvatarNiche[] = [
  "Fashion",
  "Lifestyle",
  "Tech",
  "Gaming",
  "Art",
  "Fitness",
];

export function generateAvatar(): GeneratedAvatar {
  const niche = niches[Math.floor(Math.random() * niches.length)];

  return {
    id: faker.string.uuid(),
    name: faker.person.firstName() + " " + faker.person.lastName().charAt(0),
    description: faker.lorem.paragraph(1),
    imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.string.uuid()}`,
    niche,
    isNsfw: false,
    subscriberCount: faker.number.int({ min: 100, max: 10000 }),
    messageCount: faker.number.int({ min: 10, max: 1000 }),
    likeCount: faker.number.int({ min: 100, max: 50000 }),
  };
}

export function generateAvatars(count: number): GeneratedAvatar[] {
  return Array.from({ length: count }, generateAvatar);
}
