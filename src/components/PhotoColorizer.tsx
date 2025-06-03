import React, { useState, useRef } from 'react';
import { Upload, Download, Sparkles, Image as ImageIcon, Loader2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import ImageComparison from './ImageComparison';
import ColorPalette from './ColorPalette';
import ProcessingSteps from './ProcessingSteps';
import ColorMetrics from './ColorMetrics';
import { colorizeImage } from '@/utils/colorizeUtils';

const PhotoColorizer = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>(['#FF0040', '#0080FF', '#32CD32']);
  const [processingTime, setProcessingTime] = useState<number | undefined>();
  const { toast } = useToast();

  const processingSteps = [
    {
      id: '1',
      title: 'Image Analysis',
      description: 'Analyzing image structure and luminance',
      status: isProcessing ? 'processing' : 'pending'
    },
    {
      id: '2', 
      title: 'Color Prediction',
      description: 'AI predicting ab color channels',
      status: isProcessing ? 'processing' : 'pending'
    },
    {
      id: '3',
      title: 'Lab to RGB Conversion',
      description: 'Converting to displayable RGB format',
      status: isProcessing ? 'processing' : 'pending'
    }
  ];

  const handleImageUpload = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setColorizedImage(null);
    setProcessingTime(undefined);
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
    const startTime = Date.now();
    
    try {
      const colorized = await colorizeImage(originalImage, selectedColors);
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime) / 1000);
      
      setColorizedImage(colorized);
      setProcessingTime(duration);
      
      toast({
        title: "Success!",
        description: `Your photo has been colorized using ${selectedColors.length} colors in ${duration}s`,
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
    if (!colorizedImage) {
      toast({
        title: "No colorized image",
        description: "Please colorize an image first before downloading",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `retro-revive-${Date.now()}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast({
              title: "Download started",
              description: "Your colorized image is being downloaded",
            });
          }
        }, 'image/png', 1.0);
      };
      
      img.src = colorizedImage;
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload and Controls */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Upload Your Photo</h2>
                <p className="text-blue-200 mb-6">
                  Transform black and white memories with Retro Revive Visions
                </p>
              </div>
              
              <ImageUpload onImageUpload={handleImageUpload} />
              <ColorPalette selectedColors={selectedColors} onColorToggle={handleColorToggle} />
              <ColorMetrics selectedColors={selectedColors} processingTime={processingTime} />
              
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleColorize}
                  disabled={!originalImage || isProcessing || selectedColors.length === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Magic...
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
                  className="w-full border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Colorized Image
                </Button>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="space-y-6">
              {isProcessing && <ProcessingSteps steps={processingSteps} />}
              
              {originalImage && !isProcessing && (
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <p className="text-blue-200 text-sm text-center">
                    📸 Image uploaded • 🎨 {selectedColors.length} colors selected
                    {colorizedImage && ' • ✅ Ready to download'}
                  </p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Results</h2>
                <p className="text-blue-200 mb-6">
                  See your memories come to life in vivid color
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

      {/* How It Works Section */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">1. Upload</h4>
                <p className="text-blue-200">Upload your black and white photograph and select your preferred colors</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">2. AI Magic</h4>
                <p className="text-blue-200">Our AI analyzes and intelligently colorizes your image using your chosen palette</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">3. Download</h4>
                <p className="text-blue-200">Get your beautifully colorized photograph in high quality</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoColorizer;
