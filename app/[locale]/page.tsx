"use client"

import AfogSVG from "../../components/icons/afog-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <video
        className="absolute left-0 top-0 size-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="../../components/video/aetherback.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <AfogSVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="relative z-10 mt-2 text-4xl font-bold">aetherframe</div>

      <Link
        className="relative z-10 mt-4 flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2 font-semibold"
        href="/login"
      >
        Start Chatting
        <IconArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  )
}
