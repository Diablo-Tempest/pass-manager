
const Footer = () => {
  return (
      <div className="flex justify-between p-2 gap-6 bottom-0 border-t border-slate-600 bg-transparent w-screen h-11 backdrop-blur-md">
          <div className="flex justify-center logo font-bold items-center m-0 p-0 text-md text-center select-none">
              <span className="text-blue-400">&lt;</span>
              <span className="text-purple-500">Pass&nbsp;</span><span className="text-green-400">OP</span>
              <span className="text-blue-400">/&gt;</span>
          </div>
      <span className="text-purple-400 select-none font-bold">Created by <a title="Redirect to GitHub" href="https://github.com/diablo-tempest" target="_blank" className="hover:text-white">Biprosom Majumder</a></span>
    </div>
  )
}

export default Footer
