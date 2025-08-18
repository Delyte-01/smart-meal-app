import { MotionDiv } from "@/component/framer-wrapper";
import React from "react";

interface StatsProps {
  number: string;
  label: string;
}

const stats: StatsProps[] = [
  { number: "50K+", label: "Happy Users" },
  { number: "10K+", label: "Healthy Recipes" },
  { number: "1M+", label: "Meals Planned" },
  { number: "4.9★", label: "User Rating" },
];

export const StatsPage = () => {
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <MotionDiv key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div  className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#3d8b40] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
