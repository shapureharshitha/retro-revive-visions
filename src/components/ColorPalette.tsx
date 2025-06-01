
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Palette, Sun, Flower, Sunset, Zap, Heart, Leaf } from 'lucide-react';

interface ColorPaletteProps {
  selectedColors: string[];
  onColorToggle: (color: string) => void;
}

const COLOR_THEMES = {
  vibrant: {
    name: 'Vibrant',
    icon: Zap,
    colors: [
      { name: 'Electric Red', value: '#FF0040' },
      { name: 'Bright Orange', value: '#FF6600' },
      { name: 'Golden Yellow', value: '#FFD700' },
      { name: 'Lime Green', value: '#32CD32' },
      { name: 'Electric Blue', value: '#0080FF' },
      { name: 'Purple', value: '#8A2BE2' },
      { name: 'Hot Pink', value: '#FF1493' },
      { name: 'Cyan', value: '#00FFFF' },
      { name: 'Magenta', value: '#FF00FF' },
      { name: 'Spring Green', value: '#00FF7F' }
    ]
  },
  warm: {
    name: 'Warm',
    icon: Sun,
    colors: [
      { name: 'Crimson', value: '#DC143C' },
      { name: 'Orange Red', value: '#FF4500' },
      { name: 'Dark Orange', value: '#FF8C00' },
      { name: 'Gold', value: '#FFD700' },
      { name: 'Yellow', value: '#FFFF00' },
      { name: 'Coral', value: '#FF7F50' },
      { name: 'Salmon', value: '#FA8072' },
      { name: 'Tomato', value: '#FF6347' },
      { name: 'Chocolate', value: '#D2691E' },
      { name: 'Peru', value: '#CD853F' }
    ]
  },
  pastel: {
    name: 'Pastel',
    icon: Flower,
    colors: [
      { name: 'Light Pink', value: '#FFB6C1' },
      { name: 'Light Blue', value: '#ADD8E6' },
      { name: 'Light Green', value: '#90EE90' },
      { name: 'Light Yellow', value: '#FFFFE0' },
      { name: 'Light Coral', value: '#F08080' },
      { name: 'Lavender', value: '#E6E6FA' },
      { name: 'Mint Green', value: '#98FB98' },
      { name: 'Peach Puff', value: '#FFDAB9' },
      { name: 'Light Cyan', value: '#E0FFFF' },
      { name: 'Thistle', value: '#D8BFD8' }
    ]
  },
  sunset: {
    name: 'Sunset',
    icon: Sunset,
    colors: [
      { name: 'Deep Orange', value: '#FF4500' },
      { name: 'Orange Red', value: '#FF6347' },
      { name: 'Coral', value: '#FF7F50' },
      { name: 'Light Salmon', value: '#FFA07A' },
      { name: 'Gold', value: '#FFD700' },
      { name: 'Dark Salmon', value: '#E9967A' },
      { name: 'Rosy Brown', value: '#BC8F8F' },
      { name: 'Indian Red', value: '#CD5C5C' },
      { name: 'Firebrick', value: '#B22222' },
      { name: 'Maroon', value: '#800000' }
    ]
  },
  romantic: {
    name: 'Romantic',
    icon: Heart,
    colors: [
      { name: 'Deep Pink', value: '#FF1493' },
      { name: 'Hot Pink', value: '#FF69B4' },
      { name: 'Pink', value: '#FFC0CB' },
      { name: 'Light Pink', value: '#FFB6C1' },
      { name: 'Pale Violet Red', value: '#DB7093' },
      { name: 'Medium Violet Red', value: '#C71585' },
      { name: 'Orchid', value: '#DA70D6' },
      { name: 'Plum', value: '#DDA0DD' },
      { name: 'Violet', value: '#EE82EE' },
      { name: 'Magenta', value: '#FF00FF' }
    ]
  },
  nature: {
    name: 'Nature',
    icon: Leaf,
    colors: [
      { name: 'Forest Green', value: '#228B22' },
      { name: 'Green', value: '#008000' },
      { name: 'Lime Green', value: '#32CD32' },
      { name: 'Spring Green', value: '#00FF7F' },
      { name: 'Medium Spring Green', value: '#00FA9A' },
      { name: 'Light Green', value: '#90EE90' },
      { name: 'Pale Green', value: '#98FB98' },
      { name: 'Dark Olive Green', value: '#556B2F' },
      { name: 'Olive Drab', value: '#6B8E23' },
      { name: 'Yellow Green', value: '#9ACD32' }
    ]
  }
};

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColors, onColorToggle }) => {
  const [activeTheme, setActiveTheme] = useState('vibrant');

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 justify-center mb-4">
          <Palette className="w-5 h-5 text-white" />
          <h3 className="text-white font-semibold">Color Palettes</h3>
        </div>
        
        <Tabs value={activeTheme} onValueChange={setActiveTheme} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white/10 mb-4">
            {Object.entries(COLOR_THEMES).map(([key, theme]) => {
              const IconComponent = theme.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="text-xs text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{theme.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(COLOR_THEMES).map(([key, theme]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-5 gap-2">
                {theme.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onColorToggle(color.value)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      selectedColors.includes(color.value) 
                        ? 'border-white shadow-lg ring-2 ring-white/50 scale-105' 
                        : 'border-white/30'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 text-center">
          <p className="text-blue-200 text-sm">
            Theme: <span className="font-semibold text-white">{COLOR_THEMES[activeTheme as keyof typeof COLOR_THEMES].name}</span>
          </p>
          <p className="text-blue-200 text-xs mt-1">
            Selected: {selectedColors.length} colors
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPalette;
