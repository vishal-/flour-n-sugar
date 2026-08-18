import type { Metadata } from "next";
import { ContentSection, StaticPageHero } from "../../../components/static/StaticPageComponents";

export const metadata: Metadata = {
  title: "About Us | Flour n Sugar",
  description: "Learn how Flour n Sugar helps people discover talented local home bakers.",
};

export default function AboutPage() {
  return (
    <>
      <StaticPageHero
        eyebrow="Our story"
        title="Good things are better when they are made close to home."
        intro="Flour n Sugar brings dessert lovers and passionate home bakers together, so every order can feel personal, fresh, and worth celebrating."
      />
      <div className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
        <ContentSection title="A marketplace with a little more heart">
          <p>We built Flour n Sugar for the bakers whose best work starts in a home kitchen and for the people who would rather order something made with care than something made for everyone.</p>
          <p>Our platform makes it simple to discover independent bakers nearby, explore what they make, and connect with them directly about your next celebration or craving.</p>
        </ContentSection>
        <ContentSection title="What we believe">
          <p>Local talent deserves to be seen. Every baker has a style, a story, and a reason they started baking. We give them a place to showcase that work while helping customers find treats that feel personal.</p>
          <p>We also believe the best food conversations happen directly. Bakers and customers can discuss flavors, custom details, timing, and pickup or delivery arrangements before an order is made.</p>
        </ContentSection>
        <ContentSection title="For bakers and dessert lovers">
          <p>Bakers can create a profile, share their menu, and grow their reach. Customers can browse local options and discover the person behind the bake.</p>
          <p>Flour n Sugar is here to make that connection easier, one thoughtful bake at a time.</p>
        </ContentSection>
      </div>
    </>
  );
}