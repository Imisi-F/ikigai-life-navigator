
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-ikigai-bg to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">
              Discover Your <span className="gradient-text font-bold">Ikigai</span> and Create Your Perfect Life Plan
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Upload your skills, passions, and values document and let our AI guide you 
              towards a fulfilling life plan aligned with your true purpose.
            </p>
            <Link to="/upload">
              <Button className="ikigai-button">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ikigai Explanation */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">What is <span className="gradient-text">Ikigai</span>?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Ikigai is a Japanese concept that means "a reason for being." It lies at the 
              intersection of what you love, what you're good at, what the world needs, and 
              what you can be rewarded for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="ikigai-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-full bg-ikigai-blue/20 flex items-center justify-center mb-4">
                <span className="text-ikigai-blue text-xl font-bold">❤️</span>
              </div>
              <h3 className="text-lg font-medium mb-2">What You Love</h3>
              <p className="text-gray-600">Your passions and what brings you joy in life.</p>
            </div>
            
            <div className="ikigai-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-full bg-ikigai-green/20 flex items-center justify-center mb-4">
                <span className="text-ikigai-green text-xl font-bold">🌟</span>
              </div>
              <h3 className="text-lg font-medium mb-2">What You're Good At</h3>
              <p className="text-gray-600">Your strengths, skills, and natural talents.</p>
            </div>
            
            <div className="ikigai-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="h-12 w-12 rounded-full bg-ikigai-purple/20 flex items-center justify-center mb-4">
                <span className="text-ikigai-purple text-xl font-bold">🌎</span>
              </div>
              <h3 className="text-lg font-medium mb-2">What the World Needs</h3>
              <p className="text-gray-600">How you can contribute to society and make an impact.</p>
            </div>
            
            <div className="ikigai-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 rounded-full bg-ikigai-teal/20 flex items-center justify-center mb-4">
                <span className="text-ikigai-teal text-xl font-bold">💰</span>
              </div>
              <h3 className="text-lg font-medium mb-2">What You Can Be Paid For</h3>
              <p className="text-gray-600">Activities that provide financial sustainability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-ikigai-bg">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your uploaded document and creates a personalized 
              life plan that aligns with your unique combination of skills, values, and passions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ikigai-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-ikigai-blue to-ikigai-purple flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
              </div>
              <h3 className="text-center mb-3">Upload Your Document</h3>
              <p className="text-gray-600 text-center">
                Share a document containing your skills, values, and passions to get started.
              </p>
            </div>
            
            <div className="ikigai-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-ikigai-blue to-ikigai-purple flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
              </div>
              <h3 className="text-center mb-3">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our AI analyzes your document and identifies key elements of your Ikigai.
              </p>
            </div>
            
            <div className="ikigai-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-ikigai-blue to-ikigai-purple flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
              </div>
              <h3 className="text-center mb-3">Get Your Life Plan</h3>
              <p className="text-gray-600 text-center">
                Receive a personalized life plan and chat with our AI for deeper insights.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/upload">
              <Button className="ikigai-button">
                Begin Your Ikigai Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
