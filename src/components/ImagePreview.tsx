
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  image: string;
  title: string;
  onDownload?: () => void;
  showDownload?: boolean;
  dimensions?: { width: number; height: number };
  fileSize?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  title,
  onDownload,
  showDownload = false,
  dimensions,
  fileSize
}) => {
  return (
    <Card className="border-white/30 bg-white/5 overflow-hidden group hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold text-sm">{title}</h4>
          {showDownload && onDownload && (
            <Button
              onClick={onDownload}
              size="sm"
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Download className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <div className="aspect-square relative overflow-hidden rounded-lg bg-black/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-2 left-2 right-2">
              {dimensions && (
                <Badge variant="secondary" className="text-xs bg-black/50 text-white border-none">
                  {dimensions.width}×{dimensions.height}
                </Badge>
              )}
              {fileSize && (
                <Badge variant="secondary" className="text-xs bg-black/50 text-white border-none ml-1">
                  {fileSize}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
