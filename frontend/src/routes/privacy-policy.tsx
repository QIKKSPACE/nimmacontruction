
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";



export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 container-x">
        <h1 className="text-3xl font-display font-bold mb-8 text-[color:var(--gold)]">Privacy Policy</h1>
        <div className="prose max-w-none text-muted-foreground space-y-6">
          <p>
            At Nimmametro Constructions, we respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you as to how we look after your personal data when you visit our website
            and tell you about your privacy rights and how the law protects you.
          </p>
          <h2 className="text-xl font-bold text-foreground">1. Important information and who we are</h2>
          <p>
            This privacy policy aims to give you information on how Nimmametro Constructions collects and processes
            your personal data through your use of this website.
          </p>
          <h2 className="text-xl font-bold text-foreground">2. The data we collect about you</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you, including your name,
            contact information, and browsing data to improve our services and communication.
          </p>
          <h2 className="text-xl font-bold text-foreground">3. How we use your personal data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal
            data to provide you with the services you requested, or where it is necessary for our legitimate interests.
          </p>
          <h2 className="text-xl font-bold text-foreground">4. Data security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used, or accessed in an unauthorized way, altered, or disclosed.
          </p>
          <p className="pt-8 text-sm italic">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
