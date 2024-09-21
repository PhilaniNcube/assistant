"use client";

import { createClientAction } from "@/actions/clients/create-client-action";
import SubmitButton from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

const CreateClient = () => {
  const [state, formAction] = useFormState(createClientAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Client</CardTitle>
        <CardDescription>
          {state?.status === 400 ? (
            <p className="text-xs text-red-500">{state.message}</p>
          ) : state?.status === 200 ? (
            <p className="text-xs text-green-500">{state.message}</p>
          ) : (
            "Add new client details below."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input id="clientName" type="text" name="client_name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Client Website</Label>
            <Input id="website" type="text" name="website" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Client Industry</Label>
            <Input id="industry" type="text" name="industry" required />
          </div>
          <SubmitButton className="">Create Client</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default CreateClient;
