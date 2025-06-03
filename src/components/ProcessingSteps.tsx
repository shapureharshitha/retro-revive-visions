
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
}

interface ProcessingStepsProps {
  steps: ProcessingStep[];
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ steps }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-6">
        <h3 className="text-white font-semibold mb-4 text-center">Processing Status</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {step.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {step.status === 'processing' && (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                )}
                {step.status === 'pending' && (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  step.status === 'completed' ? 'text-green-400' :
                  step.status === 'processing' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </h4>
                <p className="text-sm text-blue-200">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingSteps;
