"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
{
    name: "Talha Yousuf",
    avatar: "A",
    title: "UI / UX Designer",
    description: "Best Application i have ever tried"
},
{
    name: "Faizan Mati",
    avatar: "B",
    title: "Web Developer",
    description: "Next Level results"
},
{
    name: "Noman Abbas",
    avatar: "C",
    title: "Figma Designer",
    description: "Best AI Models with Cutting Edge Technologies"
},
{
    name: "Haseeb Ashraf",
    avatar: "D",
    title: "Dart Developer",
    description: "Best for content Generation"
},


]

export const LandingContent = () => {
    return (
      <div className="px-10 pb-20 ">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <Card key={item.description} className="bg-[#192339] border-none text-white">
              <CardContent className="p-6">
                <p className="text-lg mb-4">&quot;{item.description}&quot;</p>
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };