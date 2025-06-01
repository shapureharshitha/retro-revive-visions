
import React, { useState, useRef } from 'react';
import { Upload, Download, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import ImageComparison from './ImageComparison';
import ColorPalette from './ColorPalette';
import { colorizeImage } from '@/utils/colorizeUtils';

const PhotoColorizer = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>(['#FF0000', '#0000FF', '#00FF00']);
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setColorizedImage(null);
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleColorize = async () => {
    if (!originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    if (selectedColors.length === 0) {
      toast({
        title: "No colors selected",
        description: "Please select at least one color for colorization",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const colorized = await colorizeImage(originalImage, selectedColors);
      setColorizedImage(colorized);
      toast({
        title: "Success!",
        description: `Your photo has been colorized using ${selectedColors.length} colors`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to colorize the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!colorizedImage) return;
    
    const link = document.createElement('a');
    link.download = 'colorized-photo.png';
    link.href = colorizedImage;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Upload Your Photo</h2>
                <p className="text-blue-200 mb-6">
                  Drag and drop your black and white photo or click to browse
                </p>
              </div>
              
              <ImageUpload onImageUpload={handleImageUpload} />
              
              <ColorPalette 
                selectedColors={selectedColors}
                onColorToggle={handleColorToggle}
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleColorize}
                  disabled={!originalImage || isProcessing || selectedColors.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Colorize Photo
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleDownload}
                  disabled={!colorizedImage}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Results</h2>
                <p className="text-blue-200 mb-6">
                  See the magic of AI colorization in action
                </p>
              </div>
              
              <ImageComparison 
                originalImage={originalImage} 
                colorizedImage={colorizedImage}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Upload</h4>
                <p className="text-blue-200">Upload your black and white photograph</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">AI Magic</h4>
                <p className="text-blue-200">Our AI analyzes and colorizes your image</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Download</h4>
                <p className="text-blue-200">Get your beautifully colorized photograph</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoColorizer;
