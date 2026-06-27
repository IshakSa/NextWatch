import ImageLoader from "@/components/shared/ImageLoader";
import { Badge } from "@/components/ui/badge";
import { ImageSizes } from "@/lib/constants";
import { ProviderInfo } from "@/types";

export default function ProviderCard({ provider }: { provider: ProviderInfo }) {
  return (
    <Badge variant={"secondary"} className="p-5 space-x-1">
      <div className="rounded-full overflow-hidden">
        <ImageLoader
          src={provider.logoPath}
          alt="provider logo"
          apiWidth={ImageSizes.provider}
          width={30}
          height={30}
        />
      </div>
      <p className="font-semibold">{provider.providerName}</p>
    </Badge>
  );
}
