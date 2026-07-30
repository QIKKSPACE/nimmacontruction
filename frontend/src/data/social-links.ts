import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export interface SocialLink {
  name: string;
  href: string;
  icon: typeof Facebook;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/nimmametro-constructions/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nimmametro.constructions/",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@NimmametroConstructions",
    icon: Youtube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589181065897",
    icon: Facebook,
  },
];
