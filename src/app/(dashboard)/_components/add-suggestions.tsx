"use client";

import { useState } from "react";
import { z } from "zod";
import { experimental_useObject as useObject } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,

} from "@/components/ui/card";

import { AlertCircle, CheckCircle2, CircleDashed } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { set } from "date-fns";

const adSchema = z.object({
  headline1: z
    .string()
    .describe("The first headline of the ad shorter than 30 characters"),
  headline2: z
    .string()
    .describe("The second headline of the ad shorter than 30 characters"),
  headline3: z
    .string()
    .describe("The third headline of the ad shorter than 30 characters"),
  description1: z.string().describe("The first description of the ad"),
  description2: z.string().describe("The second description of the ad"),
  description3: z.string().describe("The third description of the ad"),
  //  budget: z.coerce.number(),
  keywords: z
    .array(z.string().describe("a keyword a phrase for the advert"))
    .describe("Keywords for the ad"),
  //  landing_page_url: z.string().nullable(),
});

export default function GoogleAdSuggestions() {

  // const adsContext = useQuery(api.ads.getAds)


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [adSuggestions, setAdSuggestions] = useState(null);
  // const [previousAds, setPreviousAds] = useState(adsContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);





  const { object, submit, isLoading } = useObject({
    schema: adSchema,
    api: "/api/generate",
    initialValue: {
      headline1: "",
      headline2: "",
      headline3: "",
      description1: "",
      description2: "",
      description3: "",
      keywords: [],
    }
  });


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Google Ad Copy Suggestions</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate New Ad</CardTitle>
          <CardDescription>
            Enter your product or service details to generate ad suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={(formData: FormData) => {
              const details = formData.get("productDetails");
              const platform = formData.get("platform");

              submit({ platform, details });
            }}
          >
            <div>
              <Label>What product/service do you want to advertise?</Label>
              <Input
                id="productDetails"
                name="productDetails"
                placeholder="Enter your product or service details here..."
                className=""
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="mt-2">
                <Label htmlFor="objective">Objective</Label>
                <Select name="objective">
                  <SelectTrigger className="">
                    <SelectValue placeholder="What is the objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leads">Leads</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Page Visits">Page Visits</SelectItem>
                    <SelectItem value="Store Visits">Store Visits</SelectItem>
                  </SelectContent>
                </Select>
              </div>{" "}
              <div className="mt-2">
                <Label htmlFor="platform">Platform</Label>
                <Select name="platform">
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="mt-3 w-full rounded-none mb-3">
              {isLoading ? (
                <span className="flex items-center gap-x-3">
                  <CircleDashed className="animate-spin" /> Generating Ad
                </span>
              ) : (
                <span>Generate Ad</span>
              )}
            </Button>
          </form>
          <form className="bg-slate-100 shadow-sm p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Suggested Ad Copy</h2>
            <div className="mt-2">
              <Label>Headline 1</Label>
              <Input
                id="headline1"
                name="headline1"
                defaultValue={object?.headline1}
              />
            </div>
            <div className="mt-2">
              <Label>Headline 2</Label>
              <Input
                id="headline2"
                name="headline2"
                defaultValue={object?.headline2}
              />
            </div>
            <div className="mt-2">
              <Label>Headline 3</Label>
              <Input
                id="headline3"
                name="headline3"
                defaultValue={object?.headline3}
              />
            </div>
            <div className="mt-2">
              <Label>Description 1</Label>
              <Textarea
                id="description1"
                name="description1"
                defaultValue={object?.description1}
              />
            </div>
            <div className="mt-2">
              <Label>Description 2</Label>
              <Textarea
                id="description2"
                name="description2"
                defaultValue={object?.description2}
              />
            </div>
            <div className="mt-2">
              <Label>Description 3</Label>
              <Textarea
                id="description3"
                name="description3"
                defaultValue={object?.description3}
              />
            </div>
            <Separator className="my-4" />
            <Label className="font-medium">Keywords</Label>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              {object?.keywords?.map((keyword) => (
                <span key={keyword}>
                  <Input
                    name="keywords"
                    defaultValue={keyword}
                    className="sr-only"
                  />
                  <Badge className="rounded-full">{keyword}</Badge>
                </span>
              ))}
            </div>
            <SubmitButton className="w-full rounded-none mt-3">
              Save To Database
            </SubmitButton>
          </form>
        </CardContent>
      </Card>

      {saveStatus && (
        <Alert
          variant={saveStatus === "success" ? "default" : "destructive"}
          className="mb-8"
        >
          {saveStatus === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {saveStatus === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>
            {saveStatus === "success"
              ? "Ad saved successfully to the database."
              : "Failed to save ad. Please try again."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
