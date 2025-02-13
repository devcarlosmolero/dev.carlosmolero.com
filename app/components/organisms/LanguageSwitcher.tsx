const LanguageSwitcher = () => {
    const languages = [
        { locale: 'es', flag: 'spain.svg', alt: 'Español' },
        { locale: '', flag: 'usa.svg', alt: 'English' },
        { locale: 'zh', flag: 'china.svg', alt: '中文' },
    ]


    return (
        <div className="bottom-5 right-5 flex w-full gap-2 md:w-fit md:items-center">
            {languages.map((lang, index) => (
                <form
                method="GET"
                action="/api/changeLocale"
                    key={index}
          
                >
                    <button className="h-6 w-6 rounded-full border-2 transition-all hover:scale-110" type="submit">
                    <img
                        src={`/${lang.flag}`}
                        alt={lang.alt}
                        className="h-full w-full  object-cover rounded-full"
                    />
                    </button>
                    <input type="hidden" name="locale" value={lang.locale}/>
                </form>
            ))}
        </div>
    )
}

export default LanguageSwitcher
