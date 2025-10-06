"use client"

import dynamic from "next/dynamic"

const VaultVisualization = dynamic(() => import("../vault-statistics"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading 3D Visualization...</p>
      </div>
    </div>
  ),
})

export default function Page() {
  return <VaultVisualization />
}
