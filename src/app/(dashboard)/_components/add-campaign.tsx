"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Id } from "../../../../convex/_generated/dataModel";
import SubmitButton from "@/components/submit-button";
import { createCampaignAction } from "@/actions/campaigns/create-campaign-action";


const AddCampaign = ({clientId}:{clientId: Id<"clients">}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, formAction] = useFormState(createCampaignAction, null);

  console.log(state);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add New Campaign</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="campaign_name">Campaign Name</Label>
            <Input
              id="campaign_name"
              name="campaign_name"
              placeholder="Enter campaign name"
            />
            <Input
              type="hidden"
              id="client_id"
              name="client_id"
              defaultValue={clientId}
              value={clientId}
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="Enter budget"
            />
          </div>
          <div>
            <Label htmlFor="budget">Objective</Label>
            <Input
              id="objective"
              name="objective"
              type="text"
              placeholder="Enter objective"
            />
          </div>
          <div>
            <Label htmlFor="platform">Patform</Label>
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

          <SubmitButton className="w-full bg-black hover:bg-slate-950">
            Create Campaign
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddCampaign;
