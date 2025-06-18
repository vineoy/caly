"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.success("Message Sent!", {
            description: "Thank you for reaching out. We will get back to you as soon as possible.",
            duration: 5000,
        })
        const form = event.target as HTMLFormElement;
        form.reset();
    }

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            We welcome your feedback, inquiries, and suggestions. Please use the form below to get in touch with our team.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2 border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Enter your full name" required/>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="you@example.com" required/>
                  </div>
                   <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="What is your message about?" required/>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Write your detailed message here..." rows={6} required/>
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Submit Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground">
                   For any inquiries, feedback, or support requests, please feel free to email us directly. We strive to respond to all communications within 24-48 business hours.
                </p>
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-muted rounded-full">
                           <Mail className="h-6 w-6 text-primary"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Email</h3>
                            <p className="text-muted-foreground">
                                <a href="mailto:mycalapp711@gmail.com" className="text-primary hover:underline">mycalapp711@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}