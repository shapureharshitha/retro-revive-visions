
import React from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ImageComparisonProps {
  originalImage: string | null;
  colorizedImage: string | null;
  isProcessing: boolean;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  originalImage,
  colorizedImage,
  isProcessing,
}) => {
  if (!originalImage) {
    return (
      <Card className="border-white/30 bg-white/5 h-96">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <p className="text-white/70">Upload an image to see the preview</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-white/30 bg-white/5 overflow-hidden">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 text-center">Original</h4>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/30 bg-white/5 overflow-hidden">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 text-center">Colorized</h4>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white/10 flex items-center justify-center">
              {isProcessing ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                  <p className="text-white/70">AI is working its magic...</p>
                </div>
              ) : colorizedImage ? (
                <img
                  src={colorizedImage}
                  alt="Colorized"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/70">Click "Colorize Photo" to start</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageComparison;
