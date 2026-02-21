import { useRegion } from "@/hooks/useRegion";

interface RegionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

/** Anchor tag that automatically prefixes internal hrefs with the current region. */
const RegionLink = ({ href, children, ...props }: RegionLinkProps) => {
  const { regionPath } = useRegion();

  // External links or anchors stay as-is
  const isExternal = href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:");
  const resolvedHref = isExternal ? href : regionPath(href);

  return (
    <a href={resolvedHref} {...props}>
      {children}
    </a>
  );
};

export default RegionLink;
