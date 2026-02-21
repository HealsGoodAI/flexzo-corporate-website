import { createContext, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

type Region = "uk" | "us";

interface RegionContextValue {
  region: Region;
  regionPath: (path: string) => string;
  switchRegion: (newRegion: Region) => void;
}

const RegionContext = createContext<RegionContextValue>({
  region: "uk",
  regionPath: (p) => `/uk${p}`,
  switchRegion: () => {},
});

export const useRegion = () => useContext(RegionContext);

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  const { region: regionParam } = useParams<{ region: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const region: Region = regionParam === "us" ? "us" : "uk";

  const regionPath = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${region}${cleanPath}`;
  };

  const switchRegion = (newRegion: Region) => {
    // Replace current region prefix in path
    const currentPath = location.pathname;
    const withoutRegion = currentPath.replace(/^\/(uk|us)/, "") || "/";
    navigate(`/${newRegion}${withoutRegion}${location.search}${location.hash}`);
  };

  return (
    <RegionContext.Provider value={{ region, regionPath, switchRegion }}>
      {children}
    </RegionContext.Provider>
  );
};
