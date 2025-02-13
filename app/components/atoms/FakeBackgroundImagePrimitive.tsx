import cn from 'classnames'
import { Fragment, ReactNode } from 'react'

function Container({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn('relative overflow-hidden', className)}>
            {children}
        </div>
    )
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    alt: string
    src: string
    useImageKit?: boolean
    className?: string
    children?: ReactNode
}

function Image({ className, children, alt, ...props }: ImageProps) {
    return (
        <Fragment>
            <img
                {...props}
                alt={alt}
                className={cn(
                    'absolute left-1/2 top-1/2 h-full max-h-none min-h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 transform object-cover',
                    className
                )}
            />
            {children}
        </Fragment>
    )
}

export const FakeBackgroundImagePrimitive = {
    Container,
    Image,
}
