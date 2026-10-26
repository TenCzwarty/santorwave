import {
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { type LucideProps } from "lucide-react";

export interface Release {
  type: string;
  artist: string;
  title?: string;
  w?: string;
  year?: string;
  id: string;
}

export type ReleaseType = "CC" | "CD" | "SP" | "LP" | "EP" | "GR" | "video";

export type PlayerType = "vinyl" | "cd" | "cassette";

export interface TypeConfig {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  color: string;
  bgColor: string;
}
