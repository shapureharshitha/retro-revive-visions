
import React, { useState } from 'react';
import { Loader2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImagePreview from './ImagePreview';

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
  const [showComparison, setShowComparison] = useState(false);

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

  // Split view comparison when both images are available
  if (colorizedImage && !isProcessing && showComparison) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">Before & After Comparison</h3>
          <Button
            onClick={() => setShowComparison(false)}
            size="sm"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <EyeOff className="w-4 h-4 mr-2" />
            Side by Side
          </Button>
        </div>
        
        <Card className="border-white/30 bg-white/5 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex">
                <div className="w-1/2 relative overflow-hidden">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">Original</span>
                  </div>
                </div>
                <div className="w-1/2 relative overflow-hidden">
                  <img
                    src={colorizedImage}
                    alt="Colorized"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">Colorized</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-white/50"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Results</h3>
        {colorizedImage && !isProcessing && (
          <Button
            onClick={() => setShowComparison(true)}
            size="sm"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <Eye className="w-4 h-4 mr-2" />
            Compare
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImagePreview
          image={originalImage}
          title="Original"
        />

        <Card className="border-white/30 bg-white/5 overflow-hidden">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 text-center">Colorized</h4>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white/10 flex items-center justify-center">
              {isProcessing ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                  <p className="text-white/70">AI is working its magic...</p>
                  <p className="text-blue-200 text-xs mt-2">Converting Lab to RGB...</p>
                </div>
              ) : colorizedImage ? (
                <ImagePreview
                  image={colorizedImage}
                  title=""
                  showDownload={true}
                  onDownload={() => {
                    const link = document.createElement('a');
                    link.download = `retro-revive-${Date.now()}.png`;
                    link.href = colorizedImage;
                    link.click();
                  }}
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
