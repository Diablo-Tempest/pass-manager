import { useRef, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Manager = () => {
    const imgRef = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({ siteURL: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords);
        
    }
    
    useEffect(() => {
        getPasswords()
    }, [])


    const isVisible = () => {
        if (form.password === "") {
            toast.error('No password detected!');
            return;
        }
        if (imgRef.current.src.includes("icons/eye.png")) {
            imgRef.current.src = "icons/eyecross.png"
            passRef.current.type = 'text'
            imgRef.current.title = 'Hide Password'
        } else {
            imgRef.current.src = "icons/eye.png"
            passRef.current.type = "password"
            imgRef.current.title = 'Show Password'
        }
    }

    const saveEntry = async() => {
        if (form.siteURL === "" || form.username === "" || form.password === "") {
            toast.error('All fields are required!');
            return;
        }
        
        // Update section
        if (form.id) {
            setPasswordArray([...passwordArray, { ...form }])
            await fetch("http://localhost:3000/", { method: 'PUT', body: JSON.stringify({ ...form }), headers: { 'Content-Type': 'application/json' } })
            toast.success('Entry Updated Succesfully!');
            setForm({ siteURL: "", username: "", password: "" })
            return;
        }

        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        await fetch("http://localhost:3000/", {method: 'POST', body: JSON.stringify({...form}), headers: { 'Content-Type': 'application/json' } })
        setForm({ siteURL: "", username: "", password: "" })
        toast.success('Entry Saved Succesfully!');

    }
    const deleteEntry = async(id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
        toast.success('Entry Deleted Succesfully!');
        
    }
    const editEntry = (id) => {
        setForm({...passwordArray.filter(item=>item.id===id)[0]})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to Clipboard!');
    }

    return (
        <>
            <ToastContainer
                stacked
                limit={5}
                autoClose={2000}
                draggable
                hideProgressBar={true}
                closeOnClick
                pauseOnFocusLoss={false}
                theme="dark"
                transition={Zoom}
            />
            
            <div className="mx-auto max-w-4xl body-min-h-calc">
                <div className="flex justify-center logo font-bold items-center m-0 p-0 text-2xl text-center select-none">
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-purple-500">Pass&nbsp;</span><span className="text-green-400">OP</span>
                    <span className="text-blue-400">/&gt;</span>
                </div>
                <p className="text-purple-400 text-center select-none">Your own password manager</p>
                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input value={form.siteURL} onChange={handleChange} placeholder="www.example.com" className="bg-transparent px-3 py-1 outline outline-1 outline-purple-400 focus:outline-purple-200 focus:shadow-md focus:shadow-slate-500 w-full rounded-full" type="text" name="siteURL" />
                    <div className="flex w-full flex-col md:flex-row justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Username" className="bg-transparent w-full px-3 py-1 outline outline-1 outline-purple-400 focus:outline-purple-200 focus:shadow-md focus:shadow-slate-500 rounded-full" type="text" name="username" />
                        <div className="flex justify-between gap-3 h-8 w-full px-3 py-1 outline outline-1 outline-purple-400 focus-within:outline-purple-200 focus-within:shadow-md focus-within:shadow-slate-500 rounded-full">
                            <input value={form.password} onChange={handleChange} ref={passRef} className="bg-transparent outline-none w-full" placeholder="Password" type="password" name="password" />
                            <img title="Show Password" ref={imgRef} onClick={isVisible} className="cursor-pointer select-none w-6" src="icons/eye.png" />
                        </div>
                    </div>
                    <button onClick={saveEntry} className='bg-purple-700 hover:bg-purple-800 transition flex justify-center ring-2 ring-slate-300 hover:ring-blue-300 items-center w-fit rounded-lg px-3 py-1 gap-1 font-bold select-none'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ width: "30px", height: "30px" }}>
                    </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    {passwordArray.length === 0 && <div className="text-2xl font-bold font-border-white text-red-600 hover:text-slate-400 select-none w-fit transition">No Passwords</div>}
                    {passwordArray.length !== 0 && <><h1 className="text-2xl font-bold text-purple-300 select-none hover:text-white w-fit m-auto py-4">Passwords</h1>
                        <div className="border border-purple-300 rounded-md mb-5">
                            <table className="table-fixed text-purple-300 w-full text-center divide-y-[0.5px] divide-purple-300">
                                <thead>
                                    <tr className="select-none">
                                        <th className="py-2">URL</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index} className="divide-x-[0.5px] divide-purple-300">
                                            <td title={`Redirect to ${item.siteURL}`} className="select-copy truncate"><a href={item.siteURL} target="_blank">{item.siteURL}</a></td>
                                            <td title="Copy Username" onClick={() => handleCopy(item.username)} className="select-copy truncate">{item.username}</td>
                                            <td title="Copy Password" onClick={() => handleCopy(item.password)} className="select-copy truncate">{"* ".repeat(item.password.length)}</td>
                                            <td className="select-copy flex justify-center items-center gap-5">
                                                <span title="Edit" onClick={() => editEntry(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                                </span>
                                                <span title="Delete" onClick={()=>deleteEntry(item.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#dc2626"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>

                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}

export default Manager
