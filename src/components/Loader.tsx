import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Colors } from '../constants/colors'


export default function Loader(){

    return(
        <motion.div 
        className={`flex flex-col gap-y-2 rounded-xl items-center justify-center aspect-square border-[2px] border-[#003049] h-[250px] p-5`}
        variants={{
            hidden: {opacity: 0, scale:0},
            show:{opacity: 1, scale: 1},
        }}
        initial='hidden'
        animate='show'
        >
            <Loader2 size={40} className='animate-spin' color='white'/>
            <div className='text-lg text-white'>
                Fetching timetables
            </div>
        </motion.div>
    )
}