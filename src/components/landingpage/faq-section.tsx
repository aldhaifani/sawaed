"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/providers/i18n-provider";

export default function FaqSection() {
  const { t } = useI18n();
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-24 md:px-8 lg:px-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("faq.heading")}</h2>
        <p className="mx-auto max-w-3xl text-lg">{t("faq.intro")}</p>
      </div>

      <Accordion type="single" collapsible className="mx-auto w-full max-w-4xl">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">{t("faq.q1")}</AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>{t("faq.a1")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">{t("faq.q2")}</AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>{t("faq.a2")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">{t("faq.q3")}</AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>{t("faq.a3")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">{t("faq.q4")}</AccordionTrigger>
          <AccordionContent className="text-lg">
            <p>{t("faq.a4")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">{t("faq.q5")}</AccordionTrigger>
          <AccordionContent>
            <p>{t("faq.a5")}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
