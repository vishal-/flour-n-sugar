import type { Metadata } from "next";
import { ContentSection, StaticPageHero } from "../../../components/static/StaticPageComponents";

export const metadata: Metadata = {
  title: "Privacy Policy | Flour n Sugar",
  description: "Read the Flour n Sugar privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <StaticPageHero
        eyebrow="Your privacy matters"
        title="Privacy Policy"
        intro="This policy explains what information Flour n Sugar collects, why we use it, and the choices available to you. Last updated: August 18, 2026."
      />
      <div className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
        <ContentSection title="Information we collect">
          <p>We collect information you provide when you create an account or profile, such as your name, email address, location, profile details, and baker information. We also collect content you choose to publish, including menus, photos, and descriptions.</p>
          <p>When you use the platform, we may collect basic technical information such as device, browser, and usage details to keep the service secure and improve the experience.</p>
        </ContentSection>
        <ContentSection title="How we use information">
          <p>We use information to provide and personalize Flour n Sugar, display baker profiles, help customers discover relevant listings, communicate about the service, prevent misuse, and maintain platform security.</p>
          <p>We do not sell your personal information. When you choose to contact a baker through a third-party service such as WhatsApp, that service handles the interaction under its own privacy policy.</p>
        </ContentSection>
        <ContentSection title="Sharing and retention">
          <p>Information you publish on a baker profile is visible to people using the platform. We may share information with service providers who help us operate authentication, hosting, analytics, and security, subject to appropriate safeguards.</p>
          <p>We retain information for as long as needed to provide the service, meet legal obligations, resolve disputes, and enforce our agreements.</p>
        </ContentSection>
        <ContentSection title="Your choices">
          <p>You can review or update profile information through the platform. You may ask us to delete your account or personal information, subject to information we must retain for legal or security reasons.</p>
          <p>For privacy questions or requests, contact us through the support channel available in the platform.</p>
        </ContentSection>
      </div>
    </>
  );
}