"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Download,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/app/dashboard/planner/page";

interface ShareMealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealPlan: Record<string, Record<string, Recipe | null>>;
  weekDates: Date[];
}

export function ShareMealPlanModal({
  isOpen,
  onClose,
  mealPlan,
  weekDates,
}: ShareMealPlanModalProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Check out my meal plan for this week!"
  );

  const shareUrl = `${window.location.origin}/shared-meal-plan/123`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareViaEmail = () => {
    const subject = "My Weekly Meal Plan";
    const body = `${message}\n\nView my meal plan: ${shareUrl}`;
    window.open(
      `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  const shareViaSocial = (platform: string) => {
    const text = `Check out my healthy meal plan for this week! 🍽️ #SmartMeal #HealthyEating`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `${text} ${shareUrl}`
      )}`,
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  const downloadPDF = () => {
    // PDF generation logic would go here
    console.log("Downloading meal plan as PDF...");
  };

  const totalMeals = Object.values(mealPlan).reduce(
    (acc, dayMeals) => acc + Object.values(dayMeals).filter(Boolean).length,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Meal Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meal Plan Preview */}
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  Week of{" "}
                  {weekDates[0]?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline">{totalMeals} meals planned</Badge>
                  <Badge variant="outline">7 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Link */}
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="rounded-xl" />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="rounded-xl bg-transparent"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Email Share */}
          <div className="space-y-3">
            <Label>Share via Email</Label>
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
            />
            <Textarea
              placeholder="Add a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl"
              rows={3}
            />
            <Button
              onClick={shareViaEmail}
              disabled={!email}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>

          {/* Social Share */}
          <div className="space-y-3">
            <Label>Share on Social Media</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => shareViaSocial("twitter")}
                className="rounded-xl"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => shareViaSocial("facebook")}
                className="rounded-xl"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => shareViaSocial("whatsapp")}
                className="rounded-xl"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Download */}
          <Button
            variant="outline"
            onClick={downloadPDF}
            className="w-full rounded-xl bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Download as PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
