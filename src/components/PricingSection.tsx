import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnterpriseSalesModal from "@/components/EnterpriseSalesModal";

const tiers = [
  {
    name: "Starter",
    planKey: "starter",
    audience: "For small fintechs",
    features: ["Basic reporting tools", "Limited submissions", "Email support", "Standard dashboard"],
    cta: "Contact Sales",
    highlight: false,
    message: "I am interested in the Starter plan for small fintechs. Please contact me to discuss pricing.",
  },
  {
    name: "Growth",
    planKey: "growth",
    audience: "For scaling institutions",
    features: ["Advanced reporting", "Monitoring dashboard", "Priority support", "Multi-user access"],
    cta: "Contact Sales",
    highlight: true,
    message: "I am interested in the Growth plan for scaling institutions. Please contact me to discuss pricing.",
  },
  {
    name: "Enterprise",
    planKey: "enterprise",
    audience: "For large banks",
    features: ["Full compliance suite", "Dedicated compliance specialist", "Custom integrations", "SLA guarantee"],
    cta: "Contact Sales",
    highlight: false,
    message: "I am interested in the Enterprise plan for large banks. Please contact me to discuss pricing.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

const CUSTOM_QUOTE_MESSAGE = "I would like to request a custom quote for RegCo. Please contact me to discuss my institution's specific needs.";

const PricingSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (msg: string) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Plans that grow with your compliance needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i + 1}
                className={`rounded-2xl p-7 border flex flex-col ${
                  tier.highlight
                    ? "border-primary card-elevated-lg ring-2 ring-primary/20"
                    : "border-border/60 card-elevated"
                }`}
              >
                {tier.highlight && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">{tier.audience}</p>
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlight ? "default" : "outline"}
                  className="rounded-full w-full hover:scale-[1.02] transition-transform"
                  onClick={() => openModal(tier.message)}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="ghost"
              className="text-primary font-semibold hover:scale-[1.02] transition-transform"
              onClick={() => openModal(CUSTOM_QUOTE_MESSAGE)}
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      <EnterpriseSalesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultMessage={modalMessage}
      />
    </>
  );
};

export default PricingSection;
