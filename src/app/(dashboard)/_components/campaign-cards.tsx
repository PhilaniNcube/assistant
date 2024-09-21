"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CampaignCards = () => {

  const campaigns = useQuery(api.campaigns.getCampaigns);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Campaign Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns?.map((campaign) => (
          <Card key={campaign._id}>
            <CardHeader>
              <CardTitle>{campaign.campaign_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Budget: {formatCurrency(campaign.budget)}</span>
              </div>
              <div className="flex items-center mb-2">
                <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  Objectives: {campaign.objective}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Platform: {campaign.platform}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default CampaignCards;
