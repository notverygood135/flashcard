import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <>
        <section>
            <h1>Find a deck</h1>
            <form><input type="text" name="" id="1" /></form>
            <h1>or create your own</h1>
            <NavLink to="/create">Create</NavLink>
        </section>
        </>
    )
}