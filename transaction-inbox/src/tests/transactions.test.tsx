import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import App from '../App'

test("renders list and filters by search", async ()=>{
    render(<App/>)

    const table = await screen.findByRole("table", {name: /transactions/i})
    expect(table).toBeInTheDocument();
    
    //TODO check that the table has the assocaited roles
    //update the text search, and expect the table rows to update

    const search = await screen.findByRole("textbox", {name: /search/i})
    expect(search).toBeInTheDocument();

    fireEvent.change(search, {target: {value: "Acme"}})

    await waitFor(()=>{
        expect(screen.getByText(/Acme Inc/i)).toBeInTheDocument();
    })

})