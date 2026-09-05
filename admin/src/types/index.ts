export type ProjectCategory = "plotted" | "farmland" | "other";

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

export type LeadTitle = string;

export type LeadType = 
  | "Plotted Development" 
  | "Farmland Development" 
  | "Compound Wall" 
  | "Customized Construction" 
  | "Layout Approvals" 
  | "Others";

export type SiteVisitType = "None" | "Site Visit Scheduled" | "Meeting Scheduled" | "Visit Completed" | "Cancelled";

export type LeadStatus = 
  | "New" 
  | "Contacted" 
  | "Follow-up Scheduled" 
  | "Site Visit Scheduled" 
  | "Negotiation" 
  | "Converted" 
  | "Lost";

export type LostReason = 
  | "Budget" 
  | "Location" 
  | "No Response" 
  | "Competitor" 
  | "Changed Mind" 
  | "Others";

export type LeadNote = {
  id: string;
  text: string;
  date: string;
};

export type LeadAttachment = {
  id: string;
  name: string;
  url: string;
  fileType?: string;
  date?: string;
};

export type Lead = {
  id: string;
  title: LeadTitle;
  name: string;
  phone: string;
  email?: string;
  siteVisit: SiteVisitType;
  siteVisitDate?: string;
  leadType: LeadType;
  enquiryDate: string;
  status: LeadStatus;
  nextFollowup?: string;
  remarks?: string;
  notesHistory?: LeadNote[];
  attachments?: LeadAttachment[];
  lostReason?: LostReason | string;
  createdAt?: string;
};

export type InvoiceItem = {
  slNo: number | string;
  description: string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
  showRates?: boolean;
  showSlNo?: boolean;
  showUnit?: boolean;
  showQty?: boolean;
  showRate?: boolean;
  showAmount?: boolean;
};

export type BankDetails = {
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branch: string;
};

export type Invoice = {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  docType: "QUOTATION" | "INVOICE";
  customerName: string;
  customerAddress?: string;
  siteName?: string;
  subject?: string;
  coverLetter?: string;
  scopeItems?: string[];
  items: InvoiceItem[];
  subtotal: number;
  showSubtotal?: boolean;
  showColumnSlNo?: boolean;
  showColumnUnit?: boolean;
  showColumnQty?: boolean;
  showColumnRate?: boolean;
  showColumnAmount?: boolean;
  includeGst?: boolean;
  gstPercent: number;
  gstAmount: number;
  grandTotal: number;
  showGrandTotal?: boolean;
  terms?: string;
  bankDetails?: BankDetails;
  createdAt?: string;
};
