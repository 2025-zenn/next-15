import Link from 'next/link';

const Navigation = () => {
    return (
        <div id='NavBar' className='absolute top-0 w-full px-2 z-30 bg-white/70 dark:bg-gray-800/80 backdrop-blur navbar font-raleway font-semibold'>
            <div className='flex-1 md:text-base text-xs'>
                <ul className='flex menu menu-horizontal p-0'>
                    <li>
                      <Link href="/" className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {process.env.NEXT_PUBLIC_APP_TITLE || 'アドバイス'}
                      </Link>
                    </li>
                </ul>
            </div>
            <div className='flex-none'>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost hover:bg-blue-100 dark:hover:bg-blue-900/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white 70rk:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-52">
                        <li>
                            <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                About US
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navigation