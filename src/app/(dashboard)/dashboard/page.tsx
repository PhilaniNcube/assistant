import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateClient from "../_components/create-client";
import ClientTable from "../_components/client-table";



const page = async () => {



  return <div>
    <Card className="pt-6 bg-black border-slate-950">
      <CardContent className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-300">Welcome Back</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="p-0 border-0">
            <CreateClient />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
    <div className="mt-3">
      <ClientTable />
    </div>
  </div>;
};
export default page;
