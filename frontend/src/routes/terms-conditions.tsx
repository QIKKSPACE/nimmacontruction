import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute('/terms-conditions')({
  component: TermsConditions,
})

function TermsConditions() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 container-x">
        <h1 className="text-3xl font-display font-bold mb-8 text-[color:var(--gold)]">Terms & Conditions</h1>
        <div className="prose max-w-none text-muted-foreground space-y-6">
          <p>
            Welcome to Nimmametro Constructions. These terms and conditions outline the rules and regulations for the
            use of our website and services.
          </p>
          <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use
            Nimmametro Constructions if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2 className="text-xl font-bold text-foreground">2. Services and Projects</h2>
          <p>
            All information provided on our plotted and farmland development projects, including availability, pricing,
            and layout details, is subject to change without prior notice. The layout plans and images shown are for
            representation purposes only.
          </p>
          <h2 className="text-xl font-bold text-foreground">3. User Responsibilities</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not infringe the rights of,
            restrict or inhibit anyone else's use and enjoyment of the website.
          </p>
          <h2 className="text-xl font-bold text-foreground">4. Limitation of Liability</h2>
          <p>
            Nimmametro Constructions shall not be held liable for any direct, indirect, incidental, or consequential
            damages arising out of the use or inability to use the information and services provided on this website.
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
