
import PhotoColorizer from '@/components/PhotoColorizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Retro Revive Visions
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Transform your old black and white photographs into vibrant, colorful memories using advanced AI autoencoder technology
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-blue-300">
            <span className="bg-white/10 px-3 py-1 rounded-full">Lab Color Space</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Neural Network</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">High Quality</span>
          </div>
        </div>
        <PhotoColorizer />
      </div>
    </div>
  );
};

export default Index;
