import { Linkedin, TwitterX, Whatsapp } from 'react-bootstrap-icons'
import { SITE_LINKEDIN_URL, SITE_X_URL } from '~/consts'

export default function SocialIcons() {
    return (
        <div className="flex items-center justify-end gap-2">
            <a
                href={'https://wa.link/cvvbvq'}
                target="_blank"
                className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                rel="noreferrer"
            >
                <Whatsapp className="size-3" />
            </a>
            <a
                href={SITE_X_URL}
                target="_blank"
                className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                rel="noreferrer"
            >
                <TwitterX className="size-3" />
            </a>
            <a
                href={SITE_LINKEDIN_URL}
                target="_blank"
                className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                rel="noreferrer"
            >
                <Linkedin className="size-3" />
            </a>
        </div>
    )
}
