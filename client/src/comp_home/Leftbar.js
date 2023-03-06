import "./Leftbar.css"

const Leftbar = () => {
  return (
    <div className='flex flex-col'>

      <span> <input className='w-full' placeholder='search'></input></span>

     <div className='h-80 w-full bg-amber-100 mt-12'>
      <div className='h-3/6 bg-blue-100 text-black flex justify-center'>hello</div>

     <div>
      <hr />
      <div className='grid1 text-black'>
        <div className="f1"><p><strong>3435</strong><p/>Followers</p></div>
        <div className="vl bg-slate-500 w-1"></div>
        <div className="f1"><p><strong>3435</strong><p/>Following</p></div>
      </div>
     </div>
     </div>

      
     
    </div>
  )
}

export default Leftbar
