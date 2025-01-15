import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'


export default function Loader({message}:{message:string}){

    return(
        <motion.div 
        className={`flex flex-col gap-y-2 rounded-xl items-center justify-center aspect-square border-[2px] border-[#003049] border-opacity-20 bg-white h-[250px] p-5`}
        variants={{
            hidden: {opacity: 0, scale:0},
            show:{opacity: 1, scale: 1},
        }}
        initial='hidden'
        animate='show'
        >
            <Loader2 size={40} className='animate-spin' color='black'/>
            <div className='text-lg text-black text-center'>
                {message}
            </div>
        </motion.div>
    )
}