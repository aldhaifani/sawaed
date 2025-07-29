import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-24 md:px-8 lg:px-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-3xl text-lg">
          Find answers to common questions about how Sawaed can help you
          showcase your talents and develop your skills.
        </p>
      </div>

      <Accordion type="single" collapsible className="mx-auto w-full max-w-4xl">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            How is Sawaed different from a typical job platform?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>
              Job platforms are for the final step: applying. Sawaed is for
              everything that comes <em>before</em> it. We are a{" "}
              <strong>showcasing and development platform</strong>. Here, you
              build a dynamic profile that truly represents your skills and
              projects, get personalized guidance to improve, and <em>then</em>{" "}
              discover a wide range of opportunities (internships, volunteering,
              and jobs) that match your unique, well-prepared profile.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            Who is Sawaed for?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>
              Sawaed is designed for two main groups: Omani youth (typically
              16-25) looking to build their skills and showcase their talents,
              and all institutions in Oman (public and private) that want to
              discover and connect with the nation&apos;s emerging talent.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            How does the personalized guidance work?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>
              Our smart system analyzes the skills you have and the goals you
              set. It then identifies gaps and recommends specific courses,
              workshops, and activities to build the skills that are in high
              demand. Every skill you gain is automatically added to your
              profile, making it stronger and more visible to institutions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">
            How is my personal data protected?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>
              Your privacy and data security are our top priority. Nawafidh is
              built on a secure infrastructure with strict privacy controls. You
              are always in control of the information you share on your public
              profile, and your personal contact details are only made visible
              to institutions when you actively apply for an opportunity.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">
            What if I don&apos;t have much experience to showcase yet?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              That&apos;s exactly why Sawaed exists! The platform is designed to help
              you <em>build</em> your experience from the ground up. You can
              start by adding your academic skills, participating in
              volunteering opportunities, or joining workshops listed on the
              platform. Every step you take helps build your profile over time.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
