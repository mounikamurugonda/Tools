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

const HomePageClient: React.FC = () => {
  const toolCount = TOOLS.length;







  const featuredTools = useMemo(
    () => TOOLS.filter((tool) => tool.featured),
    []
  );
  const visibleCategories = useMemo(() => CATEGORY_ORDER.slice(0, 6), []);

  return (
    <main className="brand-container ">
      <div className="animate-fade-in">
        <div className="text-center mb-24 relative">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />

          <h1 className="brand-heading-1 mt-6 animate-slide-in-right">
            Welcome to <span className="brand-gradient-text">UtilToolkits</span>
          </h1>
          <p className="brand-subheading mt-6 max-w-3xl mx-auto animate-slide-in-left delay-100">
            The ultimate collection of{" "}
            <strong>{toolCount}+ free online developer tools</strong>.
          </p>

          <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up delay-200 relative z-50">

          </div>
        </div>

        {/* Most Viewed Tools Section */}
        <div className="animate-fade-in delay-300">
          <MostViewedTools />
        </div>

        {/* Why Choose UtilToolkits Section */}
        <section className="my-24 animate-fade-in delay-400">
          <div className="text-center mb-12">
            <h2 className="brand-heading-2 mb-4">
              Why Developers Love UtilToolkits
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of developers who trust UtilToolkits for their
              daily workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="text-center p-8 rounded-2xl brand-card hover:-translate-y-2 transition-transform duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="my-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="brand-heading-2 mb-4">Most Popular Tools</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              These are the tools our community uses most frequently.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/tools/${tool.id}`} className="block h-full">
                  <ToolCard tool={tool} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="my-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="brand-heading-2 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Find the right tool for the job by browsing our categories.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-all hover:gap-2 group"
            >
              View All 10 Categories
              <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {visibleCategories.map((category, index) => {
              const CategoryIcon = CATEGORY_ICONS[category];
              const description = CATEGORY_DESCRIPTIONS[category];
              const tool: Tool = {
                id: CATEGORY_URL_MAP[category] ?? "default-id", // ensure id exists
                name: category as ToolCategory,
                description,
                icon: <CategoryIcon className="w-8 h-8 text-blue-500" />,
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
      </div>
    </main>
  );
};

export default HomePageClient;
