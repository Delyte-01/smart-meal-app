import { MotionDiv } from "@/component/framer-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import React from "react";

interface TestimonialProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Johnson",
    role: "Busy Mom of 3",
    avatar:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1748939947/download_2_xhczeu.jpg",
    content:
      "SmartMeal has completely transformed how I plan meals for my family. The AI suggestions are spot-on and save me hours every week!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Fitness Enthusiast",
    avatar:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1748939948/Kermit_Mug_Shot_Meme_Funny_Sticker_ehynvf.jpg",
    content:
      "The nutrition tracking feature is incredible. I've finally found an app that makes healthy eating simple and enjoyable.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Professional Chef",
    avatar:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1748939947/hneojxymaiuaupg8jgfe.jpg",
    content:
      "Even as a chef, I love discovering new recipes through SmartMeal. The community aspect is fantastic for sharing culinary creativity.",
    rating: 5,
  },
];
const Testimonial = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30 md:px-16 lg:px-32">
      <div className="container px-4">
        <div className="text-center mb-16">
          <MotionDiv
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="bg-[#16a249]/10 text-[#16a249] border-[#16a249]/20axd rounded-full px-4 py-1 mb-4">
              Testimonials
            </Badge>
          </MotionDiv>
          <MotionDiv
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Food Enthusiasts
              </span>
            </h2>
          </MotionDiv>
          <MotionDiv
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about their SmartMeal experience
            </p>
          </MotionDiv>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <Card
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
