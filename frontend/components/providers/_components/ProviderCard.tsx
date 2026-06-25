import ImageLoader from "@/components/shared/ImageLoader";
import { Badge } from "@/components/ui/badge";
import { ImageSizes, ProviderInfo } from "@/lib/constants";

export default function ProviderCard({ provider }: { provider: ProviderInfo }) {
  return (
    <Badge variant={"secondary"} className="p-5 space-x-1">
      <div className="rounded-full overflow-hidden">
        <ImageLoader
          src={provider.logo_path}
          alt="provider logo"
          apiWidth={ImageSizes.provider}
          width={30}
          height={30}
        />
      </div>
      <p className="font-semibold">{provider.provider_name}</p>
    </Badge>
  );
}
