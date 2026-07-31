export type ProjectCategory = "plotted" | "farmland";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export type ProjectSpec = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  location: string;
  subLocation: string;
  status: ProjectStatus;
  img: string;
  gallery: string[];
  description: string;
  highlights?: string[];
  specs?: ProjectSpec[];
  amenities?: string[];
  developmentArea?: string;
  googleMap?: string;
  youtubeVideo?: string;
  instagramVideo?: string;
  infrastructureWorks?: string[];
};

export type EnquiryStatus = "New" | "Contacted" | "Resolved";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: EnquiryStatus;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
