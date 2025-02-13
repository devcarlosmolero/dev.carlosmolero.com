import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function SelectableBadge({
    children,
    variant = 'dark',
}: {
    children: ReactNode
    variant: 'ghost' | 'dark'
}) {
    function getVariantClasses(variant: 'dark' | 'ghost') {
        switch (variant) {
            case 'dark':
                return 'border-neutral-700 bg-neutral-700 text-white'
            case 'ghost':
                return 'border-gray-200 bg-gray-100 hover:border-neutral-700 hover:bg-neutral-700 hover:text-white'
        }
    }

    return (
        <p
            className={`flex items-center gap-x-2 rounded-lg border text-sm ${getVariantClasses(variant)} px-4 py-1`}
        >
            {children}
            {variant === 'dark' && <X className="size-3" />}
        </p>
    )
}
