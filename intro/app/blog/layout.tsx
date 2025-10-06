import Nav from '@/components/ui/nav'
import { ReactNode } from 'react'

export default function BlogLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#030014] relative">
            <Nav />
            <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 relative">
                {children}
            </div>
        </div>
    )
} 