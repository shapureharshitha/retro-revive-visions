
import PhotoColorizer from '@/components/PhotoColorizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Photo Colorizer
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Transform your old black and white photographs into vibrant, colorful memories using advanced AI technology
          </p>
        </div>
        <PhotoColorizer />
      </div>
    </div>
  );
};

export default Index;
