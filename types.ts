import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ProblemItem {
  id: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  story?: string;
}

export interface CaseStudy {
  id: number;
  name: string;
  profession: string;
  location: string;
  image: string;
  debt: number;
  term: number;
  quote: string;
  result: string;
  rating: number;
  date: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}