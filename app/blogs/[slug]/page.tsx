import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge"

// Sample data - In a real app, this would come from a CMS or database
const sampleBlogs = [
  {
    title: "Mastering Financial Calculators: A Beginner's Guide",
    author: "Jane Doe",
    date: "October 26, 2023",
    slug: "mastering-financial-calculators",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    content: `
      <p>Financial literacy is the cornerstone of a secure future. For many, the journey begins with understanding the basic tools of the trade: financial calculators. This guide will walk you through the most essential calculators, demystifying terms like ROI, CAGR, and more.</p>
      <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Return on Investment (ROI) Calculator</h3>
      <p>The ROI calculator is perhaps the most fundamental tool for an investor. It measures the profitability of an investment as a percentage. The formula is simple: (Net Profit / Cost of Investment) * 100. Our ROI calculator allows you to input your initial investment and either the final value or the net profit, giving you an instant analysis of your investment's performance.</p>
      <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Compound Annual Growth Rate (CAGR)</h3>
      <p>CAGR provides a smoothed-out average annual growth rate over a specific period. Unlike simple return, CAGR accounts for the effect of compounding. It's an excellent way to compare the historical performance of different investments. You just need the beginning value, ending value, and the number of years.</p>
      <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-slate-100 text-slate-700">
        "Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it." - Albert Einstein
      </blockquote>
      <p>Understanding these tools is the first step towards making informed financial decisions. Explore our full suite of investment calculators to take control of your financial destiny.</p>
    `
  },
    {
    title: "The Simple Math Behind Your Health & Fitness Goals",
    author: "John Smith",
    date: "October 22, 2023",
    slug: "math-behind-health-fitness",
    category: "Health",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    content: `
        <p>Achieving your health and fitness goals isn't just about hard work in the gym; it's also about smart planning, which is rooted in simple mathematics. Understanding the numbers behind your body's energy needs can transform your approach to diet and exercise.</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">Basal Metabolic Rate (BMR)</h3>
        <p>Your BMR is the number of calories your body needs to perform basic, life-sustaining functions at rest. Think of it as the energy you'd burn if you stayed in bed all day. Our BMR calculator uses standard formulas like Mifflin-St Jeor to give you a reliable baseline.</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">Total Daily Energy Expenditure (TDEE)</h3>
        <p>TDEE takes your BMR and adds the calories you burn from physical activity. This is the crucial number you need to know to either lose, maintain, or gain weight. By inputting your activity level, from sedentary to extra active, our TDEE calculator provides a target for your daily calorie intake.</p>
        <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-slate-100 text-slate-700">
        "What gets measured gets managed. Tracking your metrics is the first step towards tangible results."
        </blockquote>
        <p>By leveraging these calculations, you can move from guesswork to a data-driven fitness plan. Check out our health calculators to get started!</p>
    `
  },
  {
    title: "Understanding Linear Algebra: Vectors and Matrices",
    author: "Emily White",
    date: "October 18, 2023",
    slug: "understanding-linear-algebra",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1635372722652-53a873a45745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    content: `
        <p>Linear algebra is a fundamental pillar of modern computing, powering everything from data science and machine learning to computer graphics. At its core are two key concepts: vectors and matrices.</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">What are Vectors?</h3>
        <p>In the context of data science, a vector can be thought of as a list of numbers representing a point in space or a set of features. For example, a vector could represent a user's ratings for different movies. Vector operations, like dot products, are essential for tasks like creating recommendation systems.</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">The Power of Matrices</h3>
        <p>A matrix is a grid of numbers, essentially a collection of vectors. They are used to represent datasets, systems of linear equations, and transformations of data. Our matrix calculators can help you perform complex operations like multiplication, finding determinants, and calculating inverses effortlessly.</p>
        <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-slate-100 text-slate-700">
        "Linear algebra is the language of data. To be fluent in data science, you must be fluent in linear algebra."
        </blockquote>
        <p>Whether you're a student or a seasoned data scientist, our linear algebra tools can save you time and help you focus on the bigger picture.</p>
    `
  },
  {
    title: "Cool Math Tricks for Everyday Life",
    author: "Michael Brown",
    date: "October 15, 2023",
    slug: "cool-math-tricks",
    category: "Math",
    image: "https://images.unsplash.com/photo-1637420425895-99a9a4f4d896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    content: `
        <p>Math isn't just for the classroom; it's a practical tool that can make everyday life easier and more interesting. Here are a few tricks to sharpen your mental math skills.</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">The 10% Tip Trick</h3>
        <p>Calculating a tip can be stressful. An easy way is to find 10% of the bill first. Just move the decimal point one place to the left. For a $42.50 bill, 10% is $4.25. Need a 20% tip? Just double that number ($8.50). Need 15%? Take your 10% value and add half of it ($4.25 + $2.13 = $6.38).</p>
        <h3 class="text-2xl font-bold text-slate-800 mt-8 mb-4">Quick Percentage Calculation</h3>
        <p>Ever need to find something like 40% of 300? The trick is that x% of y is the same as y% of x. So, 40% of 300 is the same as 300% of 40. The latter is much easier: 3 * 40 = 120.</p>
        <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-slate-100 text-slate-700">
        "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." - William Paul Thurston
        </blockquote>
        <p>Our collection of math calculators is here for the times when mental math isn't enough. From simple percentages to complex algebra, we've got you covered.</p>
    `
  }
];

function getBlogBySlug(slug: string) {
  return sampleBlogs.find((blog) => blog.slug === slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/blogs" className="text-sm text-primary hover:underline">
            <Badge variant="outline">{blog.category}</Badge>
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight my-4">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-auto max-h-[500px] overflow-hidden rounded-lg mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="prose prose-lg lg:prose-xl max-w-none prose-slate dark:prose-invert prose-h3:text-foreground/90 prose-blockquote:border-primary prose-blockquote:bg-muted/50"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-12 pt-8 border-t">
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
}

// Optional: Add basic text-shadow utility if not in tailwind.config.js
// You might need to add this to your globals.css or tailwind config:
/*
@layer utilities {
  .text-shadow-lg {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
}
*/ 