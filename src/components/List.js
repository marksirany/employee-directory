import React from "react";
import "./List.css"
//render information
function List(props) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Age</th>
                    <th scope="col">City</th>
                    <th scope="col">email</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user =>
                    <tr>
                        <td >{user.name.first}</td>
                        <td >{user.name.last}</td>
                        <td >{user.dob.age}</td>
                        <td >{user.location.city}</td>
                        <td >{user.email}</td>
                    </tr>
                )}

            </tbody>
        </table>
    )

}
export default List;