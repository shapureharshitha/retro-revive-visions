
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ColorPaletteProps {
  selectedColors: string[];
  onColorToggle: (color: string) => void;
}

const AVAILABLE_COLORS = [
  { name: 'Red', value: '#FF6B6B', hex: '#FF0000' },
  { name: 'Blue', value: '#4ECDC4', hex: '#0000FF' },
  { name: 'Green', value: '#45B7D1', hex: '#00FF00' },
  { name: 'Yellow', value: '#F9CA24', hex: '#FFFF00' },
  { name: 'Purple', value: '#6C5CE7', hex: '#800080' },
  { name: 'Orange', value: '#FD79A8', hex: '#FFA500' },
  { name: 'Pink', value: '#FDCB6E', hex: '#FFC0CB' },
  { name: 'Cyan', value: '#00CEC9', hex: '#00FFFF' },
  { name: 'Brown', value: '#A0522D', hex: '#8B4513' },
  { name: 'Gold', value: '#FFD700', hex: '#FFD700' }
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColors, onColorToggle }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-4">
        <h3 className="text-white font-semibold mb-4 text-center">Choose Colors for Colorization</h3>
        <div className="grid grid-cols-5 gap-3">
          {AVAILABLE_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorToggle(color.hex)}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                selectedColors.includes(color.hex) 
                  ? 'border-white shadow-lg ring-2 ring-white/50' 
                  : 'border-white/30'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-blue-200 text-sm text-center mt-3">
          Selected: {selectedColors.length} colors
        </p>
      </CardContent>
    </Card>
  );
};

export default ColorPalette;
