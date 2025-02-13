import { ReactNode } from 'react'
import cn from 'classnames'

export default function Container({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn('mt-20 w-full rounded-t px-5 md:mt-0', className)}>
            {children}
        </div>
    )
}
