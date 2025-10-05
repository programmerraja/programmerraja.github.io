import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Brain, 
  FileText, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Lock,
  Clock,
  Copy,
  ListX,
  Sparkles,
  Upload,
  Settings,
  Github,
  Twitter,
  Linkedin,
  Coffee
} from "lucide-react";
import { useState } from "react";
import heroMockup from "@/assets/preview.png";

const Index = () => {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm">
              <span>Chrome Extension • One-Time Payment • Lifetime Access</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
              AI-Powered Interview Assistant
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground lg:text-2xl">
              Instantly Generate Smart Questions from Any Resume
            </p>
            
            <p className="mx-auto mb-10 max-w-3xl text-lg text-foreground/80">
              Upload a resume, and HireZen creates personalized interview questions for you in seconds — no logins, no hassle.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="hero" className="text-lg">
                Get Lifetime Access – $5
                <ArrowRight className="ml-2" />
              </Button>
              {/* <Button size="lg" variant="outline" onClick={() => setShowVideoDialog(true)}>
                View Demo
              </Button> */}
            </div>
            
            <div className="mt-16">
              <img 
                src={heroMockup} 
                alt="HireZen Chrome Extension Interface showing AI-generated interview questions"
                className="w-full rounded-lg border border-primary/20 shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                Interview Prep <span className="text-gradient">Shouldn't Be This Hard</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Traditional interview preparation wastes hours of your valuable time
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="gradient-card border-border/50 group hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover:bg-amber-500/30 transition-all" />
                      <div className="relative rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 border border-amber-500/20">
                        <Clock className="h-8 w-8 text-amber-500" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Hours Wasted</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Manually reviewing resumes and crafting questions for each candidate takes forever
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border/50 group hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full group-hover:bg-slate-500/30 transition-all" />
                      <div className="relative rounded-full bg-gradient-to-br from-slate-500/20 to-gray-500/20 p-4 border border-slate-500/20">
                        <Copy className="h-8 w-8 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Generic Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Using the same template questions for every candidate misses key insights
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border/50 group hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/30 transition-all" />
                      <div className="relative rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 p-4 border border-red-500/20">
                        <ListX className="h-8 w-8 text-red-400" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Scattered Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Juggling between resume PDFs, notes, and ChatGPT tabs is messy and inefficient
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">The Solution</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
                Meet <span className="text-gradient">HireZen</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your AI-powered interview assistant that transforms resume prep into a seamless, intelligent experience
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <Card className="gradient-card border-primary/20 group hover:border-primary/40 transition-all duration-300 hover:shadow-glow overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                      <div className="relative rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-4 border border-primary/30">
                        <Brain className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">AI-Powered Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">
                    Get resume-specific, insightful questions tailored to each candidate's unique background and experience
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-primary/20 group hover:border-primary/40 transition-all duration-300 hover:shadow-glow overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full animate-pulse" />
                      <div className="relative rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 p-4 border border-accent/30">
                        <Upload className="h-10 w-10 text-accent" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Instant Analysis</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">
                    Upload any PDF resume and watch HireZen instantly extract and analyze the key information
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-primary/20 group hover:border-primary/40 transition-all duration-300 hover:shadow-glow overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                      <div className="relative rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-4 border border-primary/30">
                        <Zap className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Seamless Integration</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">
                    Access your personalized questions directly in Google Meet without ever switching tabs
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm px-6 py-3">
                <Settings className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Works with GPT-4, Claude, Gemini & more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold lg:text-4xl">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="mb-16 text-center text-lg text-muted-foreground">
              Three simple steps to smarter interviews
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Upload Resume</h3>
                  <p className="text-muted-foreground">
                    Simply drag and drop the candidate's PDF resume into HireZen's sidebar
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Choose AI Model</h3>
                  <p className="text-muted-foreground">
                    Select your preferred AI model (GPT-4, Claude, Gemini) using your own API key
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Get Questions Instantly</h3>
                  <p className="text-muted-foreground">
                    Receive personalized interview questions you can copy, print, or share immediately
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="gradient-card border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Your Data Stays Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground">
                  Your data stays in your browser. API keys and resumes never leave your computer. 
                  HireZen processes everything locally for maximum security.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary">
                  <Lock className="h-4 w-4" />
                  <span>End-to-end privacy guaranteed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-center text-3xl font-bold lg:text-4xl">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
            <p className="mb-12 text-center text-lg text-muted-foreground">
              One payment. Lifetime access. No subscriptions.
            </p>
            
            <Card className="gradient-card border-primary/30 shadow-glow">
              <CardHeader className="text-center">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-gradient">$5</div>
                  <div className="mt-2 text-sm text-muted-foreground">One-time payment</div>
                </div>
                <CardTitle className="text-2xl">Lifetime Access</CardTitle>
                <CardDescription className="text-base">
                  Less than the cost of a coffee – save hours of prep time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>Unlimited resume uploads</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>All AI models supported</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>Google Meet integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>Lifetime updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>Priority support</span>
                  </div>
                </div>
                
                <Button size="lg" variant="hero" className="w-full">
                  Get Lifetime Access Now
                  <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold lg:text-4xl">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="mb-12 text-center text-lg text-muted-foreground">
              Everything you need to know about HireZen
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Does it work with all resumes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! HireZen works with any PDF resume format. Simply upload the file and the AI will analyze 
                  the content to generate relevant interview questions based on the candidate's experience and skills.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  What AI models does it support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  HireZen supports all major AI models including GPT-4, GPT-3.5, Claude, Gemini, and more. 
                  You can switch between models based on your preference and API access.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. All processing happens locally in your browser. Your API keys and uploaded resumes 
                  never leave your computer. We don't store or have access to any of your sensitive data.
                </AccordionContent>
              </AccordionItem>
              
              {/* <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Can I use it in Zoom or only Google Meet?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, HireZen is optimized for Google Meet integration, but the extension works as a 
                  sidebar in any Chrome tab. You can use it alongside Zoom or any other video conferencing tool 
                  by having it open in a separate tab or window.
                </AccordionContent>
              </AccordionItem> */}
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Do I need a subscription?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No! HireZen is a one-time purchase of $5 for lifetime access. There are no recurring fees. 
                  You do need your own AI API key (like OpenAI or Anthropic), which you can get directly from 
                  those providers with their own pricing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              Make Your Interviews Smarter, Faster, and Stress-Free
            </h2>
            <p className="mb-10 text-xl text-muted-foreground">
              Join hundreds of recruiters and hiring managers who've transformed their interview process
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="hero" className="text-lg">
                Get Lifetime Access – $5
                <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowVideoDialog(true)}>
                View Demo
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground">
              No subscription. No hidden fees. Just $5 for lifetime access.
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>HireZen Demo</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="HireZen Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Section - Brand and Copyright */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-2xl font-bold text-gradient mb-2">HireZen</div>
                <p className="text-sm text-muted-foreground">
                  AI-powered interview questions generator
                </p>
              </div>
              <div className="w-full h-px bg-border"></div>
              <p className="text-sm text-muted-foreground">
                © 2025 HireZen. All rights reserved. Made with ❤️ by programmerraja.
              </p>
            </div>
            
            {/* Right Section - Social Links and CTA */}
            <div className="flex flex-col  items-start sm:items-center gap-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/programmerraja" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/programmerraja" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/programmerraja" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              
              {/* Buy Me a Coffee Button */}
              <Button 
                variant="outline" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500 hover:border-yellow-600 font-medium"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Buy Me a Coffee
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
