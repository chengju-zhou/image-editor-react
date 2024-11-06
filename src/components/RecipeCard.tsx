import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: string;
}

export default function RecipeCard({ title, image, time, servings, difficulty }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">{servings} servings</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm">{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}