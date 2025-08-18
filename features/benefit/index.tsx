import { MotionDiv } from "@/component/framer-wrapper";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Shield, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: BenefitProps[] = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Reduce meal planning time from hours to minutes with AI-powered suggestions",
  },
  {
    icon: TrendingUp,
    title: "Eat Healthier",
    description:
      "Make informed food choices with detailed nutrition information and balanced meal plans",
  },
  {
    icon: Shield,
    title: "Reduce Food Waste",
    description:
      "Use ingredients efficiently with recipes tailored to what you already have",
  },
  {
    icon: Award,
    title: "Achieve Goals",
    description:
      "Stay consistent with your health and fitness objectives through smart meal planning",
  },
];

const BenefitSection = () => {
  return (
    <section id="benefits" className="py-20 lg:px-32 px-5 sm:px-8 md:px-15">
      <div className="container px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#fef1e7] text-[#f97415] border-[#f97415]/70 rounded-full px-4 py-1 mb-4">
                Benefits
              </Badge>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SmartMeal?
                </span>
              </h2>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who have transformed their cooking
                experience and achieved their health goals.
              </p>
            </MotionDiv>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <MotionDiv
                  key={index}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <MotionDiv
                      whileInView={{ scale: 1 }}
                      initial={{ scale: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-[#3d8b40]" />
                      </div>
                    </MotionDiv>
                    <div>
                      <MotionDiv
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h3 className="font-semibold text-lg mb-2">
                          {benefit.title}
                        </h3>
                      </MotionDiv>
                      <MotionDiv
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </MotionDiv>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>

          <div className="relative">
            <MotionDiv
              whileInView={{ opacity: 1, scale: 1,rotate: 0 }}
              initial={{ opacity: 0, scale: 0.1, rotate: -20 }}
              transition={{ duration: 1, delay: 0.3, ease:'easeIn' }}  >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl"></div>
              <Image
                src="https://res.cloudinary.com/dk5mfu099/image/upload/v1753707323/premium_photo-1675676486598-733979a2218f_fwfoez.jpg"
                alt="Healthy Meal Planning"
                className="relative z-10  rounded-3xl object-cover object-center shadow-2xl aspect-square"
                width={500}
                height={500}
              />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
