import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent leading-tight">
          CleverTrack
        </h1>
        <h2 className="text-2xl md:text-3xl font-light mb-16 bg-gradient-text bg-clip-text text-transparent opacity-90">
          Your AI powered diet assistant.
        </h2>
        
        <div className="space-y-8 mb-12 animate-slide-up">
          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <FeatureCard 
              number="1"
              title="Count calories and nutrients by simply uploading photos of your meals"
            />
            <FeatureCard 
              number="2"
              title="Get personal tips and suggestions based on your eating habits"
            />
            <FeatureCard 
              number="3"
              title="Progress faster towards your goals by playing a game"
            />
          </div>
        </div>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-12 py-3 h-auto animate-slide-up"
        >
          Let's go
        </Button>
      </div>
    </section>
  );
};

const FeatureCard = ({ number, title }: { number: string; title: string }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
          {number}
        </div>
        <p className="text-left text-foreground text-lg leading-relaxed">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Hero;