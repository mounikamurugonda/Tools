import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';
import { Monitor, Wifi, Users, Code2, Lock, Zap, CheckCircle, Share2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Code Cast | Real-time Code Broadcasting',
  description:
    'Broadcast your code in real-time. Share your editor view with anyone, anywhere. Free for now (Watermarked).',
};

export default function CodeCastPage() {
  return (
    <div className="flex flex-col min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light/10 text-accent-DEFAULT text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-DEFAULT opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-DEFAULT"></span>
            </span>
            Live Broadcasting Available
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white animate-fade-in-up">
            Share your code <br /> as a broadcast.
          </h1>

          <div
            className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Transform your local coding session into a live URL. Low latency, high fidelity, and
            completely browser-based.
            <span className="block mt-2 text-sm text-accent-DEFAULT font-semibold">
              Free for now (Watermarked)
            </span>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="#">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-base shadow-lg shadow-accent-DEFAULT/20 hover:shadow-accent-DEFAULT/40 transition-all duration-300"
              >
                Start Broadcasting
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/50 dark:bg-slate-900/50"
              >
                Learn more
              </Button>
            </Link>
          </div>

          <div
            className="relative mx-auto max-w-5xl rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-scale-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Image
              src="/code-cast-hero.png"
              alt="Code Cast Interface"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent-DEFAULT/10 blur-[120px] rounded-full pointer-events-none -z-10 dark:opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10 dark:opacity-20"></div>
      </section>

      {/* Grid Features Section */}
      <section id="features" className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for speed</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Built for developers who need to share context instantly. No software install required
              for viewers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Latency</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Stream your keystrokes as they happen. Sub-100ms latency ensures your viewers are
                always in sync.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 size={120} />
              </div>
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                  <Monitor size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Viewer</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Viewers can highlight, select, and copy code. It&apos;s not just a video stream;
                  it&apos;s a live DOM representation of your editor. Perfect for pair programming
                  or educational walkthroughs.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Sessions are encrypted end-to-end. You control who watches with access tokens and
                  transient URLs that expire when you stop broadcasting.
                </p>
              </div>
              <div className="flex-1 w-full p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="flex gap-2 mt-4">
                    <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center gap-1">
                      <Lock size={10} /> Encrypted
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">One-Click Share</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Generate a link instantly. No accounts required for viewers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent-DEFAULT/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to broadcast?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of developers sharing their work in real-time.
              <br />
              <span className="text-accent-light font-semibold mt-2 inline-block">
                Free tier includes watermark.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-gray-100 border-none h-14 px-8 text-lg font-semibold"
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-500 text-white hover:bg-white/10 h-14 px-8 text-lg"
              >
                Contact Sales
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" /> Instant access
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
