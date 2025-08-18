import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cooking Experience?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already cooking smarter, eating healthier, and saving time with SmartMeal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6 bg-transparent">
                  Schedule a Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#16a249]" />
                Free 14-day trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#16a249]" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#16a249]" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CTA