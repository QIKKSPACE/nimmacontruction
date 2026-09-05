import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Route components
import Index from "./routes/index";
import About from "./routes/about";
import PrivacyPolicy from "./routes/privacy-policy";
import TermsConditions from "./routes/terms-conditions";
import ProjectDetails from "./routes/projects.$id";
import ProjectsFarmland from "./routes/projects.farmland-development";
import ProjectsPlotted from "./routes/projects.plotted-development";
import ProjectsOther from "./routes/projects.other-development";

import SvcArchitectural from "./routes/services.architectural-planning";
import SvcCompoundWall from "./routes/services.compound-wall-construction";
import SvcElectrical from "./routes/services.electrical-infrastructure";
import SvcEndToEnd from "./routes/services.end-to-end-land-development";
import SvcEntranceArch from "./routes/services.entrance-arch-design-construction";
import SvcFarmland from "./routes/services.farmland-development";
import SvcFootpath from "./routes/services.footpath-paver-installation";
import SvcInternalRoads from "./routes/services.internal-roads";
import SvcLandLeveling from "./routes/services.land-leveling-site-preparation";
import SvcLandscapeTree from "./routes/services.landscape-tree-plantation";
import SvcPark from "./routes/services.park-development";
import SvcPlotted from "./routes/services.plotted-development";
import SvcRCCDrainage from "./routes/services.rcc-drainage-works";
import SvcRoadDev from "./routes/services.road-development-works";
import SvcSiteId from "./routes/services.site-identification-works";
import SvcSiteSurvey from "./routes/services.site-survey-layout-execution";
import SvcStormWater from "./routes/services.storm-water-drainage";
import SvcTreePlantation from "./routes/services.tree-plantation-landscaping";
import SvcUGD from "./routes/services.underground-sewerage-ugd-works";
import SvcWaterPipeline from "./routes/services.water-pipeline-networks";
import SvcWaterSupply from "./routes/services.water-supply-line-installation";

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      
      <Route path="/projects/farmland-development" element={<ProjectsFarmland />} />
      <Route path="/projects/plotted-development" element={<ProjectsPlotted />} />
      <Route path="/projects/other-development" element={<ProjectsOther />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      
      <Route path="/services/architectural-planning" element={<SvcArchitectural />} />
      <Route path="/services/compound-wall-construction" element={<SvcCompoundWall />} />
      <Route path="/services/electrical-infrastructure" element={<SvcElectrical />} />
      <Route path="/services/end-to-end-land-development" element={<SvcEndToEnd />} />
      <Route path="/services/entrance-arch-design-construction" element={<SvcEntranceArch />} />
      <Route path="/services/farmland-development" element={<SvcFarmland />} />
      <Route path="/services/footpath-paver-installation" element={<SvcFootpath />} />
      <Route path="/services/internal-roads" element={<SvcInternalRoads />} />
      <Route path="/services/land-leveling-site-preparation" element={<SvcLandLeveling />} />
      <Route path="/services/landscape-tree-plantation" element={<SvcLandscapeTree />} />
      <Route path="/services/park-development" element={<SvcPark />} />
      <Route path="/services/plotted-development" element={<SvcPlotted />} />
      <Route path="/services/rcc-drainage-works" element={<SvcRCCDrainage />} />
      <Route path="/services/road-development-works" element={<SvcRoadDev />} />
      <Route path="/services/site-identification-works" element={<SvcSiteId />} />
      <Route path="/services/site-survey-layout-execution" element={<SvcSiteSurvey />} />
      <Route path="/services/storm-water-drainage" element={<SvcStormWater />} />
      <Route path="/services/tree-plantation-landscaping" element={<SvcTreePlantation />} />
      <Route path="/services/underground-sewerage-ugd-works" element={<SvcUGD />} />
      <Route path="/services/water-pipeline-networks" element={<SvcWaterPipeline />} />
      <Route path="/services/water-supply-line-installation" element={<SvcWaterSupply />} />
    </Routes>
  );
}
