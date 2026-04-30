import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { PROJECTS } from "@constants";
import { usePortalStore } from "@stores";

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  const onClick = (id: number) => {
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    const count = PROJECTS.length;

    return PROJECTS.map((project, i) => {
      // Simple centered row (prevents large separation & off-centering).
      const spacing = 6;
      const mid = (count - 1) / 2;
      const rowOffsetX = 1.2;
      const x = (i - mid) * spacing + rowOffsetX;
      const z = -11.5;
      const rotY = 0;

      return (
        <ProjectTile
          key={i}
          project={project}
          index={i}
          position={[x, 1, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive]);

  const groupRotY = 0;

  return (
    <group rotation={[0, groupRotY, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;