import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 pt-10 pb-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl">Find the Best Courses for You</h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses   
        </p>

        <from className="flex items-center bg-white dark:bg-gary-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search for courses..."
            className="flex-grow focus:outline-none focus-visible:ring-0 px-5 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button className="bg-blue-600 dark:bg-blue-700 text-white px-5 py-2 hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300 cursor-pointer">
            Search
          </button>
        </from>
        <Button className="bg-white dark:bg-gray-800 text-blue-600 hover:bg-gray-200 dark:hover-bg-gray-700 rounded-full cursor-pointer">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
