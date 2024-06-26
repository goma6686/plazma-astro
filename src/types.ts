import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  postPerPage: number;
  eventPerPage: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
