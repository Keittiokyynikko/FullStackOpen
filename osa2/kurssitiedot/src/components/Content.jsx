import Part from './Part'

const Content = ({course}) => {

    const total = course.reduce((s,p) =>{
        return s += p.exercises
    }, 0)

    return(
        <>
        {course.map((part, i) =>
            <Part key={i} course={part} />
        )}
        <p><b>total of {total} exercises</b></p>
        </>
    )
}

export default Content