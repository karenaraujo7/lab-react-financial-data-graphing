import { useState } from "react";
 

    
export default function InputDate() {

    let [formData, setFormData] = useState({
        initialDate: "",
        finalDate: "",
        currency: ""
    })

    function handleChange(event) {
        let value = event.target.value

        let valueOpt = event.target.option

        setFormData({ ...formData, [event.target.name]: value || valueOpt })
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div className="d-flex d-row align-items-center">
            <form>
                <label >
                    Start:
                    <input type="date" value={formData.initialDate} onChange={handleChange}/>
                </label>

                <label>
                    End:
                    <input type="date" value={formData.finalDate} onChange={handleChange}/> 
                </label> 

                <select>
                    <option selected>Select Currency</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='BRL'>BRL</option>

                </select>

                <button type="submit" >Filter</button>

            </form>
        </div>
            




    );
}