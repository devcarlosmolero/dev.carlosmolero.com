import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'

export default function Hamburger({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(`tham tham-e-squeeze tham-w-6`, {
                'tham-active': isOpen,
            })}
        >
            <div className="tham-box">
                <div className="tham-inner bg-black" />
            </div>
        </button>
    )
}
