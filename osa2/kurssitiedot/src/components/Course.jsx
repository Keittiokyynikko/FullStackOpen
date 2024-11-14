import Header from './Header'
import Content from './Content'

const Course = ({course}) => {

    return(
        <>
        {course.map((part, i) =>
        <div>
            <Header key={i} name={part.name} />
            <Content key={i} course={part.parts}/>
        </div>
        )}
        
        </>
    )
}

export default Course