import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GeoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const detectRegion = async () => {
      try {
        // Use timezone as a quick client-side heuristic
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const usTimezones = [
          "America/New_York", "America/Chicago", "America/Denver",
          "America/Los_Angeles", "America/Phoenix", "America/Anchorage",
          "Pacific/Honolulu", "America/Detroit", "America/Indiana",
          "America/Boise", "America/Juneau", "America/Nome",
        ];
        const isUS = usTimezones.some((usTz) => tz.startsWith(usTz.split("/")[0] + "/" + usTz.split("/")[1]) || tz.startsWith("US/"));

        navigate(isUS ? "/us" : "/uk", { replace: true });
      } catch {
        navigate("/uk", { replace: true });
      }
    };

    detectRegion();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
    </div>
  );
};

export default GeoRedirect;
