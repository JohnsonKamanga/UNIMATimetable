import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import { CourseCard, TCourseInfo } from "../components/CourseCard";
import { UserContext } from "../user-context";

export default function Courses(){
    const {user} = useContext(UserContext); 
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const drawCourses = (courseInfo: TCourseInfo, index: number)=>{
        return <CourseCard key={index} courseInfo={courseInfo}/>
    }

    useEffect(()=>{
        axios.get(`${baseurl}/timetable/view/current/courses?userid=${user?.id}`)
        .then((timetable)=>{
          if(!timetable.data){
            setCourses([]);
            setLoading(false)
            return;
          }
            setCourses(timetable.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.error('An error occured while fetching your courses: ', err)
        })
    },[]);

    if (loading) {
        return (
          <div className="w-full flex flex-grow">
            <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-25">
              <Loader message="Fetching Courses" />
            </div>
          </div>
        );
      }

    return (
        <div className="flex flex-grow flex-col bg-[#F8F7F7]">
        <div className="p-2 min-h-full gap-2 bg-[#F8F7F7] rounded-md grid grid-cols-3">
            {courses.map(drawCourses)}
        </div>
        </div>
    )
}