import cn from 'classnames'
import { Fragment, ReactNode } from 'react'

const Button = ({
    children,
    url,
    target = '_self',
    onClick,
    variant,
    className,
}: {
    children: ReactNode
    url?: string
    target?: '_blank' | '_self'
    variant: 'primary' | 'outline' | 'ghost' | 'disabled'
    onClick?: () => void
    className?: string
}) => {
    function getVariantClasses(
        variant: 'primary' | 'outline' | 'ghost' | 'disabled'
    ) {
        switch (variant) {
            case 'primary':
                return 'bg-primary text-white font-medium'
            case 'outline':
                return 'bg-white border border-[#E4E4E4] text-black'
            case 'ghost':
                return ''
            case 'disabled':
                return 'bg-gray-200 text-gray-600 pointer-events-none'
        }
    }

    return (
        <Fragment>
            {url ? (
                <a
                    className={cn(
                        'flex w-full items-center gap-x-3 rounded-lg px-4 py-2 text-center',
                        className,
                        getVariantClasses(variant)
                    )}
                    href={url}
                    target={target}
                >
                    {children}
                </a>
            ) : (
                <button
                    className={cn(
                        'flex w-full items-center gap-x-3 rounded-lg px-4 py-2 text-center',
                        className,
                        getVariantClasses(variant)
                    )}
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </Fragment>
    )
}

export default Button
