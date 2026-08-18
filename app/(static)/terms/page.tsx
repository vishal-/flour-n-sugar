import type { Metadata } from "next";
import { ContentSection, StaticPageHero } from "../../../components/static/StaticPageComponents";

export const metadata: Metadata = {
  title: "Terms and Conditions | Flour n Sugar",
  description: "Read the Flour n Sugar terms and conditions.",
};

export default function TermsPage() {
  return (
    <>
      <StaticPageHero
        eyebrow="Please read carefully"
        title="Terms and Conditions"
        intro="These terms describe the rules for using Flour n Sugar. By using the platform, you agree to follow them. Last updated: August 18, 2026."
      />
      <div className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
        <ContentSection title="Using Flour n Sugar">
          <p>Flour n Sugar is a platform that helps customers discover independent bakers and contact them directly. You must provide accurate information, keep your account secure, and use the platform only for lawful purposes.</p>
          <p>You are responsible for activity on your account and for the content you publish. You must be at least 18 years old, or use the platform with the involvement and consent of a parent or legal guardian.</p>
        </ContentSection>
        <ContentSection title="Baker profiles and orders">
          <p>Bakers are independent sellers responsible for their products, pricing, availability, food preparation, licensing, delivery, and customer communications. Flour n Sugar does not prepare, sell, deliver, or guarantee any food product listed by a baker.</p>
          <p>Any order, payment, refund, cancellation, or delivery arrangement is made directly between the customer and the baker. Customers should discuss ingredients, allergens, customization, and timing with the baker before ordering.</p>
        </ContentSection>
        <ContentSection title="Content and conduct">
          <p>You retain ownership of content you submit, but give Flour n Sugar permission to host, display, and promote it as needed to operate the platform. Do not upload content that is misleading, unlawful, infringing, abusive, or unsafe.</p>
          <p>We may remove content, restrict accounts, or suspend access when necessary to protect users, the platform, or our legal rights.</p>
        </ContentSection>
        <ContentSection title="Availability and liability">
          <p>We work to keep the platform useful and available, but it may change, pause, or contain errors. Flour n Sugar is not responsible for the acts, products, communications, or agreements of independent bakers or customers.</p>
          <p>To the extent permitted by law, the platform is provided without warranties beyond those that cannot legally be excluded.</p>
        </ContentSection>
        <ContentSection title="Changes and contact">
          <p>We may update these terms as the platform evolves. Continued use after an update means you accept the revised terms. Questions about these terms should be sent through the support channel available in the platform.</p>
        </ContentSection>
      </div>
    </>
  );
}