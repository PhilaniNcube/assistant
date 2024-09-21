"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import AddCampaign from "./add-campaign";
import CampaignCards from "./campaign-cards";
import GoogleAdSuggestions from "./add-suggestions";

export default function ClientData({ clientId }: { clientId: Id<"clients"> }) {


  const client = useQuery(api.clients.getClient, { clientId: clientId });



  const recentAds = [
    {
      name: "Summer Sale Banner",
      type: "Display",
      impressions: 50000,
      clicks: 2500,
    },
    {
      name: "Back to School Video",
      type: "Video",
      impressions: 30000,
      clicks: 1500,
    },
    {
      name: "Holiday Special Carousel",
      type: "Social",
      impressions: 80000,
      clicks: 4000,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client: {client?.client_name}</h1>
        <AddCampaign clientId={clientId} />
      </header>
      <CampaignCards />
      <section>

        <h2 className="text-2xl font-semibold mb-4">Recent Ads</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="">
                <th className="p-2 text-left">Ad Name</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Impressions</th>
                <th className="p-2 text-left">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {recentAds.map((ad, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{ad.name}</td>
                  <td className="p-2">{ad.type}</td>
                  <td className="p-2">{ad.impressions.toLocaleString()}</td>
                  <td className="p-2">{ad.clicks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <GoogleAdSuggestions />
    </div>
  );
}
