import React, { Component } from 'react'
import _ from "lodash";

export default class UserModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                email: "",
                soDT: "",
                maLoaiNguoiDung: ""
            },
            userEdit: {},
            search: ''
        }
    }

    onChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        })
    }

    // onSearchChange = e => {
    //     this.setState({
    //         search: e.target.value
    //     }, () => {this.props.searchCourses(this.state.search)})
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (!_.isEmpty(nextProps.courseEdit) && nextProps.courseEdit !== prevState.courseEdit) {
    //         return {
    //             course: nextProps.courseEdit,
    //             courseEdit : nextProps.courseEdit
    //         }
    //     }
    //     return null;
    // }

    onAddUser = () => {
        this.props.addUserRequest(
            {
                ...this.state.user,
                maNhom: "GP01"
            }
        );
    }

    // onUpdateCourse = () => {
    //     this.props.updateCourse(this.state.course);
    // }

    onClearForm = () => {
        this.setState({
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                email: "",
                soDT: "",
                maLoaiNguoiDung: "",
            },
            userEdit: {}
        })
        // this.props.showEditCourse({})
    }

    render() {
        return (
            <>
                <div className="row users__manager">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 users__title">
                        <button onClick={this.onClearForm} className="add__user" data-toggle="modal" data-target="#userModal"><i className="fas fa-plus"></i> ADD USERS</button>
                        <input type="text" placeholder="Search User" />
                    </div>
                </div>

                <div className="modal" id="userModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Add New User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="taiKhoan">T??i Kho???n</label>
                                    <input name="taiKhoan" onChange={this.onChange} value={this.state.user.taiKhoan || ""} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="matKhau">M???t Kh???u</label>
                                    <input value={_.get(this.state.user, "matKhau", "")} name="matKhau" onChange={this.onChange} type="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hoTen">H??? T??n</label>
                                    <input value={_.get(this.state.user, "hoTen", "")} name="hoTen" onChange={this.onChange} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input value={_.get(this.state.user, "email", "")} name="email" onChange={this.onChange} type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="soDT">S??? ??i???n Tho???i</label>
                                    <input value={_.get(this.state.user, "soDT", "")} name="soDT" onChange={this.onChange} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="maLoaiNguoiDung">Lo???i Ng?????i D??ng</label>
                                    <input value={_.get(this.state.user, "maLoaiNguoiDung", "")} name="maLoaiNguoiDung" onChange={this.onChange} type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="modal-footer">
                                {
                                    !_.isEmpty(this.state.courseEdit) ?
                                        <button type="button" className="btn btn-warning" onClick={this.onUpdateCourse}>Edit</button> :
                                        <button type="button" className="btn btn-primary" onClick={this.onAddUser}>Add</button>
                                }

                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
