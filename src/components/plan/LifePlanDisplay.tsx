
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - in a real app, this would come from the AI analysis
const mockLifePlanData = {
  skills: [
    { id: 1, name: 'Data Analysis', description: 'Strong ability to interpret complex datasets and draw insights.' },
    { id: 2, name: 'Communication', description: 'Excellent at conveying complex ideas in simple terms.' },
    { id: 3, name: 'Problem Solving', description: 'Creative approach to finding solutions to difficult challenges.' },
    { id: 4, name: 'Project Management', description: 'Organized and efficient at coordinating multiple tasks and teams.' },
  ],
  values: [
    { id: 1, name: 'Work-Life Balance', description: 'Prioritizing time for both professional growth and personal enjoyment.' },
    { id: 2, name: 'Continuous Learning', description: 'Always seeking to expand knowledge and develop new skills.' },
    { id: 3, name: 'Community Impact', description: 'Contributing positively to society and helping others.' },
    { id: 4, name: 'Authenticity', description: 'Being true to yourself and your principles in all situations.' },
  ],
  passions: [
    { id: 1, name: 'Environmental Conservation', description: 'Deeply committed to protecting natural resources.' },
    { id: 2, name: 'Technology Innovation', description: 'Excited by cutting-edge developments and their potential.' },
    { id: 3, name: 'Creative Writing', description: 'Finds joy in expressing ideas through written word.' },
    { id: 4, name: 'Health & Wellness', description: 'Dedicated to maintaining and improving physical wellbeing.' },
  ],
  goals: [
    { 
      id: 1, 
      title: 'Career Transition to Green Tech', 
      timeframe: 'Long-term (1-3 years)',
      description: 'Leverage data analysis skills in the renewable energy sector.',
      steps: [
        'Research companies at the intersection of data and sustainability',
        'Acquire specialized certifications in sustainable technologies',
        'Network with professionals in the green tech industry',
        'Develop a portfolio of relevant projects'
      ]
    },
    { 
      id: 2, 
      title: 'Establish Work-Life Balance', 
      timeframe: 'Short-term (3-6 months)',
      description: 'Create boundaries to ensure time for both professional growth and personal wellbeing.',
      steps: [
        'Set clear working hours and stick to them',
        'Schedule regular exercise and leisure activities',
        'Practice saying no to excessive commitments',
        'Implement a digital detox routine'
      ]
    },
    { 
      id: 3, 
      title: 'Launch Community Education Program', 
      timeframe: 'Medium-term (6-12 months)',
      description: 'Combine communication skills and passion for learning to benefit the community.',
      steps: [
        'Identify educational needs in the local community',
        'Develop curriculum materials on technology or environmental topics',
        'Partner with local organizations for venue and promotion',
        'Recruit volunteers and run pilot workshops'
      ]
    },
    { 
      id: 4, 
      title: 'Develop Creative Portfolio', 
      timeframe: 'Ongoing',
      description: 'Nurture passion for creative writing alongside professional work.',
      steps: [
        'Establish a regular writing practice (3 times weekly)',
        'Join a writing group for feedback and motivation',
        'Create a blog or portfolio website to showcase work',
        'Submit pieces to publications aligned with values'
      ]
    },
  ]
};

const LifePlanDisplay = () => {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  
  const toggleSection = (id: number) => {
    setActiveSectionId(activeSectionId === id ? null : id);
  };
  
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold mb-2">Your Personal <span className="gradient-text">Life Plan</span></h2>
        <p className="text-gray-600">
          Based on the analysis of your document, here's your personalized Ikigai life plan.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="passions">Passions</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>A summary of your Ikigai elements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your document reveals a unique combination of analytical skills, 
                  environmental passions, and values centered around balance and 
                  community impact. This suggests potential fulfillment in roles that 
                  combine data-driven approaches with environmental or social good.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-ikigai-blue/10 p-4 rounded-lg">
                    <h4 className="font-medium text-ikigai-blue mb-2">Top Skills</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Data Analysis</li>
                      <li>Communication</li>
                      <li>Problem Solving</li>
                    </ul>
                  </div>
                  <div className="bg-ikigai-purple/10 p-4 rounded-lg">
                    <h4 className="font-medium text-ikigai-purple mb-2">Core Values</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Work-Life Balance</li>
                      <li>Continuous Learning</li>
                      <li>Community Impact</li>
                    </ul>
                  </div>
                  <div className="bg-ikigai-green/10 p-4 rounded-lg">
                    <h4 className="font-medium text-green-600 mb-2">Key Passions</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Environmental Conservation</li>
                      <li>Technology Innovation</li>
                      <li>Creative Writing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recommended Life Goals</CardTitle>
                <CardDescription>Based on your Ikigai elements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLifePlanData.goals.map((goal) => (
                    <div 
                      key={goal.id} 
                      className="border rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 bg-white border-b flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(goal.id)}
                      >
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-sm text-gray-500">{goal.timeframe}</p>
                        </div>
                        <div className="text-gray-400">
                          {activeSectionId === goal.id ? '−' : '+'}
                        </div>
                      </div>
                      
                      {activeSectionId === goal.id && (
                        <div className="p-4 bg-gray-50">
                          <p className="text-gray-700 mb-3">{goal.description}</p>
                          <h5 className="font-medium text-sm mb-2">Action Steps:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {goal.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Identified Skills</CardTitle>
              <CardDescription>Key strengths and capabilities from your document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockLifePlanData.skills.map((skill) => (
                  <div key={skill.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-ikigai-blue mb-1">{skill.name}</h4>
                    <p className="text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="values" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Core Values</CardTitle>
              <CardDescription>What matters most to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockLifePlanData.values.map((value) => (
                  <div key={value.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-ikigai-purple mb-1">{value.name}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="passions" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Passions</CardTitle>
              <CardDescription>What brings you joy and fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockLifePlanData.passions.map((passion) => (
                  <div key={passion.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-green-600 mb-1">{passion.name}</h4>
                    <p className="text-gray-600">{passion.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LifePlanDisplay;
