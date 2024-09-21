import ClientData from "@/app/(dashboard)/_components/client-page";
import { Id } from "../../../../../../convex/_generated/dataModel";

const ClientPage = ({ params: { id } }: { params: { id: Id<"clients"> } }) => {
  return (
    <div>
      <ClientData clientId={id} />
    </div>
  );
};
export default ClientPage;
