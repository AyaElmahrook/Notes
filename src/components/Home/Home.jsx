import axios from 'axios'
import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2';

function Home() {
    let [wait, setWait] = useState(true);
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);
    const [userNotes, setUserNotes] = useState([])
    async function getUserNotes() {
        let { data } = await axios.get('https://route-egypt-api.herokuapp.com/getUserNotes', {
            headers: {
                Token: token,
                userID: decodedToken._id
            }
        });
        if (data.message === "success") {
            setWait(false);
            setUserNotes(data.Notes);
        }else if(data.message === "no notes found"){
            setWait(false);
            Swal.fire({
                title: 'Give it a trial, still can add your 1st note!',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        }
    }
    /* Delete note function */
    function delNote(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('https://route-egypt-api.herokuapp.com/deleteNote', {
                    data: {
                        "NoteID": id,
                        token
                    }
                }).then((response)=>{
                    if (response.data.message === "deleted") {
                        Swal.fire(
                            'Deleted!',
                            'Your note has been deleted.',
                            'success'
                          )
                        getUserNotes();
                    }
                    else
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.data.message
                          });
                    }
                  })
            }
          })
    }
    /* Handel edit note */
    const [note, setNote] = useState({ "title": "", "desc": "", "NoteID":"", token });
    function getNoteData(index) {
        let title= document.querySelector("#editNote #txtTitle").value = userNotes[index].title;
        let desc= document.querySelector("#editNote #txtDesc").value = userNotes[index].desc;
        let NoteID = userNotes[index]._id;
        setNote({ ...note, title, desc, NoteID });
    }
    function updateNote({ target }) {
        setNote({ ...note, [target.name]: target.value });
    }
    async function editNote(e) {
        e.preventDefault()
        let { data } = await axios.put('https://route-egypt-api.herokuapp.com/updateNote', note);
        if (data.message === "updated") {
            /* Close edit modal */
            document.getElementById("editNote").classList.remove("show");
            document.querySelectorAll(".modal-backdrop")
                .forEach(el => el.classList.remove("modal-backdrop"));
            Swal.fire({
                position: 'top-end',
                title: 'Updated Successfully!',
                showConfirmButton: false,
                timer: 1500
              });
            /* Review notes */
            getUserNotes();
        }
        else {
            Swal.fire(data.message);
        }
    }
    useEffect(() => {
        if (token) {
            getUserNotes();
        }
    })
    return (
        <>
        {/* Add note */}
         <AddNote getUserNotes={getUserNotes} />
            <div id='homeContainer' className="container">
                {wait ? <h2 className='text-center'><i className="fas fa-spinner fa-spin"></i></h2> : ''}
                <div className="row">
                    {/* Note view*/}
                    {userNotes && userNotes.map((userNote, index) => {
                        return (
                            <div className="col-lg-3 col-md-4 my-4 position-relative" key={index}>
                                <div className="note px-2 pt-4 pb-2">
                                    <h3 className='d-inline'>{userNote.title}</h3>
                                    <div className='p-1 position-absolute top-0 end-0 action-tools'>
                                        <i onClick={() => getNoteData(index)} className="fa-solid fa-pencil edit" data-bs-toggle="modal" data-bs-target="#editNote"></i>
                                        <i onClick={() => delNote(userNote._id)} className="fa-regular fa-trash-can ps-2 pe-3 del"></i>
                                    </div>
                                    <p> {userNote.desc} </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* Edit model */}
            <div className="modal fade" id="editNote" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={editNote} id="frmEditNote">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <input placeholder="Type Title" onChange={updateNote} id="txtTitle" name="title" className="form-control" type="text" />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control my-2" onChange={updateNote} name="desc" placeholder="Type your note" id="txtDesc" cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-info"> Edit Note</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home
