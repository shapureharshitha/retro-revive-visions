
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Zap, Clock } from 'lucide-react';

interface ColorMetricsProps {
  selectedColors: string[];
  processingTime?: number;
  confidenceScore?: number;
}

const ColorMetrics: React.FC<ColorMetricsProps> = ({
  selectedColors,
  processingTime,
  confidenceScore
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{selectedColors.length}</p>
              <p className="text-xs text-blue-200">Colors</p>
            </div>
          </div>
          
          {processingTime && (
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{processingTime}s</p>
                <p className="text-xs text-blue-200">Processing</p>
              </div>
            </div>
          )}
          
          {confidenceScore && (
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{Math.round(confidenceScore * 100)}%</p>
                <p className="text-xs text-blue-200">Quality</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorMetrics;
