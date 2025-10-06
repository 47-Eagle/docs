export function Background() {
    return (
        <>
            {/* Background Color */}
            <div className="fixed inset-0 bg-[#030712] -z-20" />

            {/* Grid Pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
        </>
    )
} 