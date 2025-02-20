
type TTimetableCard = {
    course: string,
    venue: string,
    time: string,
    className?: string,
}

export default function TimetableCard(props : TTimetableCard){
    const {course, venue, time, className} = props;
    return(
        <div className={className + " p-1 h-full rounded-md border-[2px] border-black border-opacity-10 "}>
            <div className="font-bold text-lg">
            {course}
            </div>
            <div className="flex flex-row font-light text-sm justify-between">
            <div className="py-1 px-2 bg-white bg-opacity-20 rounded-2xl border-[1px] border-black border-opacity-10">
                {time}
            </div>
            <div className="py-1 px-2 bg-white bg-opacity-20 rounded-2xl border-[1px] border-black border-opacity-10">
                {venue}
            </div>
            </div>
        </div>
    )
}