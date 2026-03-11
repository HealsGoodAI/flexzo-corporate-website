import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useRegion } from "@/hooks/useRegion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Building2, User, Landmark, CreditCard, ShieldCheck, PenLine, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const ClientBankingRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { regionPath } = useRegion();
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const [form, setForm] = useState({
    businessLegalName: "",
    dba: "",
    businessAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    contactName: "",
    email: "",
    phone: "",
    bankName: "",
    bankAddress: "",
    accountHolderName: "",
    accountType: "checking",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    iban: "",
    paymentMethod: "ach",
    signatoryName: "",
    titlePosition: "",
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Signature pad logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "hsl(213, 89%, 21%)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmed) {
      toast({ title: "Please confirm the banking information is accurate.", variant: "destructive" });
      return;
    }
    if (!hasSigned) {
      toast({ title: "Please provide your signature.", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    try {
      // Get signature as data URL
      const signatureDataUrl = canvasRef.current?.toDataURL("image/png") || "";

      const { data, error: fnError } = await supabase.functions.invoke("send-banking-registration", {
        body: {
          ...form,
          signatureDataUrl,
          date: today,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      navigate(regionPath("/client-banking-registration/success"));
    } catch (err: any) {
      console.error("Submission error:", err);
      toast({
        title: "Submission failed",
        description: err?.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const inputClass = "bg-background border-input focus:ring-accent";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Business Banking Registration | Flexzo AI"
        description="Provide your business banking details securely so Flexzo AI can process payments."
      />
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
              Business Banking Information
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Please provide your banking details so Flexzo AI can process payments securely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Building2 className="h-5 w-5 text-accent" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="businessLegalName">Business Legal Name *</Label>
                  <Input id="businessLegalName" required value={form.businessLegalName} onChange={(e) => handleChange("businessLegalName", e.target.value)} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="dba">Doing Business As (DBA)</Label>
                  <Input id="dba" value={form.dba} onChange={(e) => handleChange("dba", e.target.value)} placeholder="If applicable" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="businessAddress">Business Address *</Label>
                  <Input id="businessAddress" required value={form.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required value={form.city} onChange={(e) => handleChange("city", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" required value={form.state} onChange={(e) => handleChange("state", e.target.value)} placeholder="e.g. Delaware" className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="postalCode">ZIP Code *</Label>
                  <Input id="postalCode" required value={form.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} placeholder="e.g. 19901" className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" required value={form.country} onChange={(e) => handleChange("country", e.target.value)} className={inputClass} />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <User className="h-5 w-5 text-accent" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="contactName">Primary Contact Name *</Label>
                  <Input id="contactName" required value={form.contactName} onChange={(e) => handleChange("contactName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClass} />
                </div>
              </CardContent>
            </Card>

            {/* Banking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Landmark className="h-5 w-5 text-accent" />
                  Banking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input id="bankName" required value={form.bankName} onChange={(e) => handleChange("bankName", e.target.value)} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="bankAddress">Bank Address *</Label>
                  <Input id="bankAddress" required value={form.bankAddress} onChange={(e) => handleChange("bankAddress", e.target.value)} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input id="accountHolderName" required value={form.accountHolderName} onChange={(e) => handleChange("accountHolderName", e.target.value)} className={inputClass} />
                </div>

                <div className="sm:col-span-2">
                  <Label className="mb-3 block">Account Type *</Label>
                  <RadioGroup value={form.accountType} onValueChange={(v) => handleChange("accountType", v)} className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="checking" id="checking" />
                      <Label htmlFor="checking" className="font-normal cursor-pointer">Business Checking</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="savings" id="savings" />
                      <Label htmlFor="savings" className="font-normal cursor-pointer">Business Savings</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input id="accountNumber" required value={form.accountNumber} onChange={(e) => handleChange("accountNumber", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input id="routingNumber" required value={form.routingNumber} onChange={(e) => handleChange("routingNumber", e.target.value)} placeholder="Required for ACH / bank transfers" className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="swiftCode">SWIFT / BIC Code</Label>
                  <Input id="swiftCode" value={form.swiftCode} onChange={(e) => handleChange("swiftCode", e.target.value)} placeholder="If international" className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input id="iban" value={form.iban} onChange={(e) => handleChange("iban", e.target.value)} placeholder="If applicable" className={inputClass} />
                </div>
              </CardContent>
            </Card>

            {/* Payment Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CreditCard className="h-5 w-5 text-accent" />
                  Payment Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="mb-3 block">Preferred Payment Method *</Label>
                <RadioGroup value={form.paymentMethod} onValueChange={(v) => handleChange("paymentMethod", v)} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="ach" id="ach" />
                    <Label htmlFor="ach" className="font-normal cursor-pointer">ACH Transfer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="wire" id="wire" />
                    <Label htmlFor="wire" className="font-normal cursor-pointer">Wire Transfer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="international" id="international" />
                    <Label htmlFor="international" className="font-normal cursor-pointer">International Transfer</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirm"
                    checked={confirmed}
                    onCheckedChange={(v) => setConfirmed(v === true)}
                  />
                  <Label htmlFor="confirm" className="font-normal leading-relaxed cursor-pointer">
                    I confirm that the banking information provided is accurate and belongs to the business listed above.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Signature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <PenLine className="h-5 w-5 text-accent" />
                  Signature
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="signatoryName">Authorized Signatory Name *</Label>
                  <Input id="signatoryName" required value={form.signatoryName} onChange={(e) => handleChange("signatoryName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="titlePosition">Title / Position *</Label>
                  <Input id="titlePosition" required value={form.titlePosition} onChange={(e) => handleChange("titlePosition", e.target.value)} className={inputClass} />
                </div>

                <div className="sm:col-span-2">
                  <Label className="mb-2 block">Signature *</Label>
                  <div className="border border-input rounded-md overflow-hidden bg-background">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={150}
                      className="w-full cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  <button type="button" onClick={clearSignature} className="text-sm text-accent hover:underline mt-1">
                    Clear signature
                  </button>
                </div>

                <div>
                  <Label>Date</Label>
                  <Input value={today} readOnly className={`${inputClass} bg-muted`} />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={submitting || !confirmed || !hasSigned}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {submitting ? "Submitting…" : "Submit Banking Information"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientBankingRegistration;
