
const Navbar = () => {
  return (
      <nav className='bg-transparent flex items-center justify-between h-11 px-4 border-b border-slate-800 select-none'>
          <div className="logo font-bold flex items-center m-0 p-0"><a className="text-purple-500" href="/">
              <span className="text-blue-400">&lt;</span>
              Pass <span className="text-green-400">OP</span>
              <span className="text-blue-400">/&gt;</span>    
            </a></div>
        {/* <ul className="flex">
              <li className="text-slate-300 font-bold hover:text-purple-500 px-5 py-3 transition"><a href="/">Home</a></li>
              <li className="text-slate-300 font-bold hover:text-purple-500 px-5 py-3 transition"><a href="About">About Us</a></li>
              <li className="text-slate-300 font-bold hover:text-purple-500 px-5 py-3 transition"><a href="contact">Contact Us</a></li>
        </ul> */}
      <button className="githubAuth h-full bg-transparent">
        <img className="invert h-3/5" src="/icons/github.svg" alt="" />
        </button>
    </nav>
  )
}

export default Navbar
