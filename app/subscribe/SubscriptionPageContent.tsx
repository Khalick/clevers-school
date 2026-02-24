"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Check, Calendar, CreditCard, Shield, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Fixed subscription amount
const SUBSCRIPTION_AMOUNT = 1005

interface SubscriptionData {
  id: string
  startDate: Date
  expiryDate: Date
  remainingDays: number
  status: string
  reference: string
  amount: number
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const formatCurrency = (amount: number): string => {
  return `KES ${amount.toLocaleString()}`
}

const SubscriptionPageContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const [isProcessing, setIsProcessing] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [checkoutRequestID, setCheckoutRequestID] = useState<string | null>(null)
  const [polling, setPolling] = useState(false)

  const returnUrl = searchParams?.get("returnUrl") || "/"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check for existing subscription
  const checkSubscription = useCallback(async () => {
    if (!mounted || !session?.user?.id) return

    try {
      setIsProcessing(true)
      const response = await fetch("/api/subscription/check")

      if (!response.ok) {
        throw new Error("Failed to fetch subscription data")
      }

      const data = await response.json()

      if (data.isSubscribed) {
        setSubscriptionData(data.subscription)
      }
    } catch (error) {
      console.error("Error checking subscription:", error)
      toast({
        title: "Error",
        description: "Failed to check subscription status. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }, [mounted, session?.user?.id, toast])

  useEffect(() => {
    void checkSubscription()
  }, [checkSubscription])

  // Poll for payment status
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (polling && checkoutRequestID) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/daraja/status?checkoutRequestID=${checkoutRequestID}`)
          const data = await response.json()

          if (data.success && data.status === "COMPLETED") {
            setPolling(false)
            setPaymentCompleted(true)
            toast({
              title: "Success",
              description: "Payment received! Your subscription is active.",
            })
            await checkSubscription() // Refresh data
          } else if (data.success && data.status === "FAILED") {
            setPolling(false)
            toast({
              title: "Payment Failed",
              description: data.resultDesc || "The transaction was not completed.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error polling status:", error)
        }
      }, 5000) // Check every 5 seconds
    }

    return () => clearInterval(interval)
  }, [polling, checkoutRequestID, checkSubscription, toast])

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a valid M-Pesa phone number.",
        variant: "destructive",
      })
      return
    }

    // Basic validation for 254... or 07... or 01...
    const phoneRegex = /^(?:254|\+254|0)?([17]\d{8})$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number (e.g., 0712345678).",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch("/api/daraja/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          amount: SUBSCRIPTION_AMOUNT,
          reference: "Subscription"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate payment")
      }

      setCheckoutRequestID(data.checkoutRequestID)
      setPolling(true)
      toast({
        title: "Check your phone",
        description: "An M-Pesa prompt has been sent to your phone. Please enter your PIN.",
      })

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment.",
        variant: "destructive",
      })
    } finally {
      // Keep processing true if polling, otherwise false
      // Actually we want to show a specific "Waiting for payment" state
      if (!polling) {
        setIsProcessing(false)
      }
    }
  }


  // Handle loading state
  if (status === "loading" || !mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your subscription details...</p>
      </div>
    )
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/subscribe")
    return null
  }

  // Render subscription status card
  const renderSubscriptionStatus = () => {
    if (!subscriptionData) return null

    const progressValue = (subscriptionData.remainingDays / 365) * 100

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            <Check className="h-4 w-4 mr-1" />
            Active Subscription
          </Badge>
          <h3 className="text-2xl font-bold text-primary mt-4">You're all set!</h3>
          <p className="text-muted-foreground">
            Enjoy full access to all premium features and content.
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subscription Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Remaining</span>
              <span className="font-medium">{subscriptionData.remainingDays} days</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Expiry Date</span>
            <span className="font-medium">
              {subscriptionData.expiryDate && formatDate(subscriptionData.expiryDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {subscriptionData.reference}
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => router.push(returnUrl)}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  // Render payment processing / polling
  const renderProcessing = () => {
    if (polling) {
      return (
        <div className="text-center space-y-4 py-6">
          <div className="relative mx-auto">
            <Smartphone className="h-16 w-16 mx-auto text-primary animate-pulse" />
            <div className="absolute top-0 right-1/3">
              <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-lg font-medium">Check your phone</p>
            <p className="text-muted-foreground">Enter M-Pesa PIN to complete payment.</p>
            <p className="text-xs text-muted-foreground mt-2">Waiting for confirmation...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center space-y-4 py-6">
        <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
        <div>
          <p className="text-lg font-medium">Processing...</p>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    )
  }

  // Render payment successful
  const renderPaymentSuccess = () => {
    return (
      <div className="text-center space-y-4 py-6">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <p className="text-lg font-medium text-green-600">Payment Successful!</p>
          <p className="text-muted-foreground">Your subscription has been activated.</p>
          <Button className="mt-4" onClick={() => router.push(returnUrl)}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // Render subscription options
  const renderSubscriptionOptions = () => {
    return (
      <>
        <div className="text-center space-y-2 mb-6">
          <p className="text-3xl font-bold text-primary">{formatCurrency(SUBSCRIPTION_AMOUNT)}</p>
          <p className="text-muted-foreground">Annual Premium Access</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>Premium Benefits</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Full Year Access</p>
                  <p className="text-sm text-muted-foreground">365 days of unlimited premium features</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Complete Study Materials</p>
                  <p className="text-sm text-muted-foreground">Access to all premium learning resources</p>
                </div>
              </li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-center">Pay with M-Pesa</h4>

            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. 0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isProcessing || polling}
                />
              </div>
              <Button
                className="w-full gap-2 bg-green-600 hover:bg-green-700"
                onClick={handlePayment}
                disabled={isProcessing || polling || !phoneNumber}
              >
                {isProcessing || polling ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Smartphone className="h-4 w-4" />
                )}
                {polling ? "Waiting for PIN..." : "Pay Now"}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              You will receive a prompt on your phone to enter your PIN.
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="text-2xl text-primary">Premium Subscription</CardTitle>
            <CardDescription>
              Unlock full access to all learning materials
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {subscriptionData ? renderSubscriptionStatus() :
              (isProcessing && !polling) ? renderProcessing() : // Processing but not polling (initial req)
                polling ? renderProcessing() : // Polling (waiting for PIN)
                  paymentCompleted ? renderPaymentSuccess() :
                    renderSubscriptionOptions()}
          </CardContent>

          {!subscriptionData && !isProcessing && !paymentCompleted && !polling && (
            <CardFooter className="bg-gray-50 text-center text-xs text-muted-foreground pt-4 pb-6">
              <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

export default SubscriptionPageContent