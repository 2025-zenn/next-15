import Link from 'next/link';

const Navigation = () => {
    return (
        <div id='NavBar' className='absolute top-0 w-full px-2 z-30 bg-opacity-90 backdrop-blur navbar font-raleway font-semibold text-neutral-content'>
            <div className='flex-1 md:text-base text-xs'>
                <ul className='flex menu menu-horizontal p-0'>
                    <li>
                      <Link href="/" className="text-lg">
                        {process.env.NEXT_PUBLIC_APP_TITLE}
                      </Link>
                    </li>
                </ul>
                </div>
                <div className='flex-none'>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href="/about">
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