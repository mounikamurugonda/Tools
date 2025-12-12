"use client";

import React, { useMemo } from "react";
import { TOOLS } from "../constants";
import ToolCard from "./ToolCard";
import type { Tool, ToolCategory, ToolDetails } from "../types";
import MostViewedTools from "./MostViewedTools";
import { ChevronRightIcon } from "./icons";
import Link from "next/link";
import {
  CATEGORY_ORDER,
  CATEGORY_ICONS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_URL_MAP,
} from "@/constants";
import { blogs } from "@/lib/blogs";
import FaqSection from "./FaqSection";

const HomePageClient: React.FC = () => {
  const toolCount = TOOLS.length;







  const featuredTools = useMemo(
    () => TOOLS.filter((tool) => tool.featured),
    []
  );
  const visibleCategories = useMemo(() => CATEGORY_ORDER.slice(0, 6), []);

  return (
    <main className="w-full">
      <div className="animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24 relative pt-8 sm:pt-12 lg:pt-16">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight animate-slide-in-right px-4">
            Welcome to <span className="brand-gradient-text">UtilToolkits</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto animate-slide-in-left delay-100 px-4">
            The ultimate collection of{" "}
            <strong className="text-gray-900 dark:text-white">{toolCount}+ free online developer tools</strong>.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto animate-slide-in-left delay-200 px-4 leading-relaxed">
            I built UtilToolkits to solve a consistent frustration: finding reliable, fast, and private developer tools without the bloat. What started as a personal project is now a comprehensive suite running entirely in your browser. No servers, no tracking—just practical utilities that work instantly.
          </p>

          <div className="mt-8 sm:mt-12 max-w-2xl mx-auto animate-fade-in-up delay-200 relative z-50">

          </div>
        </div>

        {/* Most Viewed Tools Section */}
        <div className="animate-fade-in delay-300 mb-16 sm:mb-20 lg:mb-24">
          <MostViewedTools />
        </div>

        {/* Why Choose UtilToolkits Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24 animate-fade-in delay-400">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Why Developers Love UtilToolkits
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Join thousands of developers who trust UtilToolkits for their
              daily workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: "100% Private",
                desc: "All processing happens in your browser. Your data never leaves your device.",
              },
              {
                title: "Lightning Fast",
                desc: "No server delays. Instant results with client-side processing.",
              },
              {
                title: "Always Free",
                desc: "No hidden costs, no premium tiers. All tools are completely free.",
              },
              {
                title: "No Registration",
                desc: "Start using tools immediately. No accounts or sign-ups required.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl brand-card hover:-translate-y-2 transition-transform duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-base sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Latest from Our Blog
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Insights, tutorials, and best practices for developers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {blogs.slice(0, 3).map((blog, index) => (
              <div
                key={blog.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blogs/${blog.id}`} className="block h-full">
                  <div className="group h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                    <div className="flex flex-col h-full">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          {blog.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{blog.date}</span>
                        <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-all hover:gap-2 group text-sm sm:text-base"
            >
              View All Blog Posts
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24 pb-8 sm:pb-12">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Explore by Category
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              Find the right tool for the job by browsing our categories.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-all hover:gap-2 group text-sm sm:text-base"
            >
              View All 10 Categories
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {visibleCategories.map((category, index) => {
              const CategoryIcon = CATEGORY_ICONS[category];
              const description = CATEGORY_DESCRIPTIONS[category];
              const tool: Tool = {
                id: CATEGORY_URL_MAP[category] ?? "default-id", // ensure id exists
                name: category as ToolCategory,
                description,
                icon: <CategoryIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
                category: category as ToolCategory,
                component: () => null, // placeholder component for now
                details: {} as ToolDetails,
                featured: false,
                keywords: [],
                tags: [],
              };

              return (
                <div
                  key={category}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={`/tools/category/${CATEGORY_URL_MAP[category]}`}
                    className="block h-full"
                  >
                    <ToolCard tool={tool} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />
      </div>
    </main>
  );
};

export default HomePageClient;
