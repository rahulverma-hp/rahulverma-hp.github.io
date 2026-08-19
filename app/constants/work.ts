import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2022',
    title: 'CGC Landran',
    subtitle: 'Electronics and Communication Engineering',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022-2023',
    title: 'Solitaire Infosys',
    subtitle: 'ML Engineer',
    position: 'left',
    subtitleGap: 0.1
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2025',
    title: 'George Brown College',
    subtitle: 'Cloud Computing',
    position: 'left',
    subtitleGap: 0.32,
    yearTitleGap: 0.25,
  },
  {
    point: new THREE.Vector3(0, 1, -10),
    year: '2026',
    title: 'George Brown College',
    subtitle: 'Applied AI Solution Development',
    position: 'right',
    subtitleGap: 0.80,
    yearTitleGap: 0.28,
  }
]