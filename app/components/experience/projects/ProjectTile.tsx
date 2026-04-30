import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
}

const ProjectTile = ({ project, index, position, rotation, activeId, onClick }: ProjectTileProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  const links = useMemo(() => {
    if (project.urls?.length) return project.urls;
    if (project.url) return [{ text: "VIEW ↗", url: project.url }];
    return [];
  }, [project.url, project.urls]);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, textBox, buttonsGroup] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.3 : 1,
        y: hovered ? 1.3 : 1,
        z: hovered ? 1.3 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 1.22 : 1.12 }, 0)
      .to(textBox.position, { y: hovered ? 0.52 : 0.42 }, 0)
      // .to(textBox.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0)
      .to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered ? 1 : 0 }, 0);

    if (links.length) {
      hoverAnimRef.current
        .to((buttonsGroup as THREE.Group).scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
        .to((buttonsGroup as THREE.Group).position, { z: hovered ? 0.3 : -1 }, 0);
    }
  }, [hovered, links.length]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeId === index);
    }
  }, [isMobile, activeId]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -10,
        duration: 1,
        delay: isProjectSectionActive ? index * 0.1 : 0,
      });
    }
  }, [isProjectSectionActive]);

  const handleClick = (url: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const button = e.eventObject;
    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));
    setTimeout(() => window.open(url, "_blank"), 50);
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[5.2, 2.6, 1]} />
          <meshBasicMaterial color="#FFF" transparent opacity={0.3}/>
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-2.35, 1.12, 0.101]}
          anchorX="left"
          anchorY="top"
          maxWidth={4.9}
          fontSize={0.5}
          lineHeight={1.1}
          overflowWrap="break-word">
          {project.title}
        </Text>
        <Text
          {...subtitleProps}
          maxWidth={4.9}
          position={[-2.35, 0.42, 0.1]}
          // scale={[0, 0, 1]}
          fontSize={0.17}
          lineHeight={1.35}
          textAlign="left"
          overflowWrap="break-word"
          fillOpacity={0}>
          {project.subtext}
        </Text>
        {links.length > 0 && (
          <group
            position={[1.5, -0.8, -1]}
            scale={[0, 0, 1]}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}>
            {links.slice(0, 2).map((link, i) => (
              <group
                key={`${link.url}-${i}`}
                position={[0, i === 0 ? 0 : -0.55, 0]}
                onClick={handleClick(link.url)}>
                <mesh>
                  <boxGeometry args={[1.7, 0.4, 0.2]} />
                  <meshBasicMaterial color="#222" />
                  <Edges color="white" lineWidth={1} />
                </mesh>
                <Text
                  {...subtitleProps}
                  color="white"
                  position={[-0.75, 0.15, 0.2]}
                  fontSize={0.22}>
                  {link.text}
                </Text>
              </group>
            ))}
          </group>
        )}
      </group>
    </group>
  );
};

export default ProjectTile;