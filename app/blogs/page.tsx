import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const posts = [
  {
    title: "Decoding the Dow: A Guide to Essential Stock Market Calculations and Financial Terms",
    author: "MyCalculatorApp Team",
    date: "October 26, 2025",
    excerpt: "Unlock the secrets of stock valuation and market analysis. This guide demystifies the essential financial terms and calculations that form the bedrock of stock market analysis.",
    slug: "stock-market-calculations-finance-terms",
    category: "Finance",
    image: "/stock-analysis-illustration.svg"
  },
];

export default function BlogsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-2">
            The MyCalculatorApp Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, guides, and articles from our team of experts.
          </p>
        </div>
      </section>

      <section className="py-12 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(blog => (
              <article
                key={blog.slug}
                className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block overflow-hidden"
                >
                  <figure className="relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <figcaption className="absolute top-4 right-4">
                      <span className="inline-block bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-3">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5 flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center mt-auto pt-4 border-t">
                    <div className="flex-shrink-0">
                      <span className="inline-block h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
                        {blog.author.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold">{blog.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {blog.date}
                      </p>
                    </div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="ml-auto text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 