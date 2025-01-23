import { ReactNode } from "react"

export default function StatsCard({
    label, value, icon
}: {
    label: string,
    value: string | number,
    icon: ReactNode
}) {
    return (
        <div className="bg-[#253326] rounded-xl p-4 flex gap-4 w-1/4">
            <div className="text-3xl ">
                {icon}
            </div>
            <div className="flex flex-col gap-3">
                <div className="text-[#e0dfdf]">{label}</div>
                <div className="text-4xl font-semibold">{value}</div>
            </div>
        </div>
    )
}