const Filter = (props) => {
    return(
        <>
        <p>filter shown with <input value={props.filteredName} onChange={props.handleFilter} /></p>
        </>
    )
}

export default Filter