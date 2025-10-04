import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  CheckCircle,
  Bell,
  Shield,
  Zap,
  Users,
  ChevronRight,
  AlertCircle,
  Settings,
  BarChart,
} from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                KekaBuddy
              </span>
            </div>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </button>
            </div>
            <Button
              onClick={() => scrollToSection("pricing")}
              className="hidden md:flex bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Get Access - $5
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" role="banner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">
                Chrome Extension
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Never Forget to Clock In or Out on Keka Again
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Automate attendance with a simple Chrome extension. Save time,
              avoid tickets, and focus on your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button
                size="lg"
                onClick={() => scrollToSection("pricing")}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
              >
                Get Lifetime Access – $5
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("how-it-works")}
                className="text-lg px-8 py-6 border-2"
              >
                See How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              One-time payment • Lifetime access • No subscription
            </p>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="problem-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="problem-section"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Tired of Missing Clock-Ins and Raising Tickets?
            </h2>
            <p className="text-xl text-muted-foreground">
              We've all been there. Here's what happens when you forget:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: AlertCircle,
                title: "Absent Mark",
                desc: "Forgetting to clock in/out = absent mark on your record",
              },
              {
                icon: Bell,
                title: "Constant Tickets",
                desc: "Repeatedly raising tickets to HR wastes everyone's time",
              },
              {
                icon: Clock,
                title: "Daily Stress",
                desc: "Worrying about attendance every single day",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:shadow-lg transition-shadow border-2"
              >
                <div className="inline-flex p-3 rounded-full bg-destructive/10 mb-4">
                  <item.icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center mt-12 text-lg text-muted-foreground italic max-w-2xl mx-auto">
            I built this extension because I faced the same frustrations as a
            developer. No more missing clock-ins!
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        aria-labelledby="how-it-works-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              id="how-it-works-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Automated Attendance, Hassle-Free
            </h2>
            <p className="text-xl text-muted-foreground">
              Set it up once, then forget about it forever
            </p>
          </div>
          
          {/* Visual How It Works Image */}
          <div className="mb-16 flex flex-col items-center px-4 sm:px-0">
            <div className="relative max-w-5xl w-full group">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl group-hover:blur-xl sm:group-hover:blur-2xl transition-all duration-500"></div>
              <img
                src="/how_it_works.png"
                alt="How KekaBuddy Works - Visual Guide"
                className="relative w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border-2 sm:border-4 border-primary/20 hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] group-hover:border-primary/40"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl sm:rounded-2xl group-hover:from-black/5 transition-all duration-300"></div>
            </div>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground text-center max-w-2xl italic px-4">
              See exactly how the extension automates your attendance with this visual walkthrough
            </p>
          </div>

          {/* Step-by-Step Process */}
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Settings,
                num: "1",
                title: "Set Your Schedule",
                desc: "Choose office in/out times & duration",
              },
              {
                icon: Bell,
                num: "2",
                title: "Smart Alarms",
                desc: "Extension checks every 15 mins",
              },
              {
                icon: CheckCircle,
                num: "3",
                title: "Auto Clock-In/Out",
                desc: "Keka attendance updated automatically",
              },
              {
                icon: Zap,
                num: "4",
                title: "Notifications",
                desc: "Alerts if something needs attention",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <Card className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 border-2 h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                    {step.num}
                  </div>
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4 mt-2">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </Card>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with simplicity and reliability in mind
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "One-time Setup",
                desc: "Configure once, then forget about it completely",
              },
              {
                icon: BarChart,
                title: "Works in Background",
                desc: "No need to keep tabs open or think about it",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Runs locally in your browser, data stays with you",
              },
              {
                icon: CheckCircle,
                title: "No API Required",
                desc: "Works directly with Keka website, no complex setup",
              },
              {
                icon: Users,
                title: "Developer-Made",
                desc: "Built by a developer for developers who get it",
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                desc: "Get alerted only when something needs attention",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-2"
              >
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="pricing-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Simple Pricing. Lifetime Access.
            </h2>
            <p className="text-xl text-muted-foreground">
              No subscriptions, no hidden fees, just one simple payment
            </p>
          </div>
          <Card className="max-w-lg mx-auto p-8 border-4 border-primary shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 text-sm font-bold transform rotate-12 translate-x-8 -translate-y-2">
              BEST VALUE
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Lifetime Access</h3>
              <div className="mb-6">
                <span className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  $5
                </span>
                <span className="text-xl text-muted-foreground ml-2">
                  one-time
                </span>
              </div>
              <div className="space-y-3 text-left mb-8">
                {[
                  "Lifetime access to source code",
                  "Step-by-step setup guide",
                  "Free updates forever",
                  "Works with Keka platform",
                  "Secure browser-based solution",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                onClick={() =>
                  window.open(
                    "https://buymeacoffee.com/programmerraja",
                    "_blank"
                  )
                }
              >
                Get Lifetime Access Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Secure payment via Buy Me A Coffee
              </p>
            </div>
          </Card>
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              <strong>Why $5?</strong> This one-time fee supports ongoing
              development and keeps the extension maintained and updated. No
              subscriptions, no recurring charges – just lifetime access.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="faq-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Do I need coding knowledge to use this?",
                a: "Not at all! Just follow the step-by-step setup guide included with your purchase. If you can install a Chrome extension, you can use this.",
              },
              {
                q: "Will my data be safe?",
                a: "Absolutely. Everything runs locally in your browser. The extension doesn't send your data anywhere – it just automates clicking on the Keka website for you.",
              },
              {
                q: "Why is it $5?",
                a: "It's a one-time lifetime access fee to support development and maintenance. No subscriptions, no hidden costs – just one payment for lifetime access and updates.",
              },
              {
                q: "Does this work with the Keka platform?",
                a: "Yes! This extension is specifically built to work with Keka's attendance system. It automates the clock-in/out process directly on their platform.",
              },
              {
                q: "Will I get updates?",
                a: "Yes! Your $5 purchase includes all future updates for free. As Keka updates their platform or Chrome updates, I'll keep the extension working smoothly.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Wasting Time. Automate Your Attendance Today!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join developers who never worry about clock-ins again. One-time
            payment, lifetime solution.
          </p>
          <Button
            size="lg"
            onClick={() =>
              window.open("https://buymeacoffee.com/programmerraja", "_blank")
            }
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            Get Lifetime Access – $5
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-6 text-sm opacity-75">
            Lifetime access • Free updates • Priority support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">KekaBuddy</span>
          </div>
          <p className="text-sm">
            Built by a developer, for developers. Never miss a clock-in again.
          </p>
          <p className="text-xs mt-4">
            © 2025 programmerraja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
