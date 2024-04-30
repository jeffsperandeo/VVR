"use client"

import Link from "next/link"
import { FC } from "react"
import { AfogSVG } from "@/components/icons/afog-svg"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="https://www.aetherframe.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="mb-2">
        <AfogSVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="text-4xl font-bold tracking-wide">Aetherframe</div>
    </Link>
  )
}