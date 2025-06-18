export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            About MyCalculatorApp
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Your indispensable partner in computation, offering a comprehensive suite of precise, intuitive, and versatile calculators for every need.
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                In an era driven by data, precision is paramount. Our mission at MyCalculatorApp is to empower individuals—from students and educators to professionals and homeowners—with a universally accessible and unerringly accurate toolkit for all their mathematical and financial computations. We are committed to demystifying complex calculations by providing tools that are not only powerful but also elegantly simple and intuitive to use. We aim to be the definitive digital resource for anyone seeking clarity and confidence in their numerical endeavors.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4">A Universe of Calculators</h2>
              <p className="text-muted-foreground leading-relaxed">
                MyCalculatorApp was conceived from the ambition to create a single, reliable hub for an exhaustive array of calculation tools. Our platform transcends basic arithmetic, offering specialized calculators across a spectrum of domains:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                <li>
                  <span className="font-semibold">Financial Planning:</span> Navigate mortgages, loans, investments, and retirement with sophisticated financial models.
                </li>
                <li>
                  <span className="font-semibold">Health & Fitness:</span> Monitor and manage your health with precision using our BMI, BMR, and calorie trackers.
                </li>
                <li>
                  <span className="font-semibold">Academic & Scientific Pursuits:</span> From complex algebra and calculus to statistical analysis, our tools support rigorous academic and research needs.
                </li>
                <li>
                  <span className="font-semibold">Everyday Calculations:</span> Simplify daily tasks with calculators for everything from cooking conversions to travel time.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4">Our Commitment to Excellence</h2>
              <p className="text-muted-foreground leading-relaxed">
                Trust is the bedrock of our platform. We pledge an unwavering commitment to the accuracy and reliability of our calculators. Each tool is developed and rigorously tested against established formulas and industry standards by a team of seasoned experts. Our dedication extends to the user experience; we have meticulously designed our interface to be clean, responsive, and accessible across all devices, ensuring a seamless experience whether you are on a desktop or on the go.
              </p>
            </div>

             <div>
              <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4">Evolving with Your Needs</h2>
              <p className="text-muted-foreground leading-relaxed">
                The world of information is in a constant state of flux, and so are we. MyCalculatorApp is a dynamic platform, continually expanding its repository of calculators and refining existing tools based on user feedback and emerging needs. We invite you to explore our comprehensive suite of calculators and experience the confluence of precision, simplicity, and power.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 