import { Badge } from "@/components/ui/badge";
import { ProviderInfo } from "@/lib/constants";
import Image from "next/image";

export default function ProviderCard({ provider }: { provider: ProviderInfo }) {
  return (
    <Badge variant={"secondary"} className="p-5 space-x-1">
      <div className="rounded-full overflow-hidden">
        <Image
          src={`/images${provider.logo_path}`}
          alt="provider logo"
          width={30}
          height={30}
          unoptimized
        />
      </div>
      <p className="font-semibold">{provider.provider_name}</p>
    </Badge>
  );
}
