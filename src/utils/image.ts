import type { ImageMetadata } from "astro";
import sharp from 'sharp';

import { getAssetExtension } from "@/lib/string";

export async function getImageMetadata(path?: string): Promise<ImageMetadata | undefined> {
  if (!path) return;
  
  const extension = getAssetExtension(path);
  const response = await fetch(path);
  if (!response.ok) return;

  const buffer = Buffer.from(await response.arrayBuffer());
  
  const meta = await sharp(buffer).metadata();

  return {
    src: path,
    width: meta.width,
    height: meta.height,
    format: meta.format as ImageMetadata['format']
  };
}